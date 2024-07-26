import { useState, useEffect } from 'react';
import '../styles/scrollable-list.css'
import Cassette from './cassette';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function ScrollableList({ cassetteClick, doorState}) {

  const [cassetteSelect, setCassetteSelect] = useState('') //guarda el valor del cassette seleccionado para ser enviado
  
  const [cassettes, setCassettes] = useState([
    {id: 0, songTitle: '90s - flvs'},
    {id: 1, songTitle: 'ok'},
    {id: 2, songTitle: 'green to blue'},
    {id: 3, songTitle: 'call me'},
    {id: 4, songTitle: 'simpson wave'},
  ])
  
  

  const cassetteSelected = (id) =>{
    if (doorState == true) {
      setCassetteSelect(cassettes[id])
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
    </div>
  );
}
