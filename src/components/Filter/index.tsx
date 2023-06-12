import { useEffect, useState } from 'react';
import { getCategory } from '../../services/category.services';
import {
    type CheckedCategories,
    type CategoryItem,
} from '../../utils/interface/interface';
import {
    MainContainer,
    StyledSlider,
    StyledThumb,
    StyledTrack,
    Title,
} from './filter.styled';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ReactSlider from 'react-slider';

interface PropsType {
    handleCheckBox: (id: number, name: string) => void;
    selectedCategories: CheckedCategories;
}

const Filter = ({
    handleCheckBox,
    selectedCategories,
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

    const Thumb = (
        props: React.ComponentProps<any>,
        state: any
    ): JSX.Element => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

    const Track = (
        props: React.ComponentProps<any>,
        state: any
    ): JSX.Element => <StyledTrack {...props} index={state.index} />;

    return (
        <MainContainer>
            <div>
                <Title>Price Filter</Title>
                <div>
                    <StyledSlider
                        defaultValue={[0, 100]}
                        renderThumb={Thumb}
                        renderTrack={Track}
                        pearling
                        minDistance={10}
                    ></StyledSlider>
                    <ReactSlider />
                </div>
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
