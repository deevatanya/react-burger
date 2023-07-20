export interface IIngredient {
    _id: string;
    uuid: string;
    name: string;
    type: string;
    price: number;
    image: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    proteins: number;
    image_large: string;
    image_mobile: string;
    count?: number;
}
export interface IState {
    ingredients: {
        ingredientsList: {
            buns: IIngredient[],
            mains: IIngredient[],
            sauces: IIngredient[]
        },
        ingredientsRequest: boolean,
        ingredientsFailed: boolean,
        currentTab: string
    },
    constructor: {
        unLocked: IIngredient[],
        bun: IIngredient | {}
    },
    ingredientDetails: {},
    order: {
        orders: [],
        orderRequest: boolean,
        orderFailed: boolean,
        currentNumber: number | null
    },
    user: {
        isAuth: boolean,
        isResetPassword: boolean,
        authRequest: boolean,
        authFailed: boolean,
        data: {},
    }
}
export const initialState:IState = {
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
    user: {
        isAuth: false,
        isResetPassword: false,
        authRequest: false,
        authFailed: false,
        data: {},
    }
  };