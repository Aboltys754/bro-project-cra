import { useState } from "react";
import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import classNames from "classnames"

type Props  = {
  id: string
  acceptor: IDocSignatory[]
  recipient: IDocSignatory[]
  signatoryMode: SignatoryMode
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>
}

export default function AcceptButton({ id, acceptor, recipient, signatoryMode, setDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const list = signatoryMode === 'acceptor' ? acceptor : recipient;

  // обязательна проверка на  false, т.к. если пользователя нет в списке подписантов find вернёт undefined
  if ((list.find(e => e.uid === session.getMe()?.uid))?.accept === false) {
    return <button 
      type="button" 
      disabled={disabled}
      className={classNames("btn", signatoryMode === 'acceptor' ? "btn-success": "btn-info") }
      onClick={() => accepting(id, signatoryMode, setDoc, setDisabled)}>{signatoryMode === 'acceptor' ? "Подписать" : "Ознакомиться"}</button>
  }
  return <></>
}

function accepting(
  id: string,
  signatoryMode: SignatoryMode,
  setDoc: React.Dispatch<React.SetStateAction<IDoc>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
){
  setDisabled(true);
  const path = signatoryMode === 'acceptor' ? "accepting": "recipienting";
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${path}/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setDoc(res);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}