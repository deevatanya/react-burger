export const initialState = {
    ingredients: {
        ingredientsList: [],
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
        orderBody: [],
        orderRequest: false,
        orderFailed: false,
        orderNumber: null
    },
  };