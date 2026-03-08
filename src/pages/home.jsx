import "./home.scss"
import { useEffect, useState } from "react"
import AddItemComponent from "../components/addItem.jsx";

export default function Home() {
    const [itens, setItens] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [limit, setLimit] = useState(0);

    function addItem() {
        setOpen(!open);
    }

    function LoadItem(item) {
        setItens([...itens, item])
    }

    function calculation() {
        let total = 0;

        for (let i = 0; i < itens.length; i++) {
            let valor = itens[i].price * itens[i].qtd;
            valor.toFixed(2)
            total += valor
        }
        if(value > limit){
            return alert("Você atingiu o limite de dinheiro!")
        } else{
            setValue(total)
        }
    }

    useEffect(() => {
        calculation();
    }, [itens])


    return (
        <main className="shop">
            {open &&
                <AddItemComponent
                    saveItem={LoadItem}
                />
            }

            <div className="value">
                <h1 className="text">{`O valor total é`}</h1>
                <h1 className="money">{`R$: ${value}`}</h1>
            </div>
            <section className={`card ${open ? "modalOpen" : "modalClose"}`}>
                {itens.map((item) => (
                    <div className="product">
                        <div className="name">
                            <h2>Nome:</h2>
                            <h3>{item.name}</h3>
                        </div>

                        <div className="price">
                            <h2>Preço:</h2>
                            <h3 className="money">R$ {item.price}</h3>
                        </div>

                        <div className="qtd">
                            <h2>Quantidade:</h2>
                            <h3>{item.qtd}</h3>
                        </div>
                    </div>
                ))}
            </section>

            <div className="buttons">
                <button onClick={addItem} className="add">{open ? "Fechar" : "Adicionar item"}</button>
                <button className="limit">{`Adicionar limite`}</button>
                <button onClick={calculation}>Calcular</button>
            </div>
        </main>
    )
}