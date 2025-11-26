import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {create_book} from './booklet/book.js'



const Upload = () => {
  const [file, setFile] = useState('')
  const [download, setDownload] = useState('')

  function handleFileChange(e) {
    if (e.target.files) {
      console.log('file is selected');
 
      setFile(e.target.files[0])      
    } else {
      console.log('file is not selected');
    }
  }

  async function handleFileConvert(e) {
    const fileBuffer = await file.arrayBuffer()
    
    const fileName = file.name.split('.pdf')[0]
  
    const pdfArray = await create_book({file: fileBuffer})
    const pdf = new Blob([pdfArray],{type: 'application/pdf'})

    if (pdf) setDownload({file: pdf, fileName})  
    
  }

  return (
    <div clss="upload">
        <input 
          onChange={handleFileChange} 
          type='file' 
          id="upload" 
          name="upload"
        />

      {file && (
        <div>
          <p>File Name: {file.name}</p>
          <p>Size: {file.size}</p>
          <p>Type: {file.type}</p>
        </div>
      )}

      <button onClick={handleFileConvert}>Convert to Book</button>

      {download && (
        <a href={URL.createObjectURL(download.file)} download={`${download.fileName}-book.pdf`}><button>Last ned</button></a>
      )}


    </div>
  )
}

const App = () => {
  return (
    <>
    <h2>PDF Hefte</h2>
    <Upload />
    </>
  )
}

export default App
