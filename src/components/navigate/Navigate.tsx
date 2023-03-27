import { Link } from "react-router-dom";
import session from "../../libs/token.manager"

import Greet from "./Greet/Greet";
import styles from "./styles.module.css"
import classNames from "classnames";

export default function Navigate() {
  session.subscribe('navigate')

  return <nav className={classNames(styles.root, "navbar navbar-expand-lg navbar-dark bg-primary")}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Marketplace</Link>
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active">Home</Link>
          </li>

          {session.getMe() ? 
            <li className="nav-item">
              <Link to="/docs" className="nav-link active">С.Э.Д.</Link>
            </li>
          : <></>}

          {session.getMe()?.rank === 'admin' ?
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Каталог</span>
              <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                <Link to="/catalog/edit/brands" className="dropdown-item">Бренды</Link>
                <Link to="/catalog/edit/providers" className="dropdown-item">Поставщики</Link>
                <hr />
                <Link to="/catalog/edit/upload" className="dropdown-item">Загрузка прайса</Link>
              </div>
            </li>
            : <></>}


          {/* <li className="nav-item">
            <Link to="/catalog/edit/test" className="nav-link">Тест</Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog/edit/test2" className="nav-link">Тест 2</Link>
          </li> */}

          <li className="nav-item">
            <Link to="/about" className="nav-link">О компании</Link>
          </li>

          {session.getMe() ? 
            <li className="nav-item">
              <Link to="/createObject" className="nav-link active">Создать Объекты</Link>
            </li>
          : <></>}


          {session.getMe() ? <li className="nav-item">
            <Link to="/user" className="nav-link">Кабинет</Link>
          </li>
            : <></>}


          {session.getMe()?.rank === 'admin' ?
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Настройки</span>
              <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                <Link to="/setting/edit/roles" className="dropdown-item">Роли</Link>
                <Link to="/setting/edit/directings" className="dropdown-item">Направления</Link>
                <Link to="/setting/edit/processes" className="dropdown-item">Объекты</Link>
                <Link to="/setting/edit/actions" className="dropdown-item">Действия</Link>
                <hr />
                <Link to="/setting/edit/access" className="dropdown-item">Права доступа</Link>
                <Link to="/setting/edit/bundle/role" className="dropdown-item">Привязка ролей</Link>
              </div>
            </li>
            : <></>
          }



          {/* <li className="nav-item">
            <Link to="/auth" className="nav-link">Sign in</Link>
          </li>
          <li className="nav-item">
            <Link to="/auth/signout" className="nav-link">Sign out</Link>
          </li> */}
        </ul>
      </div>
    </div>
    <Greet />
  </nav>
}