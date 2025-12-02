import { useState } from "react";
import "./App.css";
import "./Component.css";
import { create_book } from "./booklet/book.js";
import FileList from "./components/FileList.jsx";
import EmbedPdf from "./components/EmbedPdf.jsx";
import { useEffect } from "react";
import Settings from "./components/Settings.jsx";
import Upload from "./components/Upload.jsx";

const App = () => {
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(false);
  const [download, setDownload] = useState("");
  const [shortEdge, setShortEdge] = useState(false);
  const [settings, setSettings] = useState(false);
  const [preview, setPreview] = useState(false);

  async function handleFileConvert() {
    setProgress(() => true);
    const fileBuffer = await file.arrayBuffer();
    const short_edge = shortEdge;

    const fileName = file.name.split(".pdf")[0];

    const pdfArray = await create_book({
      file: fileBuffer,
      short_edge,
    });
    const pdf = new Blob([pdfArray], { type: "application/pdf" });

    if (pdf) {
      setDownload({ file: pdf, fileName, url: URL.createObjectURL(pdf) });
      setProgress(() => false);
    }
  }

  useEffect(() => {
    if (file) handleFileConvert();
  }, [file, shortEdge]);

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
    setShortEdge(() => e.target.checked);
    setDownload("");
  }

  function handleSettings() {
    setSettings((settings) => (settings ? false : true));
  }

  function handlePreview() {
    setPreview((preview) => (preview ? false : true));
  }
  return (
    <>
      <h1 className="padding-large content">PDF Hefte</h1>
      <Upload onChange={handleFileChange} handleSettings={handleSettings} />

      {settings && (
        <Settings handleShortEdge={handleShortEdge} checked={shortEdge} />
      )}

      {file && (
        <FileList
          file={file}
          download={download}
          handleFileConvert={handleFileConvert}
          progress={progress}
          handlePreview={handlePreview}
        />
      )}
      {download && preview && <EmbedPdf download={download} />}
    </>
  );
};

export default App;
