import styles from "./styles.module.css"
import classNames from "classnames"

import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"

type Props = {
  roles: IRow[],
  tasks: IRow[],
  actions: IRow[],
  accessSettings: IAccessSetting[]
}

export default function Accordion({ roles, tasks, actions, accessSettings }: Props) {
  // console.log(accessSettings)
  
  return <div className={classNames(styles.root, "accordion")}>

    {roles.map(role => {
      return <div className="accordion-item" key={role.id}>

        {_getRoleTitle(role.title)}

        <div className="accordion-collapse collapse">
          <div className="accordion-body">
            {_getTasksList(role.id.toString(), tasks, actions, accessSettings)}
          </div>
        </div>

      </div>
    })}

  </div>
}

function _getRoleTitle(title: string) {
  return <h2 className="accordion-header" onClick={(event) => collapser(event)}>
    <span className="accordion-button collapsed">
      {title}
    </span>
  </h2>
}

function _getTasksList(roleId: string, tasks: IRow[], actions: IRow[], accessSettings:IAccessSetting[]) {
  return tasks.map(task => {
    return <>
      {_getTask(roleId, task, accessSettings)}

      {_getActionsList(roleId, task.id.toString(), actions, accessSettings)}
    </>
  })
}

function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  event.currentTarget.parentElement
    ?.querySelectorAll('input[type=checkbox]')
    .forEach(elem => {
      (elem as HTMLInputElement).checked = true;
    })
}

function _getActionsList(roleId: string, taskId: string, actions: IRow[], accessSettings: IAccessSetting[]) {
  return <div hidden={true} className={styles.actionsList}>

    <p onClick={_allCheckboxOn} className="mb-2 text-muted">Выделить все</p>

    {actions.map(action => _getAction(roleId, taskId, action, accessSettings))}
  </div>
}

function _getAction(roleId: string, taskId: string, action: IRow, accessSettings: IAccessSetting[]) {
  return <p key={roleId + taskId + action.id}>

    <AccordionCheckbox
      id={roleId + taskId + action.id}
      name={`id_${roleId}[id_${taskId}][id_${action.id}]`}
      title={action.title}
      checked={isCheckedAction(roleId, taskId, action.id.toString(), accessSettings)}
    />
  </p>
}

function isCheckedAction(roleId: string, taskId: string, actionId: string, accessSettings: IAccessSetting[]) {

  const role = accessSettings.find(e => e.id.toString() === roleId);
  if(!role) {
    return false;
  }

  const task = role.tasks.find(e => e.id.toString() === taskId)
  if(!task) {
    return false;
  }

  const action = task.actions.find(e => e.id.toString() === actionId)
  if(!action) {
    return false;
  }
  return true;
}

function isCheckedTask(roleId: string, taskId: string, accessSettings: IAccessSetting[]) {  
  const role = accessSettings.find(e => e.id.toString() === roleId);
  if(!role) {
    return false;
  }

  const task = role.tasks.find(e => e.id.toString() === taskId)
  if(!task) {
    return false;
  }
  return true;
}

function _getTask(roleId: string, task: IRow, accessSettings: IAccessSetting[]) {
  return <div className={styles.task}
    key={roleId + task.id}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}
    >

    <AccordionCheckbox
      id={roleId + task.id}
      name={`id_${roleId}[id_${task.id}][]`}
      title={task.title}
      checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
    />

    <span onClick={_showActionsList} className="text-muted" hidden={true}>показать действия</span>
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement;
  optionalButton.hidden = !optionalButton?.hidden;
}

function _showActionsList(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  const divActionsList = event.currentTarget.parentElement?.nextElementSibling as HTMLDivElement
  divActionsList.hidden = !divActionsList.hidden;

  event.currentTarget.innerText = divActionsList.hidden ? "показать действия" : "скрыть"
}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
  event.currentTarget.firstElementChild?.classList.toggle("collapsed")
  event.currentTarget.nextElementSibling?.classList.toggle("collapse")
}
