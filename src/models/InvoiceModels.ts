export interface CustomerDetails {
    customerName: string;
    address: string;
    contact: string;
}


export interface MemoItem {
    itemType: string;
    itemSubType: string;
    ratePerItem: string;
    quantity: string;
    price: string;
}

export interface MemoDetails {
    customerName: string
    address: string
    contact: string
    invoiceDate: string
    billAmount: string
    memoItems: MemoItem[]
}

