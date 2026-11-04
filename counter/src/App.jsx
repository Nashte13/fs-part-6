import Navbar from './components/Navbar'
import CounterContext from './CounterContext'

const App = () => {

  return (
    <div>
      <CounterContext>
        <Panel />
        <Footer />
      </CounterContext>
    </div>
  );
}

export default App