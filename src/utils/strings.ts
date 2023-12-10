
export function formatMoney(amount?: number) {
    if (!amount) {
        return '0.00'
    }
    return Math.abs(amount / 100).toFixed(2)
}