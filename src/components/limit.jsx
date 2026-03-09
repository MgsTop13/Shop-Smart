import "./limit.scss"
import { useState } from "react"

export default function Limit({saveValue}){
    const [limit, setLimit] = useState(0);
    
    const Save = () => {
        saveValue(limit)
    }
    
    return(
        <div className="limit">
            <h1 className="title">Digite o limite: </h1>
            <input 
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
            />
            <button onClick={Save} className="limit-button">Salvar Limite</button>
        </div>
    )
}