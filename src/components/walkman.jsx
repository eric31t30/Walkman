import '../styles/walkman.css'
import { useState, useRef, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'


export default function Walkman({ openDoor }) {

  const [buttonPicked, setbuttonPicked] = useState('')

  const buttonPlay = useRef()
  const buttonRewind = useRef()
  const buttonPause = useRef()

  const buttons = [buttonPlay, buttonRewind, buttonPause]
  
  const pressButton = (element) =>{
    
    const classButton = element.target.classList[1];

    setbuttonPicked(classButton);
  }

  useEffect(() => {

    if (buttonPicked == 'button-rewind') {
      
      setTimeout(() => {
        setbuttonPicked('');
      }, 800);
    
    }
    
    for(const button of buttons){
      button.current.classList.add('no-events');
  
      setTimeout(() => {
        button.current.classList.remove('no-events');
      }, 800);
    }
      
  }, [buttonPicked])
  
  
  
  const {isOver, setNodeRef: setDroppableNodeRef} = useDroppable({
    id: 'droppable-cassette-door',
  });
  
 

  const {attributes, listeners, setNodeRef: setDraggableNodeRef, transform} = useDraggable({
    id: 'draggable-cassette-door',
  });
  const draggableStyle = transform ? {
    transform: `translate3d(0px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className='container-walkman'>
      <div className='walkman-body sprite-rendering'>

        <div className='capstan'></div>

        <div className='door-colision' ref={setDroppableNodeRef} ></div>
        
        <div className='container-door'>
          
          <div className={`cassette-door ${openDoor ? 'cassette-door-open' : ''}`} 
            ref={setDraggableNodeRef} 
            style={draggableStyle}
            {...attributes}
            {...listeners}
          
          ></div>
        </div>
        

        <div 
          className={`buttons button-play ${buttonPicked === 'button-play' ? 'button-press' : ''}`} 
          onClick={(event) => {
            pressButton(event);
          }}  
          ref={buttonPlay}
        ></div>

        

        <div 
          className={`buttons button-rewind ${buttonPicked === 'button-rewind' ? 'button-press' : ''}`}  
          onClick={(event) => {
            pressButton(event);
          }} 
          ref={buttonRewind}
        ></div>

        <div 
          className={`buttons button-pause ${buttonPicked === 'button-pause' ? 'button-press' : ''}`}  
          onClick={(event) => {
            pressButton(event);
          }} 
          ref={buttonPause}
        ></div>

        <div className='buttons buttons-controls'></div>

        <span className='walkman-meal-decoration sprite-rendering'></span>
      </div>
    </div>
  )
}
