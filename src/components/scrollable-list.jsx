import '../styles/scrollable-list.css'

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


export default function ScrollableList() {

  const array = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5', 'Elemento 6', 'Elemento 7', 'Elemento 8'];
 

  return (
    <div className='list-container'>
      <SimpleBar className='list'>
        {array.map((item, index)=> (
          <div className='list-element' key={index}>{item}</div>
        ))}
      </SimpleBar>
    </div>
  );
}


