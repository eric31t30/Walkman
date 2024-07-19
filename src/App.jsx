import './App.css'
import ScrollableList from './components/scrollable-list'
import Walkman from './components/walkman'

function App() {
 

  return (
    <div className='container-app background'>
      <ScrollableList></ScrollableList>
      <Walkman></Walkman>

      <span className='border-deco border-top'></span>
      <span className='border-deco border-bottom'></span>
    </div>
  )
}

export default App
