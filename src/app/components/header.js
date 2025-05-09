'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";


//https://stackoverflow.com/questions/67806445/dropdown-menu-next-js-tailwind-css
//reference link of where i got drop down
const Header = () => {

	const [isOpen, setIsOpen] = useState(false);

    let menuRef = useRef();
    useEffect(() =>{
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
            setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
    })

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

	return (
		<header /*style={{ backgroundColor: '#d0d0d0' }}*/ >
			<nav className='lg:text-3xl'>
                <div style={{ display: 'block', margin: 'auto', maxWidth: 'max-content' }}>
                  <Image
                    src="/logo.png"
                    width={70}
                    height={70}
                    alt="Logo"
                />  
                </div>
                
                {/* links to home page*/}
				<Link href="/" className='p-5'>Home</Link>

				 <div className="relative inline-block p-5 " style={{ fontSize: '1rem' }} ref={menuRef}>
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg lg:text-2xl inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Inventory 
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {/* opens dropdown*/}
                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>

                                {/* links to regular inventory page*/}
								<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown} >Regular Inventory</Link>
                            </li>

                            <li>
                                {/* links to seasonal inventory page*/}
								<Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>Seasonal Inventory</Link>
                            </li>
                            <li>
                                {/* links to all inventory page*/}
							<Link href="/baked-goods" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>All Inventory</Link>
                            </li>
                        </ul>
                    </div>
                )}
                </div>

                {/* links to contact page*/}
                <Link href="/contact" className='p-5'>Contact</Link>

                {/* links to checkout page*/}
				<Link href="/checkout" className='p-5'>Checkout</Link>

			</nav>
		</header>
    
	)
}
export default Header