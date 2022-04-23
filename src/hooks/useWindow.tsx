import { useEffect, useState } from 'react'

const getWindowDimensions: () => [number, number] = () => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    return [width, height]
  }
  return [0, 0]
}

const useWindow: () => [number, number] = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindow
