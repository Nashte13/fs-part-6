import { useState } from 'react'
import Display from './components/Display'
import Navbar from './components/Navbar'
import Controls from './components/Controls'
import Panel from './components/Panel'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Navbar />
      <Panel />
      <Display counter={counter} />
      <Controls counter={counter} setCounter={setCounter} />
    </div>
  )
}

export default App