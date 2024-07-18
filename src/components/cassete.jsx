import '../styles/cassette.css'


import cassetteImage from '../assets/sprites/cassette.png'

export default function Cassette({ songTitle }) {

	return (
    <div className='cassette list-element' style={{backgroundImage: `url(${cassetteImage})`}}>
      <p className='song-title'> {songTitle} </p>
    </div>
  );
}
