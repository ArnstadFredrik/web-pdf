const FileListItem = ({ file, download }) => {
    return (
        <div className="list-row">
            <p className="fileName">{file.name}</p>
            <p className="fileSize italic">{Math.round(file.size / 1000)} kB</p>
            <p className="fileType italic">{file.type.split('/')[1]}</p>
            {download && (
                <a className="download_button" href={URL.createObjectURL(download.file)} download={`${download.fileName}-book.pdf`}><button className="color-green">Last ned</button></a>
            )}
        </div>
        )
}

export default FileListItem