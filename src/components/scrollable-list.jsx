import { useState, useEffect } from 'react';
import '../styles/scrollable-list.css'
import Cassette from './cassette';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import FormCassette from './form-cassette';

import { v4 as uuidv4 } from 'uuid';

export default function ScrollableList({ cassetteClick, doorState}) {

  const [cassetteSelect, setCassetteSelect] = useState('')  // guarda el valor del cassette seleccionado para ser enviado
  const [tapeMessage, setTapeMessage] = useState(false)     // envia el mensaje de puerta cerrada al cambiar de cassette
  const [onForm, setOnForm] = useState('')
  
  const [cassettes, setCassettes] = useState([
    {id: uuidv4(), songTitle: 'call me', audioUrl: '/songs/call me.mp3'},
    {id: uuidv4(), songTitle: 'simpsonwave', audioUrl: '/songs/simpsonwave.mp3'},
    {id: uuidv4(), songTitle: 'memory reboot', audioUrl: '/songs/memory reboot.mp3'},
    {id: uuidv4(), songTitle: 'in a garden', audioUrl: '/songs/in a garden.mp3'},
    {id: uuidv4(), songTitle: 'The synth wars', audioUrl: '/songs/The synth wars.mp3'}
  ])

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

  const formData =(data)=>{
    setCassettes((prevCassettes) => [
      ...prevCassettes,
      { id: uuidv4(), ...data }
    ]);

    setOnForm(false)
  }

  const closeForm =(data)=>{
    setOnForm(data)
  }

  const deleteCassette= (id)=>{
    const removeCassette = cassettes.filter(cassette => cassette.id !== id);
    setCassettes(removeCassette)
  }
  
  useEffect(() => {
    console.log(cassettes);
  }, [cassettes])
  
  
  return (
    <div className='list-container'>
      
      <div className='list-container-background'>
      <SimpleBar className='list' >
      <div className='call-form' onClick={()=> setOnForm(true)}>
        <span className='call-form-icon'></span>
        <span className='text-call-form'>Añade un cassette</span>
      </div>
        {cassettes.map(cassette => 
          <Cassette 
            songTitle={cassette.songTitle} 
            key={cassette.id} 
            id={cassette.id} 
            cassetteSelected={cassetteSelected}
            deleteCassette={deleteCassette}
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
        <FormCassette formData={formData} closeForm={closeForm}></FormCassette>
      )}
      </div>
    
    </div>
  );
}

