import classes from './Cart.module.css';
// import cartItems from '../../data/cartItems.json';
import Modal from '../UI/Modal/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function onAddHandler(item){
        cartCtx.addItem(item);
    }

    function onRemoveHandler(id){
        cartCtx.removeItem(id);
    }
    return (

        <Modal onClick={props.onClose}>
            <div>
                <ul className={classes['cart-items']}>
                    {cartCtx.items
                    .sort(function(a, b){return a.index - b.index})
                    .map((item) => (
                        <CartItem key={item.id} {...item} onAdd= {onAddHandler} onRemove={onRemoveHandler}/>
                    ))}
                </ul>
                <div className={classes.total}>
                    <span>Total amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                    {hasItems && <button className={classes.button}>Order</button>}
                </div>
            </div>
        </Modal>

    )
}

export default Cart;