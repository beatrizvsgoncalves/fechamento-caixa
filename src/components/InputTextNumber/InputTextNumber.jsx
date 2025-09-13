export default function InputTextNumber({id, label, type, value, setValue}) {
  return (
    <div className='form-field'>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}