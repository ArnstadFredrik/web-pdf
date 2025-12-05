import FileListItem from "../components/FileListItem.jsx";
import EmbedPdf from "./EmbedPdf.jsx";

const FileList = ({
  file,
  download,
  handleFileConvert,
  progress,
  handlePreview,
}) => {
  return (
    <div className="info content grid">
      <FileListItem
        file={file}
        download={download}
        handleFileConvert={handleFileConvert}
        progress={progress}
        handlePreview={handlePreview}
      />
    </div>
  );
};

export default FileList;
