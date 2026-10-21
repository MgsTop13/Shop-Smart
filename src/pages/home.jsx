import "./home.scss"
import { useEffect, useState } from "react"
import AddItemComponent from "../components/addItem/addItem.jsx";
import EditItemComponent from "../components/editItem/edit.jsx";
import DeleteItemComponent from "../components/delItem/delItem.jsx";
import Limit from "../components/limit/limit.jsx"
import convertNumToBrl from "../components/convertBrl/convert.js";

export default function Home() {
    const [itens, setItens] = useState([
        
   ]);
   
    let count = itens.length;
    const [open, setOpen] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [index, setIndex] = useState(null);
    const [itemDel, setItemDel] = useState(null);
    const [value, setValue] = useState(0);
    const [limit, setLimit] = useState(0);

    function addItem() {
        setOpen(!open);
    }
    
    function addLimit(){
        setOpenL(!openL);
    }
    
    function delItemModal(){
        setOpenD(!openD)
    }
    
    
    function LoadItem(item) {
        const novoTotal = value + (Number(item.price) * Number(item.qtd));
        
        if (limit > 0 && novoTotal > limit) {
            alert(`Você atingiria o limite de R$ ${limit}. Item não adicionado!`);
            return false;
        };
        
        setItens([...itens, {...item, id: count + 1}]);
        
        setOpen(false);
        return true;
    }
    
    function LoadLimit(limitR){
        setLimit(Number(limitR));
        setOpenL(false);
    }

    function calculation() {
        let total = 0;

        for (let i = 0; i < itens.length; i++) {
            let valor = itens[i].price * itens[i].qtd;
            total += valor;
        }
        
        setValue(convertNumToBrl(total));
        
        if(limit > 0 && total > limit){
            alert(`ATENÇÃO: Você ultrapassou o limite de R$ ${limit}!`);
        }
    }
   
    function edit(newItem) {
        let totalSemOItemAtual = 0;
        itens.forEach((it, i) => {
            if (i !== index) {
                totalSemOItemAtual += (it.price * it.qtd);
            }
        });
    
        const precoNovo = Number(newItem.price) * Number(newItem.qtd);
        const totalFinal = totalSemOItemAtual + precoNovo;
    
        if (limit > 0 && totalFinal > limit) {
            alert(`A edição ultrapassaria o limite de R$ ${limit}!`);
            return;
        }
   
        setItens(itens.map((it, i) => i === index ? newItem : it));
        setIndex(null);
    }
   
   function deleteItem(itemR){
       setItens(itens.filter(item => item.id !== itemR.id))
       setOpenD(false)
   }

    useEffect(() => {
        calculation();
    }, [itens]);

    return (
        <main className="shop">
            {open &&
                <AddItemComponent
                    saveItem={LoadItem}
                    onClose={() => setOpen(false)}
                />
            }
            
            {index !== null && (
                <EditItemComponent
                    editItem={edit}
                    item={itens[index]}
                    onClose={() => setIndex(null)}
                />
            )}
            
            {openL &&
                <Limit
                    saveValue={LoadLimit}
                    limit2={limit}
                    onClose={() => setOpenL(false)}
                />
            }
            
            {openD && itemDel &&
                <DeleteItemComponent
                    delItem={deleteItem}
                    item={itemDel}
                    onClose={() => setOpenD(false)}
                />
            }

            <div className="value">
                <h1 className="text">{`O valor total é`}</h1>
                <h1 className="money">{`${value}`}</h1>
            </div>
            
            <section className={`card ${open ? "modalOpen" : "modalClose"}`}>
    {itens.map((item, i) => (
        <div className="product" key={item.id}>
        
            {/* Botão de fechar (X) no canto superior */}
            <button className="deleteBtn" onClick={() => {setItemDel(item); delItemModal();}}>✖</button>
            
            <div className="itemInfo">
                {/* Nome e Preço na mesma linha */}
                <div className="topInfo">
                    <h3 className="productName">{item.name}</h3>
                    <h3 className="productPrice">{convertNumToBrl(item.price)}</h3>
                </div>
                
                <h3 className="productQtd">Qtd: {item.qtd}</h3>
                
                <hr className="divider" /> {/* Linha divisória igual ao desenho */}
                
                <h3 className="subTotal">{convertNumToBrl(item.price * item.qtd)}</h3>
            </div>
            
            <button className="editBtn" onClick={() => setIndex(i)}>Editar</button>
        </div>
    ))}
</section>

            <div className="buttons">
                <button onClick={addItem} className="add">{open ? "Fechar" : "Adicionar item"}</button>
                <button onClick={addLimit} className="limitButton">{`${openL ? "Fechar": "Adicionar limite"}`}</button>
            </div>
        </main>
    )
}