const Controls = ({ counter, setCounter }) => {
    const increment = () => setCounter(counter + 1)
    const decrement = () => setCounter(counter - 1)
    const zero = () => setCounter(0)

    return (
      <div>
        <button onClick={increment}>Plus</button>
        <button onClick={decrement}>Minus</button>
        <button onClick={zero}>Zero</button>
      </div>
    );
}

export default Controls