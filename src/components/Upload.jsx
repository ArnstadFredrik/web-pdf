import { mdiCog } from "@mdi/js";
import Icon from "@mdi/react";

const Upload = ({ onChange, handleSettings }) => {
  return (
    <>
      <div className="upload content grid">
        <input
          className="filePicker content"
          onChange={onChange}
          type="file"
          id="upload"
          name="upload"
          accept=".pdf"
        />

        <Icon
          className="settings_icon"
          path={mdiCog}
          title="Innstillinger"
          size={1}
          onClick={handleSettings}
        />
      </div>
    </>
  );
};

export default Upload;
