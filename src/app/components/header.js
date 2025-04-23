import Link from 'next/link'
import React from 'react'

const Header = () => {
	return (
		<header className="flex space-x-6">
			<nav>
				<Link href="/">Home</Link>
			</nav>
		</header>
    
	)
}
export default Header