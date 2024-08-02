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
  const [onForm, setOnForm] = useState('')                  // activa el formulario
  const [transitionForm, setTransformForm] = useState('')   // activa la transicion del formulario

  const [cassettes, setCassettes] = useState([]);

  useEffect(() => {
    setCassettes([
      { id: uuidv4(), songTitle: 'call me', audioUrl: '/songs/call me.mp3' },
      { id: uuidv4(), songTitle: 'simpsonwave', audioUrl: '/songs/simpsonwave.mp3' },
      { id: uuidv4(), songTitle: 'memory reboot', audioUrl: '/songs/memory reboot.mp3' },
      { id: uuidv4(), songTitle: 'in a garden', audioUrl: '/songs/in a garden.mp3' },
      { id: uuidv4(), songTitle: 'The synth wars', audioUrl: '/songs/The synth wars.mp3' },
    ]);
  }, []);

  const cassetteSelected = (id) => {
    if (doorState) {
      const selectedCassette = cassettes.find(cassette => cassette.id === id);
      if (selectedCassette) {
        setCassetteSelect(selectedCassette);
      }
    } else {
      setTapeMessage(true);
    }
  };

  useEffect(() => {
    cassetteClick(cassetteSelect)
  }, [cassetteSelect])

  const formData =(data)=>{
    setCassettes((prevCassettes) => [
      ...prevCassettes,
      { id: uuidv4(), ...data }
    ]);

    setTransformForm(false)
    
    setTimeout(() => {
      setOnForm(false)
    }, 800);
  }

  const closeForm =(data)=>{

    setTransformForm(data)
    
    setTimeout(() => {
      setOnForm(data)
    }, 800);
  }

  const deleteCassette= (id)=>{
    const removeCassette = cassettes.filter(cassette => cassette.id !== id);
    setCassettes(removeCassette)
  }
  
  return (
    <div className='list-container'>
      
      <div className='list-container-background'>
        <SimpleBar className='list' >
        <div className={`call-form ${onForm ? 'no-events' : ''}`} onClick={()=> {setOnForm(true), setTransformForm(true)}}>
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

        <div className={`transition-form ${transitionForm ? 'visible' : ''}`}>
          {onForm && (
            <FormCassette formData={formData} closeForm={closeForm}></FormCassette>
          )}
        </div>
      </div>
    
    </div>
  );
}

