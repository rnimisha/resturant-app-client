import { useEffect, useState } from 'react';
import CountCard from '../../../components/CountCard';

import { FlexBox, Item, Row } from './dashboard.styled';
import {
    type LineChartData,
    type AnalyticsCountType,
} from '../../../utils/interface/interface';
import {
    getCountAnalytics,
    getRevenuePerMonth,
} from '../../../services/analytics.services';
import { CountIcons } from '../../../constant/styles';
import LineCharts from '../../../components/Chart/LineCharts';
import { extractRevenueLablelData } from '../../../utils/common';
import { REVENUEOPTION } from '../../../constant/chartOptions';
import PieCharts from '../../../components/Chart/PieCharts';

const Dashboard = (): JSX.Element => {
    const [counts, setCounts] = useState<AnalyticsCountType[]>([]);
    const [revenuePerMonth, setRevenuePerMonth] = useState<LineChartData>();

    useEffect(() => {
        getCountAnalytics()
            .then((resp) => {
                setCounts(resp);
            })
            .catch((err) => {
                console.log(err);
            });

        getRevenuePerMonth(2023)
            .then((data) => {
                const chartdata = extractRevenueLablelData(data);
                setRevenuePerMonth(chartdata);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <FlexBox>
            <Row>
                {counts?.map((item: AnalyticsCountType, index) => {
                    return (
                        <Item width="22%" key={index}>
                            <CountCard
                                item={item}
                                format={item.name === 'Revenue' ? '$' : ''}
                                icon={
                                    CountIcons[
                                        item.name as keyof typeof CountIcons
                                    ]
                                }
                            />
                        </Item>
                    );
                })}
            </Row>
            <Row>
                <Item width="72%" mediumWidth="100%">
                    {revenuePerMonth && (
                        <LineCharts
                            chartData={revenuePerMonth}
                            options={REVENUEOPTION}
                        />
                    )}
                </Item>
                <Item width="25%">
                    <PieCharts />
                </Item>
            </Row>
        </FlexBox>
    );
};

export default Dashboard;
