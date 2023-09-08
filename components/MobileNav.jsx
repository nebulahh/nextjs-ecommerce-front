import { FiHeart } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { AiOutlineHome } from 'react-icons/ai'
import Link from 'next/link'
import { CartContext } from '../Context/CartContext'
import { useContext } from 'react'

function MobileNav() {
  const { cartProducts, favoriteProducts } = useContext(CartContext)

  return (
    <div className="lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] max-w-[500px] mob_navbar px-8">
      <div className="flex justify-between text-[28px] py-2">
        <div className="relative">
          <Link href={'/cart'}>
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartProducts.length}
            </div>
          </Link>
        </div>

        <Link href={'/'}>
          <AiOutlineHome />
        </Link>

        <div className="relative">
          <Link href={'/favorite'}>
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {favoriteProducts.length}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default MobileNav
