const InputOption = ({ onchange, checked, label, type, id }) => {
  return (
    <div className={type}>
      <input type={type} id={id} onchange={onchange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputOption;
