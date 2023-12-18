import React from "react";
import { useDispatch } from "react-redux";
import { countMinus, countPlus, funDelete } from "../../store/slices/cartSlice";

function CartItem({ title, id, price, count, discont_price }) {
  const dispatch = useDispatch();

  const allSum = price * count;

  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{count}</p>
        <p>{price}</p>
        <button onClick={() => dispatch(countMinus(id))}>-</button>
        <button onClick={() => dispatch(countPlus(id))}>+</button>
        <span onClick={() => dispatch(funDelete(id))}>X</span>
      </div>
    </div>
  );
}

export default CartItem;
