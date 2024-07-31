import { useState, useEffect, useRef } from 'react';
import '../styles/scrollable-list.css'
import Cassette from './cassette';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function ScrollableList({ cassetteClick, doorState}) {

  const [cassetteSelect, setCassetteSelect] = useState('')  // guarda el valor del cassette seleccionado para ser enviado
  const [tapeMessage, setTapeMessage] = useState(false)     // envia el mensaje de puerta cerrada al cambiar de cassette
  const [onForm, setOnForm] = useState(false)
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);
  const [confimedFile, setconfimedFile] = useState(false)
  const [fileName, setFileName] = useState('')

  const [cassettes, setCassettes] = useState([
    {id: 0, songTitle: 'call me', audioUrl: '/songs/call me.mp3'},
    {id: 1, songTitle: 'simpsonwave', audioUrl: '/songs/simpsonwave.mp3'},
    {id: 2, songTitle: 'memory reboot', audioUrl: '/songs/memory reboot.mp3'},
    {id: 3, songTitle: 'in a garden', audioUrl: '/songs/in a garden.mp3'},
    {id: 4, songTitle: 'The synth wars', audioUrl: '/songs/the synth wars.mp3'}
  ])

  const fileInputRef = useRef();


  
  const cassetteSelected = (id) =>{
    if (doorState == true) {
      setCassetteSelect(cassettes[id])
    }

    if (doorState == false) {
      setTapeMessage(true)
    }else{
      setTapeMessage(false)
    }
  }

  useEffect(() => {
    cassetteClick(cassetteSelect)
  }, [cassetteSelect])
  

  const TitleChange = (e) => {
    setNewSongTitle(e.target.value);
  };

  
  const FileChange = (e) => {
    setNewSongFile(e.target.files[0]);
    setconfimedFile(true)
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newSongTitle && newSongFile) {
      
      const audioUrl = URL.createObjectURL(newSongFile);

      
      setCassettes([...cassettes, {
        id: cassettes.length,
        songTitle: newSongTitle,
        audioUrl
      }]);

      
      setNewSongTitle('');
      setNewSongFile(null);
      setFileName('')
      setconfimedFile(false)
      setOnForm(false)
    }
  };

  
  useEffect(() => {
    console.log(cassettes);
  }, [cassettes])
  

  const formClick=()=>{
    fileInputRef.current.click();
  }

  useEffect(() => {
    if(newSongFile){
      setFileName(newSongFile.name)
    }
  }, [newSongFile])
  
  

  return (
    <div className='list-container'>
      
      <SimpleBar className='list' >
      <div className='call-form' onClick={()=> setOnForm(true)}>
        <span className='call-form-icon'></span>
      </div>
        {cassettes.map(cassette => 
          <Cassette 
            songTitle={cassette.songTitle} 
            key={cassette.id} 
            id={cassette.id} 
            cassetteSelected={cassetteSelected}
          />
        )}
      </SimpleBar>

      {tapeMessage ? 
        <div 
          className={`text-open-tape ${setTapeMessage ? 'tape-animation' : ''}`}
          onAnimationEnd={()=> {setTapeMessage(false)}}
        >DESLIZA LA TAPA HACIA ARRIBA PARA CAMBIAR DE CINTA</div> 
      : ''}

      {onForm && (
        <div className='container-form'>
          <div className='close-form' onClick={()=>{setOnForm(false)}}></div>
          <form className='form' onSubmit={handleSubmit}>
            <div className='cont-text'>
              <input 
                type="text" 
                className='input-text'
                placeholder='nombre de la canción'
                name='text-title-song'
                onChange={TitleChange}
                autoComplete='off'
                maxLength={12} 
              />
              <p className='notice'>un máximo de 12 letras</p>
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
      )}

    </div>
  );
}

