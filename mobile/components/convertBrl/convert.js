export function convertNumToBrl(value){
    const newPrice = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value);
    return newPrice;
}

export function convertBrlToNum(value){
    const newString = String(value);
    const newNum = newString.replace("R$");
    console.log(newNum)
}