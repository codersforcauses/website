import { useState, useCallback } from 'react'

const Face = () => {
  const [face, setFace] = useState(':)')

  const toggleWinkOn = useCallback(() => setFace(';)'), [])
  const toggleWinkOff = useCallback(() => setFace(':)'), [])

  return (
    <h1
      className='display-1 my-0 d-flex align-items-center'
      onMouseEnter={toggleWinkOn}
      onMouseLeave={toggleWinkOff}
      data-cy='face'
    >
      {face}
    </h1>
  )
}

export default Face
