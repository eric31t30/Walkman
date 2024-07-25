import { useState, useEffect } from 'react'
import './App.css'
import ScrollableList from './components/scrollable-list'
import Walkman from './components/walkman'

import { DndContext } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers';

function App() {
 

  const [openDoor, setOpenDoor] = useState(true);
  const [cassetteOnStage, setCassetteOnStage] = useState(false)
  const [cassetteSend, setCassetteSend] = useState(false)
  
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'droppable-cassette-door') {
      setOpenDoor(true)
    }else{
      setOpenDoor(false)
    }
  };

  const cassetteClick = (data)=> {
    setCassetteOnStage(data)
  }

  useEffect(() => {
    setCassetteSend(cassetteOnStage)
  }, [cassetteOnStage])
  
  return (
  
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <div className='container-app background'>
        <ScrollableList cassetteClick={cassetteClick}></ScrollableList>
        <Walkman openDoor={openDoor} receiveCassette={cassetteSend}></Walkman>

        <span className='border-deco border-top'></span>
        <span className='border-deco border-bottom'></span>
      </div>
    </DndContext>
  )
}

export default App
