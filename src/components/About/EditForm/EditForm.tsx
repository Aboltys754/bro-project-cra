import tokenManager from "../../../classes/TokenManager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/combo.fetch.wrapper"
import EditButton from "../EditButton/EditButton";
import styles from "./styles.module.css"

type Props = {
  about: IAbout | undefined
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditForm({ about, setAbout, editMode, setEditMode }: Props) {
  return <form
    onSubmit={(event) => { _onSubmit(event, setEditMode, about, setAbout) }}
    className={styles.root}>

    <EditButton editMode={editMode} />

    <div className="form-group">
      <label className="form-label mt-4">Редактировать  страницу (markdown)</label>
      <textarea className="form-control" name="mdInfo" defaultValue={about?.mdInfo || ""}></textarea>
      <input type="hidden" name="alias" defaultValue="company" />
    </div>
  </form>
}

async function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  about: IAbout | undefined,
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
) {

  event.preventDefault()
  setEditMode(false)

  await fetchWrapper(() => _query(new FormData(event.target as HTMLFormElement), about?.alias))
    .then(async response => {
      if (!Array.isArray(response)) {
        if (response.ok) {
          const res = await response.json()
          setAbout(res)
          return;
        }
      }
    })
    .catch(() => console.log('error: не удалось обновить данные страницы'))
}

function _query(
  fd: FormData,
  alias: string | undefined
) {
  return fetch(`${serviceHost("informator")}/api/informator/about/${alias || ""}`, {
    method: alias ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })
}
