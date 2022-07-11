import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to="/shop" >
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <span className='nav-link' as="span" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <NavLink to='/auth' >
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon></CartIcon>
                </NavLinks>
                {
                    isCartOpen && <CartDropdown></CartDropdown>
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation