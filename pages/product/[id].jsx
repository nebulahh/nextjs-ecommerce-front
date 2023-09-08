import { useRouter } from 'next/router'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { productsData } from '@/lib/data'
import { useContext, useState } from 'react'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import { CartContext } from '@/Context/CartContext'
import Footer from '@/components/Footer'
import { User } from '@/models/User'

function ProductDetail({ product }) {
  const router = useRouter()
  const { addToCart, addToFavorite } = useContext(CartContext)

  function addProductToCart() {
    addToCart(product._id)
  }

  function addProductToFavorite() {
    addToFavorite(product._id)
  }

  console.log(product)

  const generateRating = (rating) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        )
      case 2:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        )
      case 3:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        )
      case 4:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
        )
      case 5:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        )

      default:
        return null
    }
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex lg:w-4/5 mx-auto R flex-wrap">
              <img
                alt={product?.title + ' image'}
                className="lg:w-1/2 w-full lg:h-auto border border-gray-600 h-64 object-cover object-center rounded"
                src={product?.images[0] || '/no_Image.png'}
              />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h3 className="text-sm title-font text-gray-500 tracking-widest">
                Seller:{' '}
                {product?.seller
                  ? product?.seller.fullName
                  : 'name was not provided'}
              </h3>
              <h1 className="text-gray-900 mt-4 text-3xl title-font font-medium mb-1">
                {product?.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <div>
                    {generateRating(
                      productsData[Number(router.query.id) - 1]?.rating
                    )}
                  </div>
                  <span className="text-gray-600 ml-3">
                    {/* {productsData[Number(router.query.id) - 1]?.rating} Reviews */}
                  </span>
                </span>
              </div>
              <small>Description: </small>
              <p className="leading-relaxed">{product?.description} </p>

              <div className="flex mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Price: ${product?.price}
                </span>

                <button
                  type="button"
                  onClick={addProductToCart}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to cart
                </button>

                <button
                  title="button"
                  onClick={addProductToFavorite}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default ProductDetail

export async function getServerSideProps(context) {
  await mongooseConnect()
  const { id } = context.query
  const product = await Product.findById(id).populate(
    'seller',
    'fullName',
    User
  )
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}
