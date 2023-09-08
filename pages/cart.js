import { CartContext } from '@/Context/CartContext'
import Footer from '@/components/Footer'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

function Cart() {
  const {
    cartProducts,
    addToCart,
    removeCartProduct,
    removeCartProductCount,
    clearCart,
  } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data)
      })
    } else {
      setProducts([])
    }
  }, [cartProducts])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      clearCart()
    }
  }, [])

  function removeFromCart(productId) {
    removeCartProduct(productId)
  }

  function moreOfThisProduct(id) {
    addToCart(id)
  }
  function lessOfThisProduct(id) {
    removeCartProductCount(id)
  }

  let total = 0
  const shipping = 4.99
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0
    total += price
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,
      email,
      address,
    })
    if (response.data.url) {
      window.location = response.data.url
    }
  }

  if (isSuccess) {
    return (
      <>
        <main>
          <div className="bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-5xl font-bold">Success</h1>
            <div className="mx-auto max-w-5xl justify-center flex-col px-6 md:flex text-center xl:px-0">
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </div>
          </div>
        </main>
        <Footer emptyCart={true} />
      </>
    )
  }
  return (
    <>
      <main>
        <div className="bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {products?.length > 0 &&
                products.map((product, i) => (
                  <div
                    key={i}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={product.images[0] || '/no_Image.png'}
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
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => lessOfThisProduct(product._id)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {' '}
                            -{' '}
                          </span>
                          {/* <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                          min="1"
                        /> */}
                          <span className="h-8 w-8 border flex items-center justify-center bg-white text-center text-xs outline-none">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </span>
                          <span
                            onClick={() => moreOfThisProduct(product._id)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {' '}
                            +{' '}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            ${' '}
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                          </p>
                          <svg
                            onClick={() => removeFromCart(product._id)}
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

            {!!products?.length && (
              <div className="flex flex-col">
                  <fieldset className="mb-5 lg:mb-8">
                    <legend className="mb-3 text-contrast-higher text-lg">
                      Order information
                    </legend>

                    <div className="grid grid-cols-12 gap-3 lg:gap-5">
                      <div className="col-span-12">
                        <label
                          className="inline-block text-sm mb-1.5 lg:mb-2"
                          htmlFor="input-name"
                        >
                          Name{' '}
                        </label>
                        <input
                          className="appearance-none bg-white border border-gray-300 py-2 px-3 rounded-md text-[1em] leading-tight transition duration-200 outline-none placeholder:opacity-100 placeholder:text-gray-400 focus-within:border-indigo-700 w-full"
                          type="text"
                          name="name"
                          id="input-name"
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />{' '}
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 lg:gap-5">
                      <div className="col-span-12">
                        <label
                          className="inline-block text-sm mb-1.5 lg:mb-2"
                          htmlFor="input-name"
                        >
                          Email
                        </label>
                        <input
                          className="appearance-none bg-white border border-gray-300 py-2 px-3 rounded-md text-[1em] leading-tight transition duration-200 outline-none placeholder:opacity-100 placeholder:text-gray-400 focus-within:border-indigo-700 w-full"
                          type="email"
                          name="email"
                          id="input-email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />{' '}
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 lg:gap-5">
                      <div className="col-span-12">
                        <label
                          className="inline-block text-sm mb-1.5 lg:mb-2"
                          htmlFor="input-address"
                        >
                          Address
                        </label>
                        <input
                          className="appearance-none bg-white border border-gray-300 py-2 px-3 rounded-md text-[1em] leading-tight transition duration-200 outline-none placeholder:opacity-100 placeholder:text-gray-400 focus-within:border-indigo-700 w-full"
                          type="address"
                          name="address"
                          id="input-address"
                          required
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="products"
                      value={cartProducts.join(',')}
                    />
                  </fieldset>

                  <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
                    <div className="mb-2 flex justify-between">
                      <p className="text-gray-700">Subtotal</p>
                      <p className="text-gray-700">${total}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-700">Shipping</p>
                      <p className="text-gray-700">${shipping}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                      <p className="text-lg font-bold">Total</p>
                      <div className="">
                        <p className="mb-1 text-lg font-bold">
                          ${total + shipping} USD
                        </p>
                        <p className="text-sm text-gray-700">including VAT</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={goToPayment}
                      className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    >
                      Check out
                    </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {cartProducts.length <= 1 ? (
        <Footer emptyCart={true} />
      ) : (
        <Footer emptyCart={false} />
      )}
    </>
  )
}
export default Cart
