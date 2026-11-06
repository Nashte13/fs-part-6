import { useContext } from "react";
import CounterContext from "./CounterContext";

const Controls = () => {

    const {increment, decrement, zero} = useContext(CounterContext);

    return (
      <div>
        <button onClick={increment}>Plus</button>
        <button onClick={decrement}>Minus</button>
        <button onClick={zero}>Zero</button>
      </div>
    );
}

export default Controls