import { useState } from 'react';
import '../styles/scrollable-list.css'
import Cassette from './cassete';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


import { snapCenterToCursor, restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


export default function ScrollableList() {

  const [cassettes, setCassettes] = useState([
    {id: 1, songTitle: '90s - flvs'},
    {id: 2, songTitle: 'ok'},
    {id: 3, songTitle: 'green to blue'},
    {id: 4, songTitle: 'call me'},
    {id: 5, songTitle: 'simpson wave'},
  ])
  
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setCassettes((cassete) => {
        
        const oldIndex = cassete.findIndex(cassete => cassete.id === active.id);
        const newIndex = cassete.findIndex(cassete => cassete.id === over.id);

        return arrayMove(cassete, oldIndex, newIndex);
      });
    }else if(over){
      
    }
  }

  return (
    <div className='list-container'>
      
      <SimpleBar className='list' >
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          
        >
          <SortableContext 
            items={cassettes}
            strategy={verticalListSortingStrategy}
          >
            {cassettes.map(cassette => <Cassette songTitle={cassette.songTitle} key={cassette.id} id={cassette.id} />)}
          </SortableContext>
        </DndContext>
       </SimpleBar>
      
    </div>
  );
}






// export default function ScrollableList() {
  
//   return (
//     <div className='list-container'>
//       <SimpleBar className='list'>
//         <Cassette 
//           songTitle= '90s-flvs' 
          
//           />

//         <Cassette />
//         <Cassette />
//         <Cassette />
//         <Cassette />
//         <Cassette />
        
//         </SimpleBar>
//     </div>
//   );
// }


