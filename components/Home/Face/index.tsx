import React, { useState } from 'react'

const Face = () => {
  const [face, setFace] = useState(':)')

  return (
    <h1
      className='display-1 my-0 d-flex align-items-center'
      onMouseEnter={() => setFace(';)')}
      onMouseLeave={() => setFace(':)')}
      data-cy='face'
    >
      {face}
    </h1>
  )
}

export default Face
