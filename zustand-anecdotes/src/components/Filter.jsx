import { useAnecdoteStore } from "../store";

const Filter = () => {
    const { actions } = useAnecdoteStore()
    
    const handleChange = (event) => {
        actions.setFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input style={style} onChange={handleChange} />
        </div>
    )
}

export default Filter