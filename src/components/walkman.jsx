import '../styles/walkman.css'
import { useState, useRef, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import ReactPlayer from 'react-player/file'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

export default function Walkman({ openDoor, receiveCassette }) {

  const [buttonPicked, setbuttonPicked] = useState('')                 // verfica cual es el boton seleccionado 
  const [cassetteActual, setCassetteActual] = useState('')             // tiene el valor de cassette elegido
  const [animationEnd, setAnimationEnd] = useState(true);              // termina la animacion cuando se cambia el cassette
  const [cassetteAnimation, setCassetteAnimation] = useState(false)    // activa la animacion del cassette elegido

  const [playing, setPlaying] = useState(false);                       // inicia o pausa la cancion
  const [song, setSong] = useState('')                                 // valor de la cancion (cancion elegida)
  const [buttonPress, setButtonPress] = useState(false)                // activa el sonido del boton
  const [tape, setTape] = useState(false)                              // activa el sonido del cassette door
  const [switchCassette, setSwitchCassette] = useState(false)          // activa el sonido de cambio de cassette
  const [doorCont, setDoorCont] = useState(false);                     // verfica si la puerta se cerro por primera vez
  const [valueVolume, setvalueVolume] = useState(6);                   // volumen de la cancion (0 a 10)
  
  const buttonPlay = useRef()
  const buttonRewind = useRef()
  const buttonPause = useRef()
  const cassetteSelected = useRef()                                     // referencia al objeto del cassette
  const prevCassette = useRef();                                        // guarda el valor del cassette previamente elegido no actual el anterior
  
  const playerSongRef = useRef();                                       // referencia al reproductor (musica en general)
  const playerButtonsRef = useRef();                                    // referencia el player de los botones
  const playerTapeRef = useRef();                                       // referencia al cassette door
  const playerSwitchRef = useRef();                                     // referencia al cambio de cassette

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

  
  useEffect(() => {
    if (buttonPress == true) {
      setTimeout(() => {
        playerButtonsRef.current.seekTo(0);
        setButtonPress(false)
      }, 800);
    }
  }, [buttonPress])
  
 
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
      setPlaying(false);
      setbuttonPicked('');
    }
    
  }, [receiveCassette])
 
  useEffect(() => {
    if (!cassetteActual == false && openDoor == true) {
      setCassetteAnimation(true)
      setAnimationEnd(false)
      setTimeout(() => {
        setSong(`/songs/${cassetteActual.songTitle}.mp3`);
      }, 800);
      
    } 
  }, [cassetteActual])

  
  
  // control de los audios

  const restartAudio = () => {
    playerSongRef.current.seekTo(0);
    setPlaying(false);
  };

  useEffect(() => {
    if (openDoor == false) {
      setDoorCont(true);
    }
  }, [openDoor]);

  useEffect(() => {
    if (doorCont && openDoor === false) {
      setTimeout(() => {
        setTape(true);
      }, 400);
    } else if (doorCont > 1) {
      setTape(false);
    }
  }, [openDoor]);

  useEffect(() => {
    if (tape) {
      setTimeout(() => {
        playerTapeRef.current.seekTo(0);
        setTape(false)
      }, 800);
    }
  }, [tape])

  useEffect(() => {
    if(cassetteAnimation){
      setTimeout(()=>{
        setSwitchCassette(true)
      }, 800)
    
      setTimeout(() => {
        playerSwitchRef.current.seekTo(0);
        setSwitchCassette(false)
      }, 1200);
    }
  }, [cassetteAnimation])


  

  const normalizeVolume = (value) => {
    return ((value - 1) / (10 - 1)).toFixed(1);
  };

  const handleChange = (value) => {
    setvalueVolume(value);
    
  };

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
            {
              pressButton(event),
              setPlaying(true),
              setButtonPress(true)
            }
          }}  
          ref={buttonPlay}
        ></div>

        

        <div 
          className={`buttons button-rewind ${buttonPicked === 'button-rewind' ? 'button-press' : ''}`}  
          onClick={(event) => {
            {
              pressButton(event),
              restartAudio(),
              setButtonPress(true)
            }
          }} 
          ref={buttonRewind}
        ></div>

        <div 
          className={`buttons button-pause ${buttonPicked === 'button-pause' ? 'button-press' : ''}`}  
          onClick={(event) => {
            {
              pressButton(event),
              setPlaying(false),
              setButtonPress(true)
            }
          }} 
          ref={buttonPause}
        ></div>

        <div className='buttons buttons-controls no-events'></div>

    
          <div className='cont-volume-button'>
            <Slider
              className='volume-button'
              min={1}
              max={10}
              step={1}
              defaultValue={valueVolume}
              onChange={handleChange}
              styles={{
                handle: {
                  height: 28,
                  width: 140,
                  borderRadius: 0,
                  opacity: 1,
                  boxSizing: 'border-box',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent'
                },
                track:{
                  backgroundColor: 'transparent'
                },
                rail:{
                  backgroundColor: 'transparent'
                }
                
              }}
            />
          </div>
        
        
        <span className='walkman-meal-decoration sprite-rendering'></span>
      </div>

      <ReactPlayer
        className='reproducer'
        ref={playerSongRef}
        url={song}
        playing={playing}
        onEnded={()=> {setbuttonPicked(''), setPlaying(false);}}
        width='0px'
        height='0px'
        volume={parseFloat(normalizeVolume(valueVolume))}
      />

      <ReactPlayer
        className='reproducer'
        ref={playerButtonsRef}
        url={'/sound-effects/button-controls.wav'}
        playing={buttonPress}
        volume={.5}
        width='0px'
        height='0px'
      />

      <ReactPlayer
        className='reproducer'
        ref={playerTapeRef}
        url={'/sound-effects/tape.wav'}
        playing={tape}
        width='0px'
        height='0px'
        />

     
      <ReactPlayer
        className='reproducer'
        ref={playerSwitchRef}
        url={'/sound-effects/switch-cassette.wav'}
        playing={switchCassette}
        width='0px'
        height='0px'
        />
      
    </div>
  )
}
