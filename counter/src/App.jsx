import Navbar from './components/Navbar'
import CounterContext from './CounterContext'
import { useState } from 'react'
import Panel from './components/Panel'
import Footer from './components/Footer'

const App = () => {

  const [counter, setCounter] = useState(0)

  return (
    <div>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <Panel />
        <Footer />
      </CounterContext.Provider>
    </div>
  );
}

export default App