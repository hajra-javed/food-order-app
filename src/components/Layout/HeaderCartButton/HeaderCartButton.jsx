import { useContext, useEffect, useState } from 'react';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../../store/cart-context';

const HeaderCartButton = (props) => {

  const ctx = useContext(CartContext);

  const {items} = ctx;
  const [showBump, setShowBump] = useState(false);
  const btnClasses = `${classes.button} ${showBump && classes.bump}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setShowBump(true);

    const timer = setTimeout(() => {
      setShowBump(false);
    }, 300);

    return ()=>{
      clearTimeout(timer);
      console.log('cleanup');
    }
  },[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {ctx.items.reduce((curr, item) => (curr + item.amount), 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;