import React from 'react'

function Separator({ height = 1, width = 80, color = `rgba(0,0,0,1` }) {
  return (
    <div className='separator'
      style={{
        height: `${height}px`,
        width: `${width}%`,
        backgroundColor: `${color}`,
        borderRadius:`${height}px`
      }}
    >.</div>
  )
}

export default Separator