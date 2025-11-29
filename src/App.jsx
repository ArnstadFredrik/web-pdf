import { useState } from "react";
import "./App.css";
import { create_book } from "./booklet/book.js";
import InputOption from "./components/InputOption.jsx";
import FileList from "./components/FileList.jsx";
import { useEffect } from "react";
import { useCallback } from "react";
import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";

const Upload = () => {
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(false);
  const [download, setDownload] = useState("");
  const [shortEdge, setShortEdge] = useState(true);
  const [settings, setSettings] = useState(false);

  async function handleFileConvert() {
    setProgress(() => true);
    const fileBuffer = await file.arrayBuffer();

    const fileName = file.name.split(".pdf")[0];

    const pdfArray = await create_book({
      file: fileBuffer,
      short_edge: shortEdge,
    });
    const pdf = new Blob([pdfArray], { type: "application/pdf" });

    if (pdf) {
      setDownload({ file: pdf, fileName, url: URL.createObjectURL(file) });
      setProgress(() => false);
    }
  }

  useEffect(() => {
    if (file) handleFileConvert();
  }, [file]);

  async function handleFileChange(e) {
    if (e.target.files) {
      console.log("file is selected");
      const upload = e.target.files[0];
      setFile(() => upload);
      console.log({ file });
      setDownload("");
    } else {
      console.log("file is not selected");
    }
  }

  async function handleShortEdge(e) {
    setShortEdge(e.target.checked);
    setDownload("");
    await handleFileConvert();
  }

  function handleSettings() {
    setSettings((settings) => (settings ? false : true));
  }

  return (
    <div className="upload grid">
      <input
        className="filePicker content"
        onChange={handleFileChange}
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

      {settings && (
        <div className="options content">
          <h3>Valg</h3>
          <InputOption
            onChange={handleShortEdge}
            checked={shortEdge}
            label="Brett langs kortside"
            id="short_edge"
            type="checkbox"
          />
        </div>
      )}

      {file && (
        <FileList
          file={file}
          download={download}
          handleFileConvert={handleFileConvert}
          progress={progress}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <>
      <h1>PDF Hefte</h1>
      <Upload />
    </>
  );
};

export default App;
