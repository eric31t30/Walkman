import '../styles/walkman.css'
import { useState, useRef, useEffect } from 'react'



export default function Walkman() {
  
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
  
  
  
  
  return (
    <div className='container-walkman'>
      <div className='walkman-body sprite-rendering'>

        <div className='capstan'></div>
        
        <div className='cassette-door'></div>

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
