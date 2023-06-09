export const initialState = {
    ingredients: {
        ingredientsList: {
            buns: [],
            mains: [],
            sauces: []
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
    
        currentTab: 'buns'
    },
    constructor: {
        unLocked: [],
        bun: {}
    },
    ingredientDetails: {},
    order: {
        orders: [],
        orderRequest: false,
        orderFailed: false,
        currentNumber: null
    },
  };