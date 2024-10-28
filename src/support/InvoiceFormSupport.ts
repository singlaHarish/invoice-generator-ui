import { MemoItem } from "../models/InvoiceModels";

export const calculateSubTotal = (memoItems: MemoItem[]): string => {
    if (memoItems.length === 0) {
        return "0.00";
    }

    const total = memoItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0)

    return total.toFixed(2).toString();
}

export const calculateGST = (subTotal: string, rate: number = 18): string => {
    const subTotalValue = parseFloat(subTotal);
    if (isNaN(subTotalValue)) {
        return "0.00";
    }

    const gst = (subTotalValue * rate) / 100;
    return gst.toFixed(2); // Format GST to 2 decimal places
}

export const calculateFinalBill = (subTotal: string, gstAmount: string): string => {
    const subTotalValue = parseFloat(subTotal);
    const gstValue = parseFloat(gstAmount);
    if (isNaN(subTotalValue) || isNaN(gstValue)) {
        return "0.00";
    }

    const finalBill = subTotalValue + gstValue;
    return finalBill.toFixed(2); // Format final bill to 2 decimal places
}