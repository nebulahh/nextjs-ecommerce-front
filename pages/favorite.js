import { CartContext } from '@/Context/CartContext'
import Footer from '@/components/Footer'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

function Favorite() {
  const { favoriteProducts, removeFavoriteProduct } = useContext(CartContext)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (favoriteProducts.length > 0) {
      axios
        .post('/api/favorite', { ids: favoriteProducts })
        .then((response) => {
          setFavorites(response.data)
        })
    } else {
      setFavorites([])
    }
  }, [favoriteProducts])

  return (
    <>
      <main>
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Favorite Items
          </h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {!favoriteProducts?.length && <div>You have not added favorites</div>}
              {favorites?.length > 0 &&
                favorites.map((product, i) => (
                  <div
                    key={i}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={product.images ? product.images[0] : ''}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.title}
                        </h2>
                      </div>
                      <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center space-x-4">
                          <svg
                            onClick={() => removeFavoriteProduct(product._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      {favoriteProducts.length <= 1 ? (
        <Footer emptyCart={true} />
      ) : (
        <Footer emptyCart={false} />
      )}
    </>
  )
}
export default Favorite
