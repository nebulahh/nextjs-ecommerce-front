import Link from 'next/link'

function HeaderNav() {
  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="navbar__link relative" href="#">
            CATEGORIES
          </Link>
          <Link className="navbar__link relative" href="#">
            HOT OFFERS
          </Link>
        </div>
      </div>
    </div>
  )
}
export default HeaderNav
