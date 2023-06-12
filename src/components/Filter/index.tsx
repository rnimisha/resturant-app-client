import { useEffect, useState } from 'react';
import { getCategory } from '../../services/category.services';
import {
    type CheckedCategories,
    type CategoryItem,
} from '../../utils/interface/interface';
import { MainContainer, Title } from './filter.styled';
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Slider,
} from '@mui/material';

interface PropsType {
    handleCheckBox: (id: number, name: string) => void;
    selectedCategories: CheckedCategories;
    handlePriceChange: (min: number, max: number) => void;
    value: number[];
    maximum: number;
}

const Filter = ({
    handleCheckBox,
    selectedCategories,
    handlePriceChange,
    value,
    maximum,
}: PropsType): JSX.Element => {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const fetchCategory = async (): Promise<void> => {
        const resp = await getCategory();

        setCategories(resp.data);
    };

    useEffect(() => {
        fetchCategory().catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <MainContainer>
            <div>
                <Title>Price Filter</Title>
                <Box sx={{ width: '90%' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        max={maximum}
                        onChange={(_, value) => {
                            const val = value as number[];
                            handlePriceChange(val[0], val[1]);
                        }}
                        valueLabelDisplay="auto"
                        // getAriaValueText={}
                        color="secondary"
                    />
                </Box>
            </div>
            <div>
                <Title>Category</Title>
                <FormGroup>
                    {categories.map((item, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox />}
                                label={item.category_name}
                                checked={Object.prototype.hasOwnProperty.call(
                                    selectedCategories,
                                    item.category_id
                                )}
                                onClick={(e) => {
                                    handleCheckBox(
                                        item.category_id,
                                        item.category_name
                                    );
                                }}
                            />
                        );
                    })}
                </FormGroup>
            </div>
        </MainContainer>
    );
};

export default Filter;
