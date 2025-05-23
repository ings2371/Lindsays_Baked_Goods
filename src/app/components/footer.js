import React from 'react'

const footer = () => {
  return (
    <footer className='w-full' style={{ flex: '1 1 45%', backgroundColor: 'black' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <p style={{ textAlign: "left"}}>Contact info:</p>
          <p style={{color: "white", textAlign: "left" }}>
            lindsayings78@gmail.com
          </p>
        </div>

        
      </div>
  </footer>
  )
}

export default footer