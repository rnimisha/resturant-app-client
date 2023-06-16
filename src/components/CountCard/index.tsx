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
    format?: string;
}
const CountCard = ({ item, icon, format }: PropsType): JSX.Element => {
    return (
        <Container>
            <Element width="55%">
                <Name>{item.name}</Name>
                <Total>
                    {format}
                    {item.total}
                </Total>
            </Element>
            <Element width="44%">
                <StyledIcon className="material-symbols-rounded">
                    {icon}
                </StyledIcon>
            </Element>
        </Container>
    );
};

export default CountCard;
