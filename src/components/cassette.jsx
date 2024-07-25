import '../styles/cassette.css'
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


import cassetteImage from '../assets/sprites/cassette.png'
import { useState } from 'react';

export default function Cassette({ songTitle, id, cassetteSelected }) {

  
  const style ={
    backgroundImage: `url(${cassetteImage})`,
  }


  return (
    <div className={`cassette list-element `} 
      onClick={() => {cassetteSelected(id)}}
      id={id} 
      style={style}>
      <p className='song-title'>{songTitle}</p>
    </div>
  );
}
