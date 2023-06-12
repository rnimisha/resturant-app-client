import { RotatingLines } from 'react-loader-spinner';
import COLOR from '../../constant/color';

const Loader = (): JSX.Element => {
    return (
        <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
            <RotatingLines
                strokeColor={COLOR.primary}
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loader;
