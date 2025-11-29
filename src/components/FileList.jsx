import FileListItem from "../components/FileListItem.jsx";

const FileList = ({ file, download, handleFileConvert, progress }) => {
  return (
    <div className="info content grid">
      <FileListItem
        file={file}
        download={download}
        handleFileConvert={handleFileConvert}
        progress={progress}
      />
    </div>
  );
};

export default FileList;
