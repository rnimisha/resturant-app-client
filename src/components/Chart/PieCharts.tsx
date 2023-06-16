import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { type LineChartData } from '../../utils/interface/interface';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PropsType {
    chartData: LineChartData;
    options: any;
}
const PieCharts = ({ chartData, options }: PropsType): JSX.Element => {
    return <Pie data={chartData} options={options} />;
};

export default PieCharts;
