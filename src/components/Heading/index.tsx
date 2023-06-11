import COLOR from '../../constant/color';

interface PropsType {
    text: string;
    fontSize?: string;
    color?: string;
    fontWeight?: number;
}
const Heading = ({
    text,
    fontSize,
    color,
    fontWeight,
}: PropsType): JSX.Element => {
    return (
        <h2
            style={{
                fontSize: fontSize ?? '26px',
                color: COLOR.primary ?? color,
                fontWeight: fontWeight ?? 800,
            }}
        >
            {text}
        </h2>
    );
};

export default Heading;
