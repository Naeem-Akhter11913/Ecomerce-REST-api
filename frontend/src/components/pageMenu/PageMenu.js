import React from 'react'
import './pageMenu.scss'
import { NavLink } from 'react-router-dom'
const PageMenu = () => {
  return (
    <div>
        <div className="--bg-primary --p --mb">
            <ul className='home-links'>
                <li>
                    <NavLink to='/profile'>Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/wallet'>My Wallet</NavLink>
                </li>
                <li>
                    <NavLink to='/wishlist'>WishList</NavLink>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default PageMenu