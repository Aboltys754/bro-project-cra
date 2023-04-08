declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

type ServiceName = "bridge" | "mauth" | "informator"
type StyleTheme = "dark" | "light"
type PopupMode = "success" | "danger" | undefined
type AuthFormMode = "signin" | "signup" | "forgot"
/*
* тип, устанавливающий возможные значения режима информационного сообщения (подтверждение email, сброс пароля)
*/
type AuthInfoCardMode = "confirm" | "recovery"

/*
* интерфейс объекта одно записи, возвращаемой бэкендом
* бэкенд списка возвращает массив таких объектов
*/
interface ISimpleRow {
  id: number
  title: string
}

interface IThemeContext {
    theme: StyleTheme;
    setTheme: Dispatch<SetStateAction<StyleTheme>>;
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "informator"
*/
interface IAbout {
  alias: string
  mdInfo: string
}

/*
* интерфейс объекта, возвращаемого бэкендом при успешной авторизации
*/
interface IAuthResponse {
  access: string
  refresh: string
}
/*
* интерфейс объекта ошибки
*/
interface IErrorMessage {
  message: string
  field: string
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "bridge"
*/
interface ISearchResult {
  limit: number
  offset: number
  positions: IProduct[]
}

/*
* интерфейс объекта продукта, возвращаемого микросервисом "bridge"
*/
interface IProduct {
  id:number
  createdAt: string
  brandId: number
  brantTitle: string
  providerId: number
  providerTitle: string
  code: string
  article: string
  title: string
  price: number
  amount: number
  manufacturer: string
  weight: number
  width: number
  height: number
  length: number
  manufacturer: string
  // storage: unknown
}

interface IDoc {
  id: string
  title: string
  description: string
  directing: ISimpleRow
  task: ISimpleRow
  author: ISimpleRow
  files: IDocFile[]
}

interface IDocFile {
  originalName: string
  fileName: string
}

interface IRole extends ISimpleRow {
  directings: IDirecting[]
}

interface IDirecting extends ISimpleRow {
  tasks: ITask[]
}

interface ITask extends ISimpleRow {
  actions: ISimpleRow[]
}


/*
*интерфейс настроек компоненты  SimpleList
*/
// type SL = "brands" | "providers" | "roles" | "directings" | "tasks" | "actions"
interface ISimpleListConf {
  brands: IListConf,
  providers: IListConf,
  roles: IListConf,
  directings: IListConf,
  tasks: IListConf,
  actions: IListConf
}

interface IListConf {
  serviceName: ServiceName
  title: string
  placeholderSearch: string
  placeholder: string
  api: string
}

interface IUser {
  email: string
  rank: string
  roles: IRole[]
  name?: string
  photo?: string
  status?: string
}