import React from 'react';
import { connect } from 'react-redux';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Button from '../ui/Button';

import { 
  removeFromBasket, 
  clearBasket, 
  addQtyItem,
  minusQtyItem
} from '../../actions/basketActions';
import { displayMoney } from '../../helpers/utils';

const Basket = ({ basket, action }) => {
  const calculateTotal = () => {
    let total = 0;

    if (basket.length !== 0) {
      const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
      total = result.toFixed(2);
    }

    return displayMoney(total);
  };

  return (
    <div className="basket">
      <div className="basket-list">
        <div className="basket-header">
          <h3 className="basket-header-title">
            My Basket &nbsp; 
            <span>({` ${basket.length} ${basket.length > 1 ? 'items' : 'item'}`})</span>
          </h3>
          <BasketToggle>
            {({ onClickToggle }) => (
              <span 
                  className="basket-toggle button button-border button-border-gray button-small" 
                  onClick={onClickToggle}
              >
                Close
              </span>
            )}
          </BasketToggle>
          <Button
              className="basket-clear button button-border button-border-gray button-small"
              onClick={action.clearBasket}
          >
            <span>Clear Basket</span>
          </Button>
        </div>
        {basket.length <= 0 && (
          <div className="basket-empty">
            <h5 className="basket-empty-msg">Your basket is empty</h5>
          </div> 
        )}
        {basket.map(product => (
          <BasketItem 
              key={product.id}
              product={product}
              basket={basket}
              action={action}
              removeFrombasket={action.removeFromBasket}
          />
        ))}
      </div>
      <div className="basket-checkout">
        <div className="basket-total">
          <p className="basket-total-title">Total Amout:</p>
          <h2 className="basket-total-amount">{calculateTotal()}</h2>
        </div>
        <Button 
            className="basket-checkout-button button"
        >
          Check Out
        </Button>
      </div>
      
    </div>
  );
};

const mapStateToProps = ({ basket }) => ({
  basket
});

const mapDispatchToProps = dispatch => ({
  action: {
    removeFromBasket: id => dispatch(removeFromBasket(id)),
    clearBasket: () => dispatch(clearBasket()),
    addQtyItem: id => dispatch(addQtyItem(id)),
    minusQtyItem: id => dispatch(minusQtyItem(id))
  }
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
