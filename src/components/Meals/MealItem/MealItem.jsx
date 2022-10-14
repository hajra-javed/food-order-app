import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import MealItemform from '../MealItemForm/MealItemForm';
import classes from './MealItem.module.css'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    function submitHandler(amount){
        cartCtx.addItem({...props.meal, amount: amount});
    }
    return (
        <li>
            <div className={classes.meal}>
                <div>
                    <h3>{props.meal.name}</h3>
                    <div className={classes.description}>{props.meal.description}</div>
                    <div className={classes.price}>${props.meal.price}</div>
                </div>
                <MealItemform id = {props.meal.id} onSubmit={submitHandler}/>
            </div>
        </li>
    )
}

export default MealItem;