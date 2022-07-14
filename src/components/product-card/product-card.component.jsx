import { useSelector } from 'react-redux/es/hooks/useSelector';
import './product-card.styles.scss';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addItemToCartContext } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)

    const addItemToCart = () => {
        dispatch(addItemToCartContext(cartItems, product))
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}$</span>
            </div>
            <Button buttonType='inverted' onClick={addItemToCart}>Add to card</Button>
        </div>
    );
};

export default ProductCard;