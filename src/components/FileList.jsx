import FileListItem from '../components/FileListItem.jsx'

const FileList = ({ file, download }) => {
    return (
        <div className='info full-width'>
            <FileListItem file={file} download={download}/>
        </div>
    )
}

export default FileList