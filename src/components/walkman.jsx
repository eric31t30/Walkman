import '../styles/walkman.css'


import buttonPlay from '../assets/sprites/button-play.png'
import buttonRewind from '../assets/sprites/button-rewind.png'
import buttonPause from '../assets/sprites/button-pause.png'
import buttonControls from '../assets/sprites/buttons-controls.png'

export default function Walkman() {
 

  return (
    <div className='container-walkman'>
      <div className='walkman-body sprite-rendering'>

        <div className='capstan'></div>
        
        <div className='cassette-door'></div>

        <img className='button-play' src={buttonPlay} alt="boton" draggable='false' />

        <img className='button-rewind' src={buttonRewind} alt="boton" draggable='false' />

        <img className='button-pause' src={buttonPause} alt="boton" draggable='false' />

        <img className='buttons-controls' src={buttonControls} alt="boton" draggable='false' />

        <span className='walkman-meal-decoration sprite-rendering'></span>
      
      </div>
    </div>
  )
}
