import { Product } from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'
import AllProducts from '@/components/AllProducts'
import Footer from '@/components/Footer'

export default function Home({ newProducts }) {
  console.log(newProducts)
  return (
    <main>
      <AllProducts newProduct={newProducts} />
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect()
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  })
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}
