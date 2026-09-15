import { useCounterControls } from '../store';

const Controls = () => {
    const { increment, decrement, zero } = useCounterControls()

    return (
        <div>
            <button onClick={increment}>Plus</button>
            <button onClick={decrement}>Minus</button>
            <button onClick={zero}>Zero</button>
        </div>
    )
}

export default Controls;