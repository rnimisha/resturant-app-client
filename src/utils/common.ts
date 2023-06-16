import { type AxiosError } from 'axios';

import { type RevenuePerMonth, type ErrorResponse, type FieldError, type userError, type LineChartData, type RevenuePerCategory } from './interface/interface';
import moment from 'moment';
import { CHARTCOLORS } from '../constant/color';

export const extractError = (error: FieldError[]): userError => {
    const err = error.reduce((acc, current) => ({ ...acc, [current.field]: current.description }), {});

    return err;
};

export const getErrorResponse = (error : AxiosError): ErrorResponse =>{

    let err: ErrorResponse = { success: false, msg: 'Unexpected Error' };

    if(error?.response?.data){
        const success: boolean = (error.response.data as ErrorResponse).success || false

        const msg: string = (error.response.data as ErrorResponse).msg || 'Unexpected Server Error'

        const fieldError = (error.response.data as ErrorResponse).fieldError || []

        err = {
            success,
            msg,
            fieldError
        }
    }
    return err
}



// --- chart helper

const getDataForYear = ( labels: string[], year: string, data: RevenuePerMonth[]): Array<number | null>=>{

    const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
        ];

    const currentMonthIndex = moment().month();
    const remainingMonths = monthNames.slice(currentMonthIndex + 1);

    const filtered = data.filter((item)=>{
       return `${item.year}` === year
    })
    const revenueForYear = labels.reduce<Array<number | null>>((acc, current)=>{
        const revenue = filtered.find((item)=>
            current === item.month
        )

        if( year === moment().format('YYYY') && remainingMonths.includes(current.toLowerCase().trim()) && !revenue?.total){
            console.log('jej')
            return [...acc, null]

        }
        return [...acc, revenue?.total || 0]
    }, [])

    return revenueForYear
}

export const extractRevenueLablelData = (data: RevenuePerMonth[]): LineChartData =>{

    const labels = data.reduce<string[]>((acc, current)=>{
        if(!acc.includes(current.month)){
            acc = [...acc, current.month]
        }
        return acc
    },[])

    const currentYear =  moment().format('YYYY');
    const previousYear = moment().subtract(1, 'year').format('YYYY');

    const currentRevenueData = getDataForYear(labels, currentYear, data)
    const previousRevenueData = getDataForYear(labels, previousYear, data)

    return{
        labels,
        datasets:[
            {
                label: `Current(${currentYear}) Revenue`,
                data: currentRevenueData,
                borderColor: CHARTCOLORS[0],
                backgroundColor: CHARTCOLORS[0],
            },
            {
                label: `Previous(${previousYear}) Revenue`,
                data: previousRevenueData,
                borderColor: CHARTCOLORS[8],
                backgroundColor: CHARTCOLORS[8],
            }
        ]
    }

}

export const extractRevenueCategory = (data: RevenuePerCategory[]): LineChartData =>{

    const labels = data.map((item)=> item.category_name)
    const revenue = data.map((item)=> item.total)

    const colors = Object.values(CHARTCOLORS)

    return {
        labels,
        datasets: [
            {
                label: 'Revenue By Category',
                data: revenue,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

}
