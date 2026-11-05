import "./limit.scss"
import { useState } from "react"

export default function Limit({saveValue, limit2}){
    const [limit, setLimit] = useState(0);
    
    function Save(){
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
            <p>Limite atual: {limit2 ? limit2 : "Nenhum insirido"}</p>
            <button onClick={Save} className="limit-button">Salvar Limite</button>
        </div>
    )
}