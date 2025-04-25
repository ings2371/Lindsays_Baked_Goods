'use client'
import Link from 'next/link'
import React, { useState } from 'react'


//https://stackoverflow.com/questions/67806445/dropdown-menu-next-js-tailwind-css
//reference link of where i got drop down
const Header = () => {

	const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

	return (
		<header className="flex space-x-6">
			<nav>
				<Link href="/">Home</Link>

				 <div className="relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Inventory <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
								<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>Regular Inventory</Link>
                            </li>

                            <li>
								<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>Seasonal Inventory</Link>
                            </li>
                            <li>
							<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>All Inventory</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
				
				<Link href="/">Checkout</Link>

			</nav>
		</header>
    
	)
}
export default Header