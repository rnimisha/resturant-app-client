import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { type LineChartData } from '../../utils/interface/interface';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface PropsType {
    chartData: LineChartData;
    options: any;
}
const LineCharts = ({ chartData, options }: PropsType): JSX.Element => {
    return <Line options={options} data={chartData} />;
};

export default LineCharts;
