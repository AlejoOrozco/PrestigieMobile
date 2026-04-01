import { useMemo } from 'react'
import { useDevice } from '../../hooks/useDevice'
import { DesktopVideoEngine } from '../engine/DesktopVideoEngine'
import { MobileVideoEngine } from '../engine/MobileVideoEngine'
import type { VideoEngine } from '../engine/VideoEngine'

export function useVideoEngine(): VideoEngine {
  const { isDesktop } = useDevice()

  return useMemo(() => {
    return isDesktop ? new DesktopVideoEngine() : new MobileVideoEngine()
  }, [isDesktop])
}

