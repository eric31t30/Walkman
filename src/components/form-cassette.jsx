import { useState, useEffect, useRef } from 'react';
import '../styles/form-cassette.css'

export default function FormCassette({ formData , closeForm}) {

	const [newSongTitle, setNewSongTitle] = useState('');           // titulo de la cancion importada
  const [newSongFile, setNewSongFile] = useState(null);           // archivo importado
  const [confimedFile, setconfimedFile] = useState(false)         // verifica si se importo un archivo del form
  const [fileName, setFileName] = useState('')                    // muestra el nombre del archivo importado
  const [onForm, setOnForm] = useState(false)                     // verifica el estado del formulario 
  const [invalidateTitle, setInvalidateTitle] = useState(false)   // verifica si el input text no tiene un valor
  const [invalidateFile, setInvalidateFile] = useState(false)     // verifica si el input file no tiene un valor

  const [cassetteStyle, setCassetteStyle] = useState(1);

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
        audioUrl,
        background: `cassette-${cassetteStyle}`
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


  const increment= ()=>{
    
    if(cassetteStyle == 10){
      setCassetteStyle(1)
    }else if (cassetteStyle) {
      setCassetteStyle(prev=> prev + 1)
    }
    
  }

  const decrease= ()=>{
    if(cassetteStyle == 1){
      setCassetteStyle(10)
    }else if (cassetteStyle) {
      setCassetteStyle(prev=> prev - 1)
    }
    
  }
  
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
          <div className={`input-cassette-style cassette-${cassetteStyle}`}>
            <div className='cont-text-input-cassette'>
              <div className='text-input-cassette'>{newSongTitle}</div>
            </div>
            <span className='switch-cassette switch-left'  onClick={decrease}></span>
            <span className='switch-cassette switch-right' onClick={increment}></span>
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
