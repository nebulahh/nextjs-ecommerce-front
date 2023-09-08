const { createContext, useState, useEffect } = require('react')

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const checkLS = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])
  const [favoriteProducts, setFavoriteProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      checkLS?.setItem('cart', JSON.stringify(cartProducts))
    }

    if (favoriteProducts?.length > 0) {
      checkLS?.setItem('favorite', JSON.stringify(favoriteProducts))
    }
  }, [cartProducts, favoriteProducts])

  useEffect(() => {
    if (checkLS && checkLS.getItem('cart')) {
      setCartProducts(JSON.parse(checkLS.getItem('cart')))
    }

    if (checkLS && checkLS.getItem('favorite')) {
      setFavoriteProducts(JSON.parse(checkLS.getItem('favorite')))
    }
  }, [])

  function addToCart(productId) {
    setCartProducts((prev) => [...prev, productId])
  }

  function addToFavorite(productId) {
    setFavoriteProducts((prev) => [...prev, productId])
  }

  function removeCartProductCount(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }

  function removeCartProduct(productId) {
    setCartProducts((prev) => {
      return prev.filter((value) => value !== productId)
    })
  }

  function removeFavoriteProduct(productId) {
    setFavoriteProducts((prev) => {
      return prev.filter((value) => value !== productId)
    })
  }

  function clearCart() {
    setCartProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        favoriteProducts,
        addToCart,
        addToFavorite,
        removeFavoriteProduct,
        removeCartProduct,
        removeCartProductCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
