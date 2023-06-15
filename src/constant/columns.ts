import { type optionVal } from "../utils/interface/interface";
import moment from 'moment'

export interface Column {
    id: 'name' | 'price' | 'unit' | 'order_id'| 'order_status'| 'order_date'
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: string) => string;
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

export const ORDER_COLUMNS : readonly Column[] = [
    { id: 'order_id', label: 'Order', minWidth: 180, format: (value:string) =>  `#${value}`, },
    { id: 'order_status', label: 'Status', minWidth: 100 },
    {
        id: 'order_date',
        label: 'Time',
        minWidth: 170,
        align: 'center',
        format: (value:string) =>  moment(value).fromNow()
    }
];


export const STATUS_OPTION: optionVal[] = [
    {
        option: 'All Orders',
        value: 'all'
    },
    {
        option: 'Order Received',
        value: 'Order Received'
    },
    {
        option: 'Processing',
        value: 'Processing'
    },
    {
        option: 'Completed',
        value: 'Completed'
    },

]