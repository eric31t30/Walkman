import { useState, useEffect } from 'react'
import './App.css'
import ScrollableList from './components/scrollable-list'
import Walkman from './components/walkman'

import { DndContext } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers';

function App() {
 

  const [openDoor, setOpenDoor] = useState(false);                //abre o cierra la puerta del walkman ademas verifica el estado de esta
  const [cassetteOnStage, setCassetteOnStage] = useState(false)   //recibe el cassette elegido desde scrollable list true si lo recibe
  const [cassetteSend, setCassetteSend] = useState(false)         //envia el cassette elegido al walkman 
 
  
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'droppable-cassette-door') {
      setOpenDoor(true)
      }else{
      setOpenDoor(false)
    }
  };

  const open= (e)=>{
    setOpenDoor(e)
  }
  
  const cassetteClick = (data)=> {
    setCassetteOnStage(data)
  }

  useEffect(() => {
    setCassetteSend(cassetteOnStage)
  }, [cassetteOnStage])
  
  return (
  
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <div className='container-app background'>
        <ScrollableList cassetteClick={cassetteClick} doorState={openDoor}></ScrollableList>
        <Walkman openDoor={openDoor} receiveCassette={cassetteSend} open={open}></Walkman>
        <span className='border-deco border-top'></span>
        <span className='border-deco border-bottom'></span>
      </div>

      
    </DndContext>
  )
}

export default App
