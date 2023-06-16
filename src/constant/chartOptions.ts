export const REVENUEOPTION = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Total Revenue By Month',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value: number | string) {
                    return `$${value}`;
                },
            },
        },
    },
};