export default function InputCheckbox({ id, label, className, checked, setChecked }) {
  return(
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type='checkbox'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </div>
  )
}