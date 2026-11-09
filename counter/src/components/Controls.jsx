import useCounter from '../hooks/useCounter'

const Controls = () => {

    const {increment, decrement, zero} = useCounter()

    return (
      <div>
        <button onClick={increment}>Plus</button>
        <button onClick={decrement}>Minus</button>
        <button onClick={zero}>Zero</button>
      </div>
    );
}

export default Controls