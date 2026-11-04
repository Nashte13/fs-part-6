import Navbar from './components/Navbar'
import CounterContext from './CounterContext'

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