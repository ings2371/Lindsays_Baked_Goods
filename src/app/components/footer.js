import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className='w-full items-center justify-items-center text-[white] align-bottom' style={{backgroundColor: 'black' }}>
      <div className='h-full p-5 pt-0 pb-0'>
        <div className='inline float-left'>
          <p style={{ textAlign: "center"}}>Contact info:</p>
          <p style={{ textAlign: "center" }}>
            lindsayings78@gmail.com
          </p>

      </div>
      <Link className='items-end inline p-5 pt-0 pb-0 underline' href="/Privacy">Privacy Policy</Link>
      </div>

  </footer>
  )
}

export default footer