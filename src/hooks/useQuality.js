import { useMemo } from 'react'

/**
 * Detects what the device can handle so the 3D scenes degrade gracefully:
 * - no WebGL  -> static fallbacks are rendered instead of canvases
 * - mobile    -> lower pixel ratio, lighter scene (no contact shadows)
 * - reduced motion -> auto-rotation and floating animations are disabled
 */
export function useQuality() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return { webgl: false, mobile: false, reducedMotion: false, dpr: 1 }
    }

    let webgl = false
    try {
      const canvas = document.createElement('canvas')
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      webgl = false
    }

    const mobile =
      window.matchMedia('(max-width: 768px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return {
      webgl,
      mobile,
      reducedMotion,
      dpr: [1, mobile ? 1.5 : 2],
    }
  }, [])
}
