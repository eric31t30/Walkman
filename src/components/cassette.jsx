import '../styles/cassette.css'


export default function Cassette({ songTitle, id, cassetteSelected, deleteCassette, background, className}) {

  return (
    <div className='cassette-cont list-element'>
      <div className={`cassette  ${className}`} 
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
