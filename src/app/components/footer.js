import React from 'react'

const footer = () => {
  return (
    <footer className='w-full' style={{ flex: '1 1 45%', minWidth: '250px', marginRight: '2rem', backgroundColor: 'black' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <p style={{ textAlign: "left"}}>Contact info:</p>
          <p style={{ textAlign: "left" }}>
            lindsayings78@gmail.com <br />
          </p>
        </div>

        
      </div>
  </footer>
  )
}

export default footer