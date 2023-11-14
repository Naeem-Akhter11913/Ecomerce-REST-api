import React from 'react'
import './Carousel.scss'
import { Link } from 'react-router-dom'
import { sortName } from '../../utils'


const CarouselItem = ({ url, name, price, desc }) => {
    return (
        <div className='carouselItem'>
            <Link to='/product-details'>
                <img className='product--image' src={url} alt="product" />
                <p className="price">{price}</p>
                <h4>{sortName(name,18)}</h4>
                <div className="mb">{sortName(desc,26)}</div>
            </Link>
            <button className="--btn --btn-primary --btn-block">Add To Cart</button>
        </div>
    )
}

export default CarouselItem