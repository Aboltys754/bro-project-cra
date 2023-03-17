type Props = {
  id: string,
  name: string,
  title: string,
  checked: boolean
}

export default function AccordionCheckbox({ id, name, title, checked }: Props) {
  return <>
    <input type="checkbox" 
      name={name}
      defaultChecked={checked}
      id={id}
      className="form-check-input" />

    <label className="form-check-label" htmlFor={id}>
      {title}
    </label>
  </>
}
