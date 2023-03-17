interface IAccessSetting extends IRow {
  tasks: IAccessTask[]
}

interface IAccessTask extends IRow {
  actions: IRow[]
}
