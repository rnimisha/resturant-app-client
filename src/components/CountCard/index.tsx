import { type AnalyticsCountType } from '../../utils/interface/interface';
import {
    Container,
    Name,
    Total,
    Element,
    StyledIcon,
} from './CountCard.styled';

interface PropsType {
    item: AnalyticsCountType;
    icon: string;
}
const CountCard = ({ item, icon }: PropsType): JSX.Element => {
    return (
        <Container>
            <Element width="40%">
                <StyledIcon className="material-symbols-rounded">
                    {icon}
                </StyledIcon>
            </Element>
            <Element width="55%">
                <Total>{item.total}</Total>
                <Name>{item.name}</Name>
            </Element>
        </Container>
    );
};

export default CountCard;
