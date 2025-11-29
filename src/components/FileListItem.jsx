import printJS from "print-js";
import Icon from "@mdi/react";
import { mdiFileDownload, mdiPrinter } from "@mdi/js";

const FileListItem = ({ file, download, handleFileConvert, progress }) => {
  let fileSize;
  if (file.size > 1000000) {
    fileSize = `${(file.size / 1000 / 1000).toFixed(1)} MB`;
  } else {
    fileSize = `${Math.round(file.size / 1000)} KB`;
  }

  const id = "one";

  const handlePrint = () => {
    if (download) printJS(download.url);
  };

  return (
    <div className="list-row">
      <p className="fileName">{file.name}</p>
      <p className="fileSize italic">{fileSize}</p>
      {!download && !progress && (
        <button
          className="convert_button color-blue"
          onClick={handleFileConvert}
        >
          Lag Hefte
        </button>
      )}
      {!download && progress && <span className="loader"></span>}
      {download && (
        <>
          <a
            className="download_button"
            href={download.url}
            download={`${download.fileName}-book.pdf`}
          >
            <button className="color-green button">
              <Icon path={mdiFileDownload} title="Last ned" size={1} />
            </button>
          </a>
          <button
            onClick={handlePrint}
            className="print_button color-green button"
            key={file.name}
          >
            <Icon path={mdiPrinter} title="Skriv ut" size={1} />
          </button>
        </>
      )}
    </div>
  );
};

export default FileListItem;
