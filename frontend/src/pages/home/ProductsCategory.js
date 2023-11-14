import React from 'react'
import './ProductCategory.scss'
import { useNavigate } from 'react-router-dom';


const categories = [
  {
    id: 1,
    title: "Gadgets",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];



const IageTitlecategories = ({ title, images }) => {
  const navigate = useNavigate()
  return (
    <div className='category'>
      <h3>{title}</h3>
      <img src={images} alt="img" />
      <button className="--btn" onClick={() => navigate('/shop')}>
        {'shop Now'}
      </button>
    </div>
  )
}

const ProductsCategory = ({ title, images }) => {
  // const navigate = useNavigate()

  return (
    <div className='categories'>
      {categories.map(cat =>(
        <div key={cat.id} className='--flex-center'>
          <IageTitlecategories title={cat.title} images={cat.image} />
        </div>
      ))}
    </div>
  )
}

export default ProductsCategory