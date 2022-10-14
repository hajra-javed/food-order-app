import classes from './MealItemForm.module.css'
import Input from '../../UI/Input/Input'
import { useRef } from 'react'

const MealItemform = (props) => {

    const amountInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        props.onSubmit(+enteredAmount);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    defaultValue: '1'
                }} />
            <button type='submit'>+ Add</button>
        </form>
    )
}

export default MealItemform;