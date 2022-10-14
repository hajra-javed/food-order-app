import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    lastIndex: 0
}

function cartReducer(prevState, action) {
    let otherItems;
    switch (action.type) {
        case 'ADD':
            const prevItem = prevState.items.filter((item)=>item.id === action.item.id);
            otherItems = prevState.items.filter((item) => item.id !== action.item.id)
            return {
                items: prevItem.length === 1 ? 
                [...otherItems, {...action.item, amount: action.item.amount + prevItem[0].amount}] :
                [...prevState.items, {...action.item, index: prevState.lastIndex+1}],
                totalAmount: prevState.totalAmount + (action.item.price * action.item.amount),
                lastIndex: prevItem.length === 0 && prevState.lastIndex + 1
            }
        case 'REMOVE':
            const item = prevState.items.find((item) => item.id === action.id);
            otherItems = prevState.items.filter((item) => item.id !== action.id);
            return {
                items: (+item.amount === 1) ? 
                otherItems :
                [...otherItems, {...item, amount: item.amount - 1}] ,
                totalAmount: prevState.totalAmount - item.price
            }
    }
    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    function addItemHandler(item) {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    function removeItemHandler(id) {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;