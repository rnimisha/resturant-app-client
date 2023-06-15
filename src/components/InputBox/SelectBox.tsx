import { type optionVal } from '../../utils/interface/interface';
import { SelectField } from './InputBox.styled';

interface PropsType {
    options: optionVal[];
    name: string;
    defaultVal: string | number;
    onChange: any;
}
const SelectBox = ({
    options,
    name,
    onChange,
    defaultVal,
}: PropsType): JSX.Element => {
    return (
        <SelectField as="select" name={name} onChange={onChange}>
            {options?.map((item) => (
                <option
                    key={item.value}
                    value={item.value}
                    selected={defaultVal === item.value}
                >
                    {item.option}
                </option>
            ))}
        </SelectField>
    );
};

export default SelectBox;
