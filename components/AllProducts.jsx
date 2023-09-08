import Link from 'next/link'
import { productsData } from '@/lib/data'
import AProduct from './AProduct'
import Footer from './Footer'

function AllProducts({ newProduct }) {
  return (
    <div>
      <div className="container">
        <h2 className="font-medium text-2xl pb-4">Products</h2>

        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {newProduct?.length > 0 &&
            newProduct.map((item, index) => (
              <AProduct
                key={index}
                img={item?.images}
                id={item._id}
                title={item.title}
                desc={item?.description}
                rating={item?.rating}
                price={item.price}
              />
            ))}
        </div>
      </div>
      <Footer emptyCart={false} />
    </div>
  )
}
export default AllProducts
