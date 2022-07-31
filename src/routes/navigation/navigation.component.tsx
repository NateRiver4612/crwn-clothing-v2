import { Outlet, } from "react-router-dom"
import { useSelector } from "react-redux"
import { Fragment, } from "react"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutStart } from "../../store/user/user.action"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { selectCurrentUser } from "../../store/user/user.seletor"
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles';
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { useDispatch } from 'react-redux'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(signOutStart())
    }

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
                        <span className='nav-link' onClick={signOutHandler}>
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