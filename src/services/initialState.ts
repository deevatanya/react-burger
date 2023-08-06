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
    count: number;
};
export interface IMessage {
    status: string,
    number: number,
    createdAt: string,
    updatedAt?: string
    ingredients?: string[],
    _id?: string,
    name: string
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
    constructorBurger: {
        unLocked: IIngredient[],
        bun: IIngredient | null
    },
    ingredientDetails?: IIngredient,
    order: {
        orders: [],
        orderRequest: boolean,
        orderFailed: boolean,
        currentNumber: number | null,
        orderData: IMessage
    },
    user: {
        isAuth: boolean,
        isResetPassword: boolean,
        authRequest: boolean,
        authFailed: boolean,
        data: {name: string, email: string},
    },
    ws: {
        wsConnected: boolean,
        messages: IMessage[];
        total?: number,
        totalToday?: number,
        error?: Event,
    }
};

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
    constructorBurger: {
        unLocked: [],
        bun: null
    },
    ingredientDetails: {
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
    },
    order: {
        orders: [],
        orderRequest: false,
        orderFailed: false,
        currentNumber: null,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    },
    user: {
        isAuth: false,
        isResetPassword: false,
        authRequest: false,
        authFailed: false,
        data: {
            name: '',
            email: ''
        },
    },
    ws: {
        wsConnected: false,
        messages: []
    }
  };