export type QuantityAction = { type: 'INCREMENT' } | { type: 'DECREMENT' };

export const quantityReducer = (state: number, action: QuantityAction): number => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state === 1 ? state : state - 1;
            default:
                return state;
        }
    };