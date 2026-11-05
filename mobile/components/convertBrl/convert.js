export function convertNumToBrl(value){
  const num = Number(value) || 0;
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
}

export function convertBrlToNum(value){
  if (value == null) return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value)
    .replace(/[^\d,-]/g, "")
    .replace(/\./g, "")         
    .replace(",", ".");         
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
}