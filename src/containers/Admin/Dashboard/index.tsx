import { useEffect, useState } from 'react';
import CountCard from '../../../components/CountCard';

import { FlexBox, Item, Row } from './dashboard.styled';
import { type AnalyticsCountType } from '../../../utils/interface/interface';
import { getCountAnalytics } from '../../../services/analytics.services';
import { CountIcons } from '../../../constant/styles';

const Dashboard = (): JSX.Element => {
    const [counts, setCounts] = useState<AnalyticsCountType[]>([]);

    useEffect(() => {
        getCountAnalytics()
            .then((resp) => {
                setCounts(resp);
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
        </FlexBox>
    );
};

export default Dashboard;
