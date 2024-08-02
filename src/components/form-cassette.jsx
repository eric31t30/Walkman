import { useState, useEffect, useRef } from 'react';
import '../styles/form-cassette.css'

export default function FormCassette({ formData , closeForm}) {

	const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);
  const [confimedFile, setconfimedFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [onForm, setOnForm] = useState(false)
  const [invalidateTitle, setInvalidateTitle] = useState(false)
  const [invalidateFile, setInvalidateFile] = useState(false)
   
  const fileInputRef = useRef();

  const TitleChange = (e) => {
    setNewSongTitle(e.target.value);
  };

  

  const FileChange = (e) => {
    setNewSongFile(e.target.files[0]);
    setconfimedFile(true)
    setInvalidateFile(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newSongTitle.length == 0) {
      setInvalidateTitle(true)
    } 

    if (!newSongFile) {
      setInvalidateFile(true)
    }
    
    if (newSongTitle && newSongFile) {
      
      const audioUrl = URL.createObjectURL(newSongFile);
      
      const newCassette =({
        songTitle: newSongTitle,
        audioUrl
      });

      
      setNewSongTitle('');
      setNewSongFile(null);
      setFileName('')
      setconfimedFile(false)
      
      formData(newCassette)
    }
  };

  const formClick=()=>{
    fileInputRef.current.click();
  }

  useEffect(() => {
    if(newSongFile){
      setFileName(newSongFile.name)
    }
  }, [newSongFile])

  
  return (
    <div className='container-form'>
      <div className='close-form' onClick={()=> {closeForm(onForm)}}></div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='cont-text'>
          <input 
            type="text" 
            className='input-text'
            placeholder='Titulo de la canción'
            name='text-title-song'
            onChange={TitleChange}
            autoComplete='off'
            maxLength={12} 
            value={newSongTitle}
          />
          <p className='notice'>un máximo de 12 letras</p>
          <p className={`invalidate-title ${invalidateTitle ? '' : 'hidden'}`}>El titulo de la cancion es obligatorio.</p>
          <div className='input-cassette-style'>
            <div className='cont-text-input-cassette'>
              <div className='text-input-cassette'>{newSongTitle}</div>
            </div>
                
          </div>
          <button className='button-form'>AGREGAR</button>
        </div>
      
          <div className='cont-file'>
            <div className='file-button' onClick={formClick}>
            <div className='file-button-img'></div>
            <div className={`confirmed-file ${confimedFile ? 'confirmed-file-active' : ''}`}></div>
            <div className='cont-file-name'>
              <p className={`file-name`}>{fileName}</p>
            </div>
            <p className={`invalidate-title ${invalidateFile ? '' : 'hidden'}`}>se debe seleccionar un archivo.</p>
          </div>
        
          <input 
            ref={fileInputRef}
            type="file" 
            className='input-file'
            accept='audio/*'
            placeholder='song'
            name='song'
            onChange={FileChange}
          />
        </div>
      </form>
    </div>
  )
}
