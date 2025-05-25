import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className='w-full' style={{backgroundColor: 'black' }}>
        <div className='basis-full text-[white]'>
          <p style={{ textAlign: "center"}}>Contact info:</p>
          <p style={{ textAlign: "center" }}>
            lindsayings78@gmail.com
          </p>
          <Link href="/Privacy">Privacy Policy</Link>

      </div>
  </footer>
  )
}

export default footer