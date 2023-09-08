import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import { Order } from '@/models/Order'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request')
    return
  }
  const { name, email, address, cartProducts } = req.body
  await mongooseConnect()
  const productsIds = cartProducts
  const uniqueIds = [...new Set(productsIds)]
  const productsInfos = await Product.find({ _id: uniqueIds })

  let items = []
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (product) => product._id.toString() === productId
    )
    const quantity = productsIds.filter((id) => id === productId)?.length || 0
    if (quantity > 0 && productInfo) {
      items.push({
        quantity,
        price_data: {
          currency: 'USD',
	  seller: productInfo?.seller,
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      })
    }
  }

  const orderDoc = await Order.create({
    items,
    name,
    email,
    address,
    paid: false,
  })

  const url = process.env.PUBLIC_URL + '/cart?success=1'

  if (orderDoc) {
    res.json({ url })
  } else {
    res.json('error')
  }
}
