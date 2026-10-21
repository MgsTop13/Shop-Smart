import "./addItem.scss"
import { useState, useEffect } from "react"
import convertNumToBrl from "../convertBrl/convert.js";



export default function AddItemComponent({saveItem}){
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [qtd, setQtd] = useState(0);
    const [total, setTotal] = useState(0);
    
    const product = {
        name,
        price,
        qtd
    }

    function Save(){
        saveItem(product)
    }

    
    useEffect(() => {
        setTotal(convertNumToBrl(qtd * price))
    }, [price, qtd])

    return(
        <div className="CardItem">
            <div className="item1">
                <h3 className="title">Nome do produto:</h3>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="item2">
                <h3 className="price">Preço do produto:</h3>
                <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="item3">
                <h3 className="qtd">Quantidade do produto:</h3>
                <input
                    type="number"
                    value={qtd}
                    onChange={(e) => setQtd(e.target.value)} 
                />
            </div>
            
             <p>{total}</p>
            <button className="buttonAdd" onClick={Save}>Salvar item</button>
        </div>
    )
}