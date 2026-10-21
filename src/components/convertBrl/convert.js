export default function convertNumToBrl(value){
    const newPrice = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value);
    return newPrice;
}