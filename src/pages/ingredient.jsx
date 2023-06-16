import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { constants } from '../constants';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { getIngredients } from '../services/actions/ingredients';
import { 
    SET_INGREDIENT_DETAILS, 
} from '../services/actions/ingredientDetails';

export function IngredientPage() {
  const currentId = useParams().id;
  const dispatch = useDispatch();

  const getIngredientsList = (state) => state.ingredients.ingredientsList;
  const getIngredientDetails = (state) => state.ingredientDetails;
  const ingredientDetails = useSelector(getIngredientDetails);
  const { mains, buns, sauces} = useSelector(getIngredientsList);


useEffect(() => {
	dispatch(getIngredients(`${constants.URL}/ingredients`));

}, [dispatch]);

	useEffect(() => {
		const ingredients = [...mains, ...buns, ...sauces];
		const info = ingredients.find((item) => item._id === currentId);
		dispatch({type: SET_INGREDIENT_DETAILS, info});
  }, [currentId, dispatch, mains, buns, sauces]);
    
  return (
    <>
			{!ingredientDetails._id ?
			(<div className='center_info'>
				<p className="text text_type_main-large">
					Ингредиент не найден
				</p>
			</div>) :
			(<div className='center_info'>
				<p className="text text_type_main-large">
					Детали ингредиента
				</p>
				<IngredientDetails />
			</div>)}
  	</>
  );
}

export default IngredientPage;
