import { useState } from 'react'
import styles from './styles.module.css'
import LiTag from '../LiTag/LiTag'

type PropsUserList = {
    uid: string,
    email: string,
    photo: string,
    name: string
    roles: Array<PropsRoles>,
  }
  
  type PropsRoles = {
    directings: [],
    id: string,
    title: string
  }

export default function DisplayUser(
    {currentUserList, setCurrentUserList, userList, setUserList}: 
    {currentUserList: (string | undefined)[][], setCurrentUserList: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>, userList: string[], setUserList: React.Dispatch<React.SetStateAction<string[]>>}) {
    return (
        <ul className={styles.userList}>
            {currentUserList.length !== 0
                ? currentUserList.map((value, index) =>
                    <LiTag value={value[0]} key={value[1]} index={index} setCurrentUserList={setCurrentUserList} currentUserList={currentUserList} userList={userList} setUserList={setUserList}/>
                )
                : <></>}
        </ul>
    )
}