const Footer = ({ emptyCart = false }) => {
  return (
    <footer
      className={`bg-blackish text-gray-500 text-center py-4 pb-16 md:pb-4 mt-8 ${emptyCart ? 'absolute w-full bottom-0 -z-10' : ''}`}
    >
      Copyright © Store <br /> All Rights Reserved 2023.
    </footer>
  )
}

export default Footer
