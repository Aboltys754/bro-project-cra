import { Link } from "react-router-dom";
import tokenManager from "../../../libs/token.manager"
import deepFinder from "../../../libs/deep.finder";


export default function ListOldObject() {
    
    tokenManager.subscribe("ListOldObject")
    const listOldObjects: Array<string> = ["Приказ на увольнение Петрова", 
                                           "Прикз на прием Сидорова в штат", 
                                           "Приказ на отпуск Иванова"];
                                           
    const arr = tokenManager.getMe()?.roles;
    return (
        <div>
            {tokenManager.getMe()?.roles === undefined ? <></> : <p>{tokenManager.getMe()?.roles[0]?.title}</p>}
            <Link to="/createObject/new/" className="btn btn-outline-light mt-4 ms-4 mb-4" 
                hidden={!deepFinder(arr, "Создать")}>Новый Объект</Link>
            <ul>
            {listOldObjects.length === 0 ?
                 "Нет объектов" :
                 listOldObjects.map((value, index) => <p key={index + value}>{value}</p>
                 )}
            </ul>
        </div>
    )
}