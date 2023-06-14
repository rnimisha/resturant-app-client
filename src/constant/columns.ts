
export interface Column {
    id: 'name' | 'price' | 'unit',
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}

export const PRODUCT_COLUMNS : readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 180 },
    { id: 'price', label: 'Price (USD)', minWidth: 100 },
    {
        id: 'unit',
        label: 'Unit',
        minWidth: 170,
        align: 'center',
    }
];