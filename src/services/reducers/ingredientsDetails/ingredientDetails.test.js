import ingredientDetails from './ingredientDetails';
import * as types from '../../constants';

describe('constructor ingredient details', () => {
  it('should return the initial state', () => {
    expect(ingredientDetails(undefined, {}))
        .toEqual({
            _id: '',
            uuid: '',
            name: '',
            type: '',
            price: NaN,
            image: '',
            calories: NaN,
            carbohydrates: NaN,
            fat: NaN,
            proteins: NaN,
            image_large: '',
            image_mobile: '',
            count: NaN,
        })
  });

  it('should handle SET_INGREDIENT_DETAILS', () => {
    expect(ingredientDetails(undefined, {
        type: types.SET_INGREDIENT_DETAILS,
        info: {
            _id: '123',
            uuid: '546',
            name: 'bla',
            type: 'bun',
            price: 888
        }
    })).toEqual({
        _id: '123',
        uuid: '546',
        name: 'bla',
        type: 'bun',
        price: 888
    });
  });

  it('should handle REMOVE_INGREDIENT_DETAILS', () => {
    expect(ingredientDetails({
        _id: '123',
        uuid: '546',
        name: 'bla',
        type: 'bun',
        price: 888
    }, {
        type: types.REMOVE_INGREDIENT_DETAILS,
    })).toEqual({});
  });

});