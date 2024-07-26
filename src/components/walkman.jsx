import '../styles/walkman.css'
import { useState, useRef, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import ReactPlayer from 'react-player'

export default function Walkman({ openDoor, receiveCassette }) {

  const [buttonPicked, setbuttonPicked] = useState('')                 // verfica cual es el boton seleccionado 
  const [cassetteActual, setCassetteActual] = useState('')             // tiene el valor de cassette elegido
  const [animationEnd, setAnimationEnd] = useState(true);              // termina la animacion cuando se cambia el cassette
  const [cassetteAnimation, setCassetteAnimation] = useState(false)    // activa la animacion del cassette elegido
  
  const buttonPlay = useRef()
  const buttonRewind = useRef()
  const buttonPause = useRef()
  const cassetteSelected = useRef()                                     // referencia al objeto del cassette
  const prevCassette = useRef();                                        // guarda el valor del cassette previamente elegido no actual el anterior

  

  // logica para los botones del walkman

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

  
 
  // logica para el drag and drop del walkman

  const {isOver, setNodeRef: setDroppableNodeRef} = useDroppable({
    id: 'droppable-cassette-door',
  });
  
  const {attributes, listeners, setNodeRef: setDraggableNodeRef, transform} = useDraggable({
    id: 'draggable-cassette-door',
  });
  const draggableStyle = transform ? {
    transform: `translate3d(0px, ${transform.y}px, 0)`,
  } : undefined;


  
  // logica para el cassette elegido
  
  useEffect(() => {
    if (openDoor == true) {
      setCassetteActual(receiveCassette)
      prevCassette.current = receiveCassette.id
    }
    
  }, [receiveCassette])
  
  const prevReceiveCassette = prevCassette.current;


  useEffect(() => {
    if(prevReceiveCassette !== receiveCassette.id && openDoor == true){
      setCassetteAnimation(false)
    }
  }, [receiveCassette])
 
  useEffect(() => {
    if (!cassetteActual == false && openDoor == true) {
      setCassetteAnimation(true)
      setAnimationEnd(false)
    } 
  }, [cassetteActual])




  
  return (
    <div className='container-walkman'>
      <div className='walkman-body sprite-rendering'>

        <div className='capstan'></div>

        <div className='door-colision' ref={setDroppableNodeRef} ></div>

        <div className='container-door'>
          <div className={`cassette-door  ${openDoor ? 'cassette-door-open' : ''} ${animationEnd ? '' : 'no-events'}`} 
            ref={setDraggableNodeRef} 
            style={draggableStyle}
            {...attributes}
            {...listeners}

          ></div>

          {cassetteAnimation 
            ? <div 
                className={`cassette-actual ${cassetteAnimation ? 'cassette-animation-name' : ''}`}
                id={cassetteActual.id} 
                ref={cassetteSelected} 
                onAnimationEnd={()=>{setAnimationEnd(true)}}
              >
                
                <p className='song-title text-cassette'>{cassetteActual.songTitle}</p>
              </div>
            
            :''
          }
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
