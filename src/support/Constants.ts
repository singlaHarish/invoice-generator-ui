
export const enterpriseName = 'M/S. Skyline Invoices Pvt. Ltd.';

export const subTotal = 'Sub Total:';

export const gst = 'GST@18%';

export const totalBill = 'Total Bill Amt.';

// Options for the first dropdown
export const itemTypeOptions = ['Plain Glass', 'Toughened Glass', 'Mirror Glass'];

// Options for the second dropdown
export const itemSubTypeOptions = {
    'Plain Glass': ['2MM', '4MM', '5MM', '8MM', '10MM', '12MM'],
    'Toughened Glass': ['8MM', '10MM'], 
    'Mirror Glass': ['4MM', '5MM']
};

export const invoice_api_base_url = process.env.REACT_APP_INVOICE_API_BASE_URL!

