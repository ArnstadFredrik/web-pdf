const InputOption = ({onChange, checked, label, type, id}) => {
    return (
    <div className={type}>
        <input type={type} id={id} onChange={onChange} checked={checked}/>
        <label htmlFor={id}>{label}<span className="italic"> Det er noe problem med valg...</span></label>
    </div>
    )
}

export default InputOption
