export const REVENUEOPTION = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
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

export const CATEGORYOPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    }
};