import '../styles/scrollable-list.css'
import Cassette from './cassete';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';



export default function ScrollableList() {

  
  return (
    <div className='list-container'>
      <SimpleBar className='list'>
        <Cassette 
          songTitle= '90s-flvs' />

        <Cassette />
        <Cassette />
        <Cassette />
        <Cassette />
        <Cassette />
        
        </SimpleBar>
    </div>
  );
}


