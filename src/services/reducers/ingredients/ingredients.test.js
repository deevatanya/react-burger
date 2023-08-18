import ingredients from './ingredients';
import * as types from '../../constants';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredients(undefined, {}))
        .toEqual({
            ingredientsList: {
                buns: [],
                mains: [],
                sauces: []
            },
            ingredientsRequest: false,
            ingredientsFailed: false,
        
            currentTab: 'buns'
      })
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredients(undefined, {
        type: types.GET_INGREDIENTS_REQUEST,
    })).toEqual({
        ingredientsList: {
            buns: [],
            mains: [],
            sauces: []
        },
        ingredientsRequest: true,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [],
            mains: [],
            sauces: []
        },
        ingredientsRequest: true,
        ingredientsFailed: false,
    
        currentTab: 'buns'
  }, {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: [{type: 'bun', uuid: '111'}, {type: 'sauce', uuid: '222'}, {type: 'main', uuid: '333'}]
    })).toEqual({
        ingredientsList: {
            buns: [{type: 'bun', uuid: '111'}],
            mains: [{type: 'main', uuid: '333'}],
            sauces: [{type: 'sauce', uuid: '222'}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [],
            mains: [],
            sauces: []
        },
        ingredientsRequest: true,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    }, {
        type: types.GET_INGREDIENTS_FAILED,
    })).toEqual({
        ingredientsList: {
            buns: [],
            mains: [],
            sauces: []
        },
        ingredientsRequest: false,
        ingredientsFailed: true,
    
        currentTab: 'buns'
    });
  });

  it('should handle CHANGE_COUNT_BUN', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1 }, {type: 'bun', _id: '222', count: 0}],
            mains: [],
            sauces: []
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    }, {
        type: types.CHANGE_COUNT_BUN,
        id: '222'
    })).toEqual({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 0 }, {type: 'bun', _id: '222', count: 1}],
            mains: [],
            sauces: []
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

  it('should handle REMOVE_COUNTS', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1}],
            mains: [{type: 'main', _id: '333', count: 1}],
            sauces: [{type: 'sauce', _id: '222', count: 1}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
  }, {
        type: types.REMOVE_COUNTS,
    })).toEqual({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 0}],
            mains: [{type: 'main', _id: '333', count: 0}],
            sauces: [{type: 'sauce', _id: '222', count: 0}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

  it('should handle INCREASE_COUNT', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1}],
            mains: [{type: 'main', _id: '333', count: 1}],
            sauces: [{type: 'sauce', _id: '222', count: 1}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
  }, {
        type: types.INCREASE_COUNT,
        id: '333'
    })).toEqual({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1}],
            mains: [{type: 'main', _id: '333', count: 2}],
            sauces: [{type: 'sauce', _id: '222', count: 1}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

  it('should handle DECREASE_COUNT', () => {
    expect(ingredients({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1}],
            mains: [{type: 'main', _id: '333', count: 1}],
            sauces: [{type: 'sauce', _id: '222', count: 1}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
  }, {
        type: types.DECREASE_COUNT,
        id: '333'
    })).toEqual({
        ingredientsList: {
            buns: [{type: 'bun', _id: '111', count: 1}],
            mains: [{type: 'main', _id: '333', count: 0}],
            sauces: [{type: 'sauce', _id: '222', count: 1}]
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    });
  });

});