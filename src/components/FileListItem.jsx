const FileListItem = ({ file, download, handleFileConvert, progress }) => {
    let fileSize
    if (file.size > 1000000) {
        fileSize = `${(file.size / 1000 / 1000).toFixed(1)} MB`
    } else {
        fileSize = `${Math.round(file.size / 1000)} KB`
    }

    return (
        <div className="list-row">
            <p className="fileName">{file.name}</p>
            <p className="fileSize italic">{fileSize}</p>
            <button className="convert_button color-blue" onClick={handleFileConvert}>Lag Hefte</button>
            {!download && progress && (
                <span className="loader"></span>
            )}
            {download && (
                <a className="download_button" href={URL.createObjectURL(download.file)} download={`${download.fileName}-book.pdf`}><button className="color-green">Last ned</button></a>
            )}
        </div>
        )
}

export default FileListItem