import "./edit.scss"
import { useState, useEffect } from "react"
import convertNumToBrl from "../convertBrl/convert.js";

// 1. Adicionado o onClose aqui nas props
export default function EditItemComponent({editItem, item, onClose}){
    const [id, setId] = useState(item.id);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [qtd, setQtd] = useState(item.qtd);
    const [total, setTotal] = useState(0);
    
    const product = { id, name, price, qtd }
    
    function save(){
        editItem(product)
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
            
            <p className="totalPreview">{total}</p>
            
            {/* 2. Novos botões agrupados */}
            <div className="buttonsAction">
                <button className="buttonCancel" onClick={onClose}>Sair</button>
                <button className="buttonConfirm" onClick={save}>Salvar</button>
            </div>
        </div>
    )
}