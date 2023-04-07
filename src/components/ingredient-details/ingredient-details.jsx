import PropTypes from 'prop-types';
import style from './ingredient-details.module.css';

function IngredientDetails({ calories, proteins, fat, carbohydrates, image, type, name }) {
    return(
        <div className={style.body}>

            <div className={style.image}>
                <img src={image} alt={type} />
            </div>
            <div className='mt-4'></div>
            <div className={style.title}>
                <p className="text text_type_main-medium">
                    {name}
                </p>
            </div>
            <div className='mt-8'></div>
            <div className={style.info}>
                <div className={style.info_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_main-medium text_color_inactive">
                        { calories }
                    </p>
                </div>
                <div className={style.info_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_main-medium text_color_inactive">
                        { proteins }
                    </p>
                </div>
                <div className={style.info_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-medium text_color_inactive">
                        { fat }
                    </p>
                </div>
                <div className={style.info_item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-medium text_color_inactive">
                        { carbohydrates }
                    </p>
                </div>
            </div>


        </div>
    )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
};