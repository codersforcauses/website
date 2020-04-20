import { useState } from 'react'

const Face = () => {
  const [face, setFace] = useState(':)')

  return (
    <h1
      className='display-1 face flex-shrink-1'
      onMouseEnter={() => setFace(';)')}
      onMouseLeave={() => setFace(':)')}
    >
      {face}
    </h1>
  )
}

export default Face
