import { useEffect, useState } from 'react';
import CountCard from '../../../components/CountCard';

import { ChartTitle, FlexBox, Item, Row } from './dashboard.styled';
import {
    type LineChartData,
    type AnalyticsCountType,
} from '../../../utils/interface/interface';
import {
    getCountAnalytics,
    getRevenuePerCategory,
    getRevenuePerMonth,
} from '../../../services/analytics.services';
import { CountIcons } from '../../../constant/styles';
import LineCharts from '../../../components/Chart/LineCharts';
import {
    extractRevenueCategory,
    extractRevenueLablelData,
} from '../../../utils/common';
import { CATEGORYOPTIONS, REVENUEOPTION } from '../../../constant/chartOptions';
import PieCharts from '../../../components/Chart/PieCharts';
import COLOR from '../../../constant/color';
import Heading from '../../../components/Heading';

const Dashboard = (): JSX.Element => {
    const [counts, setCounts] = useState<AnalyticsCountType[]>([]);
    const [revenuePerMonth, setRevenuePerMonth] = useState<LineChartData>();
    const [revenuePerCat, setRevenuePerCat] = useState<LineChartData>();

    useEffect(() => {
        getCountAnalytics()
            .then((resp) => {
                setCounts(resp);
            })
            .catch((err) => {
                console.log(err);
            });

        getRevenuePerMonth()
            .then((data) => {
                const chartdata = extractRevenueLablelData(data);
                setRevenuePerMonth(chartdata);
            })
            .catch((err) => {
                console.log(err);
            });

        getRevenuePerCategory()
            .then((data) => {
                const chartdata = extractRevenueCategory(data);
                setRevenuePerCat(chartdata);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <FlexBox>
            <Row>
                <Heading text="Welcome Back!" />
            </Row>

            <Row>
                {counts?.map((item: AnalyticsCountType, index) => {
                    return (
                        <Item
                            width="22%"
                            key={index}
                            bgColor={COLOR.lightSecondary}
                        >
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
            <Row style={{ marginTop: '20px' }}>
                <Item width="72%" mediumWidth="100%">
                    <ChartTitle>Total Revenue By Month</ChartTitle>

                    {revenuePerMonth && (
                        <LineCharts
                            chartData={revenuePerMonth}
                            options={REVENUEOPTION}
                        />
                    )}
                </Item>
                <Item width="25%">
                    <ChartTitle>Total Revenue By Category</ChartTitle>
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {revenuePerCat && (
                            <PieCharts
                                chartData={revenuePerCat}
                                options={CATEGORYOPTIONS}
                            />
                        )}
                    </div>
                </Item>
            </Row>
        </FlexBox>
    );
};

export default Dashboard;
