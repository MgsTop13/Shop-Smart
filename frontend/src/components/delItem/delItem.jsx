import "./delItem.scss"

export default function DeleteItemComponent({ delItem, item, onClose }) {
    return (
        <div className="CardItem">
            <div className="item1">
                <h3 className="title">Você quer mesmo remover {item.name}?</h3>
                
                <div className="buttonsDelete">
                    <button className="buttonCancel" onClick={onClose}>
                        Sair
                    </button>
                    
                    <button className="buttonConfirm" onClick={() => delItem(item)}>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}