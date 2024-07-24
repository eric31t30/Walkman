import '../styles/cassette.css'
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


import cassetteImage from '../assets/sprites/cassette.png'

export default function Cassette({ songTitle, id }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundImage: `url(${cassetteImage})`,
  };

  return (
    <div className={`cassette list-element ${isDragging ? 'on-dragging' : ''}`} 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}>
      <p className='song-title'> {songTitle} </p>
    </div>
  );
}
