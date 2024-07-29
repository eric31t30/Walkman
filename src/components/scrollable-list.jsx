import { useState, useEffect } from 'react';
import '../styles/scrollable-list.css'
import Cassette from './cassette';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function ScrollableList({ cassetteClick, doorState}) {

  const [cassetteSelect, setCassetteSelect] = useState('')  // guarda el valor del cassette seleccionado para ser enviado
  const [tapeMessage, setTapeMessage] = useState(false)     // envia el mensaje de puerta cerrada al cambiar de cassette
  
  const [cassettes, setCassettes] = useState([
    {id: 0, songTitle: 'call me'},
    {id: 1, songTitle: 'simpsonwave'},
    {id: 2, songTitle: 'memory reboot'},
    {id: 3, songTitle: 'in a garden'},
    {id: 4, songTitle: 'The synth wars'}
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

  return (
    <div className='list-container'>
      <SimpleBar className='list' >
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
    </div>
  );
}

