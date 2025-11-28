const FileListItem = ({ file, download }) => {
    return (
        <div className="list-row">
            <p className="value">{file.name}</p>
            <p className="value">{Math.round(file.size / 1000)} kB</p>
            <p className="value">{file.type.split('/')[1]}</p>
            {download && (
                <a className="download_button" href={URL.createObjectURL(download.file)} download={`${download.fileName}-book.pdf`}><button className="color-green">Last ned</button></a>
            )}
        </div>
        )
}

export default FileListItem