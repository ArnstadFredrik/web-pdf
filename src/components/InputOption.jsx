const InputOption = ({ onChange, checked, label, type, id }) => {
  return (
    <div className={type}>
      <input type={type} id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputOption;
