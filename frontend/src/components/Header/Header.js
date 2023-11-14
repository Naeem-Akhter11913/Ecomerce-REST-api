import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
// import Cookies from 'js-cookie';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/feature/auth/authSlice';
import ShowOnLoin, { ShowOnLoOut } from '../hiddenLink/hiddenLink';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material'


export const logo = (
  <div className='logo'>
    <Link to='/'>
      <h2>
        Shop<span>Ito</span>
      </h2>
    </Link>
  </div>
)


const activeLink = ({ isActive }) => (
  isActive ? 'active' : ''
)


const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrollPage, setScrollPage] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth)



  const fixNavBar = () => {
    if (window.scrollY > 80) {
      setScrollPage(true)
    } else {
      setScrollPage(false)
    }
    // setScrollPage(false)
  }

  window.addEventListener('scroll', fixNavBar);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideleMenu = () => {
    setShowMenu(false)
  }

  // logout user
  const logoutUser = async () => {
    await dispatch(logout())
    await dispatch(RESET_AUTH())
    navigate('/login')
  }


  const cart = (
    <span className='cart'>
      <Link to='/cart'>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  )



  return (

    <header className={scrollPage ? 'fixed' : ''}>
      <div className='header'>
        <ShowOnLoOut>
          <div className='logo'>
            <Link>
              <h2>
                Shop<span>Ito</span>
              </h2>
            </Link>
          </div>

        </ShowOnLoOut>
        <ShowOnLoin>
          {logo}
        </ShowOnLoin>
        <nav className={showMenu ? 'show-nav' : "hide-nav"}>

          <div className={showMenu ? "nav-wrapper show-nav-wrapper" : "nav-wrapper"} onClick={hideleMenu}></div>

          <ul>
            <ShowOnLoin>
              <li className='logo-mobile'>
                {logo}
                <FaTimes size={22} color='#fff' onClick={hideleMenu} />
              </li>

              <li>
                <NavLink to='/shop' className={activeLink} >
                  Shop
                </NavLink>
              </li>
            </ShowOnLoin>
          </ul>
          <div className="header-right">
            <span className='links'>

              <ShowOnLoOut >
                <NavLink to='login' className={activeLink} >
                  Login
                </NavLink>
                <NavLink to='register' className={activeLink} >
                  Register
                </NavLink>
              </ShowOnLoOut>

              <ShowOnLoin>
                <NavLink to='profile' className={activeLink} >
                  <Stack>
                    <Avatar alt="Remy Sharp" src={user?.photo}  sx={{ width: 24, height: 24 }} />
                  </Stack>
                </NavLink>
                <NavLink to='order-history' className={activeLink} >
                  My Order
                </NavLink>
                <Link to='/' onClick={logoutUser} >
                  Logout
                </Link>
              </ShowOnLoin>

            </span>
            <ShowOnLoin>{cart}</ShowOnLoin>
            {/* {cart} */}
          </div>
        </nav>
        <div className='menu-icon'>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header