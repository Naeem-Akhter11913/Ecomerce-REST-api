import React from 'react'
import Slider from '../../components/slider/Slider'
import HomeInfoBox from './HomeInfoBox'
import { productData } from '../../components/carousel/data'
import CarouselItem from '../../components/carousel/CarouselItem'
import ProductCarousel from '../../components/carousel/Carousel'
import ProductsCategory from './ProductsCategory'
import FooterLink from '../../components/footer/FooterLink'


const Home = () => {
  // url, name, price, desc
  const productss = productData.map((item) =>(
    <div key={item.id}>
      <CarouselItem url={item.imageurl} name={item.name} price={item.price} desc={item.description} />
    </div>
  ))


  const PageHeading = ({heading,btnTxt}) => {
    return(
      <>
        <div className="--flex-between">
          <h2 className="--fw-thin">{heading}</h2>
          <button className='--btn'>
            {btnTxt}
          </button>
        </div>
        <div className="--hr"></div>
      </>
    )
  }


  return (
    <div>
      <Slider />
      <section className='container'>
        <HomeInfoBox />
        <PageHeading heading={'Latest Products'} btnTxt={'Shop Now >>>>'} />
        <ProductCarousel products ={productss} />
      </section>

      <section className="--bg-grey">
        <div className="container">
          <h2 className='--fw-thin'>Categories</h2>
          <ProductsCategory />
        </div>
      </section>

      <section className='container'>
        <PageHeading heading={'Mobaile Phones'} btnTxt={'Shop Now >>>>'} />
        <ProductCarousel products ={productss} />
      </section>
      <FooterLink />
    </div>
  )
}

export default Home