import Navbar from './components/Navbar'
import CounterContext from './CounterContext'

const App = () => {

  return (
    <div>
      <CounterContext.Provider>
        <Panel />
        <Footer />
      </CounterContext.Provider>
    </div>
  );
}

export default App