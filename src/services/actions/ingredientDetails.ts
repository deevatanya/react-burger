import {
    SET_INGREDIENT_DETAILS, 
    REMOVE_INGREDIENT_DETAILS,
} from '../constants/index';
import { IIngredient } from '../initialState';

export interface ISetIngredientDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly info: IIngredient;
}

export interface IRemoveIngredientDetails {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = ISetIngredientDetailsAction | IRemoveIngredientDetails;
