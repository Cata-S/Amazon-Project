export function formatMoney(priceCents) {
 return (priceCents / 100).toFixed(2);
}

export default formatMoney;