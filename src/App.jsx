import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {create_book} from './booklet/book.js'
import InputOption from './components/InputOption.jsx'
import FileList from './components/FileList.jsx'



const Upload = () => {
  const [file, setFile] = useState('')
  const [download, setDownload] = useState('')
  const [shortEdge, setShortEdge] = useState(true)

  function handleFileChange(e) {
    if (e.target.files) {
      console.log('file is selected');
 
      setFile(e.target.files[0])
      setDownload('')
    } else {
      console.log('file is not selected');
    }
  }

  async function handleFileConvert(e) {
    const fileBuffer = await file.arrayBuffer()
    
    const fileName = file.name.split('.pdf')[0]
  
    const pdfArray = await create_book({file: fileBuffer, short_edge: shortEdge})
    const pdf = new Blob([pdfArray],{type: 'application/pdf'})

    if (pdf) setDownload({file: pdf, fileName})  
    
  }

  function handleShortEdge(e) {
    setShortEdge(e.target.checked)
  }

  return (
    <div className="upload grid">
        <input
          className='filePicker'
          onChange={handleFileChange} 
          type='file' 
          id="upload" 
          name="upload"
        />

        {file && (
          <div className="options">
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
        <FileList file={file} download={download}/>
      )}

      <div className="actions">
        {file && (
          <button onClick={handleFileConvert} className="color-blue">Convert to Book</button>
        )}

      </div>


    </div>
  )
}

const App = () => {
  return (
    <>
    <h1>PDF Hefte</h1>
    <Upload />
    </>
  )
}

export default App
