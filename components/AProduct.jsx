import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { CartContext } from '../Context/CartContext'

function AProduct({ img, title, desc, rating, price, id }) {
  const { addToCart, favoriteProducts, addToFavorite } = useContext(CartContext)

  function addProductToCart() {
    addToCart(id)
  }

  function addProductToFavorite() {
    addToFavorite(id)
  }

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
    <div className="p-3 border border-gray-200 rounded-xl max-w-[400px]">
      <div className="max-h-[170px]">
        <Link href={`/product/${id}`}>
          <Image
            className="w-full h-auto "
            src={img[0] ? img[0] : '/no_Image.png'}
            width={100}
            height={100}
            alt={title}
          />
        </Link>
      </div>

      <div className="space-y-2 py-4 mt-4">
        <h2 className="text-accent font-medium uppercase">
          <Link href={`/product/${id}`}>{title}</Link>
        </h2>
       
        <div>{generateRating(rating)}</div>

        <div className="font-bold flex gap-4">
          ${price}
          <del className="text-gray-500 font-normal">
            ${parseInt(price) + 50}.00
          </del>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addProductToCart}
            className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
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
              className={`w-5 h-5 ${
                favoriteProducts.includes(id) ? 'text-red-950' : ''
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default AProduct
