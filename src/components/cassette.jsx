import '../styles/cassette.css'
import cassetteImage from '../assets/sprites/cassette.png'

export default function Cassette({ songTitle, id, cassetteSelected }) {

  
  const style ={
    backgroundImage: `url(${cassetteImage})`,
  }

  return (
    <div className='cassette-cont'>
      <div className={`cassette list-element `} 
        onClick={() => {cassetteSelected(id)}}
        id={id} 
        style={style}>
        <p className='song-title'>{songTitle}</p>
      </div>
      <span className='remove-button' onClick={()=>{console.log('siiii');}}>
        <span className='remove-button-img'></span>
      </span>
    </div>
  );
}
