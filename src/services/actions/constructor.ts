import {
    DELETE_INGREDIENT, 
    ADD_BUN_INGREDIENT,
    ADD_UNLOCKED_INGREDIENT,
    DELETE_ALL_INGREDIENTS,
    UPDATE_UNLOCKED
} from '../constants/index';
import { IIngredient } from '../initialState';

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly uuid: string;
}

export interface IAddBunIngredientAction {
    readonly type: typeof ADD_BUN_INGREDIENT;
    readonly info: IIngredient;
}

export interface IAddUnlockedIngredientAction {
    readonly type: typeof ADD_UNLOCKED_INGREDIENT;
    readonly info: IIngredient;
}

export interface IDeleteAllIngredientsAction {
    readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export interface IUpdateUnlockedAction {
    readonly type: typeof UPDATE_UNLOCKED;
    readonly updatedUnLocked: IIngredient[]
}

export type TConstructorActions = IDeleteIngredientAction
    | IAddBunIngredientAction
    | IAddUnlockedIngredientAction
    | IDeleteAllIngredientsAction
    | IUpdateUnlockedAction;
