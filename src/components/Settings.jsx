import InputOption from "./InputOption.jsx";

const Settings = ({ handleShortEdge, checked }) => {
  return (
    <div className="options content">
      <h3>Valg</h3>
      <InputOption
        onChange={handleShortEdge}
        checked={checked}
        label="Brett langs kortside"
        id="short_edge"
        type="checkbox"
      />
    </div>
  );
};

export default Settings;
