import { useMediaQuery } from '@mui/material'

interface ScreenSize {
  xl: boolean
  lg: boolean
  md: boolean
  sm: boolean
  xs: boolean
}

export default function useScreenSize() {
  const isXs = useMediaQuery('(max-width: 599.95px)')
  const isSm = useMediaQuery('(min-width: 600px) and (max-width: 959.95px)')
  const isMd = useMediaQuery('(min-width: 960px) and (max-width: 1279.95px)')
  const isLg = useMediaQuery('(min-width: 1280px) and (max-width: 1919.95px)')
  const isXl = useMediaQuery('(min-width: 1920px)')

  const sizes: ScreenSize = {
    xl: isXl,
    lg: isLg,
    md: isMd,
    sm: isSm,
    xs: isXs
  }

  return sizes
}
