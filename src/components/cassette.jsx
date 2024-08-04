import '../styles/cassette.css'
import cassetteImage from '../assets/sprites/cassettes/cassette-10.png'

export default function Cassette({ songTitle, id, cassetteSelected, deleteCassette, background, className}) {

  
  const style ={
    backgroundImage: `url(${cassetteImage})`,
  }

  return (
    <div className='cassette-cont'>
      <div className={`cassette list-element ${className}`} 
        onClick={() => {cassetteSelected(id)}}
        id={id} 
        style={background}>
        <p className='song-title'>{songTitle}</p>
      </div>
      <span className='remove-button' onClick={()=>{deleteCassette(id)}}>
        <span className='remove-button-img'></span>
      </span>
    </div>
  );
}
