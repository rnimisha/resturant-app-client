import { Item } from '../../containers/Logout/logout.styled';
import AppButton from '../AppButton';

interface PropsType {
    title: string;
    yesAction: () => void;
    cancelAction: () => void;
}
const Confirmation = ({
    title,
    yesAction,
    cancelAction,
}: PropsType): JSX.Element => {
    return (
        <>
            <Item>{title}</Item>
            <Item>
                <AppButton text="Yes" action={yesAction} />
            </Item>
            <Item>
                <AppButton text="Cancel" error={true} action={cancelAction} />
            </Item>
        </>
    );
};

export default Confirmation;
