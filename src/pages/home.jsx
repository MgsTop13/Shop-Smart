import "./home.scss"
import { useEffect, useState } from "react"
import AddItemComponent from "../components/addItem.jsx";
import Limit from "../components/limit.jsx"

export default function Home() {
    const [itens, setItens] = useState([{
       name: "a",
       price: 19,
       qtd: 2
    }]);
    const [open, setOpen] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [value, setValue] = useState(0);
    const [limit, setLimit] = useState(0);

    function addItem() {
        setOpen(!open);
    }
    
    function addLimit(){
        setOpenL(!openL);
    }

    function LoadItem(item) {
        // Verifica ANTES de adicionar
        const novoTotal = value + (Number(item.price) * Number(item.qtd));
        
        if (limit > 0 && novoTotal > limit) {
            alert(`Você atingiria o limite de R$ ${limit}. Item não adicionado!`);
            return; // NÃO adiciona o item
        }
        
        // Só adiciona se passar na verificação
        setItens([...itens, item]);
        setOpen(false); // Fecha o modal
    }
    
    function LoadLimit(limitR){
        setLimit(Number(limitR));
        setOpenL(false);
    }

    function calculation() {
        let total = 0;

        for (let i = 0; i < itens.length; i++) {
            let valor = itens[i].price * itens[i].qtd;
            valor = Number(valor.toFixed(2));
            total += valor
        }
        
        setValue(total);
        
        // Verifica se ultrapassou (caso tenham adicionado antes do limite)
        if(limit > 0 && total > limit){
            alert(`ATENÇÃO: Você ultrapassou o limite de R$ ${limit}!`);
        }
    }
    
    function edit(item){
       alert(item)
    }

    useEffect(() => {
        calculation();
    }, [itens]);

    return (
        <main className="shop">
            {open &&
                <AddItemComponent
                    saveItem={LoadItem}
                    onClose={() => setOpen(false)} // Passa função pra fechar
                />
            }
            
            {openL &&
                <Limit
                    saveValue={LoadLimit}
                    onClose={() => setOpenL(false)}
                />
            }

            <div className="value">
                <h1 className="text">{`O valor total é`}</h1>
                <h1 className="money">{`R$: ${value}`}</h1>
            </div>
            
            <section className={`card ${open ? "modalOpen" : "modalClose"}`}>
                {itens.map((item, index) => (
                    <div className="product" key={index}>
                        <div className="name">
                            <h3>{item.name}</h3>
                            <h3 className="money">R$ {item.price}</h3>
                        </div>

                        <div className="qtd">
                            <h2>Qtd:</h2>
                            <h3>{item.qtd}</h3>
                        </div>
                        
                        <button onClick={edit}>Editar</button>
                    </div>
                ))}
            </section>

            <div className="buttons">
                <button onClick={addItem} className="add">{open ? "Fechar" : "Adicionar item"}</button>
                <button onClick={addLimit} className="limitButton">{`${openL ? "Fechar": "Adicionar limite"}`}</button>
                <button onClick={calculation}>Calcular</button>
            </div>
        </main>
    )
}