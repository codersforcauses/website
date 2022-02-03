import { useState, useCallback, memo } from 'react'

const Face = () => {
  const [face, setFace] = useState(':)')

  const toggleWinkOn = useCallback(() => setFace(';)'), [])
  const toggleWinkOff = useCallback(() => setFace(':)'), [])

  return (
    <h1
      className='font-mono select-none text-9xl'
      onMouseEnter={toggleWinkOn}
      onMouseLeave={toggleWinkOff}
      data-cy='face'
    >
      {face}
    </h1>
  )
}

export default memo(Face)
