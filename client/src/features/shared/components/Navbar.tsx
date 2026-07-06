import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 text-white">
      <h1 className="font-bold text-xl">YourBrand</h1>

      <div className="space-x-6 text-gray-300">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
