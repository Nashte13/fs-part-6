import { useState } from 'react'
import Display from './components/Display'
import Navbar from './components/Navbar'
import Controls from './components/Controls'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Navbar />
      <Display counter={counter} />
      <Controls counter={counter} setCounter={setCounter} />
    </div>
  )
}

export default App