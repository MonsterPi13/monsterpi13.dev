import { useEffect } from 'react'

export function useKeyPress(callback: (e: KeyboardEvent) => void, keyCodes: string[]) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (keyCodes.includes(event.code)) {
        callback(event)
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [callback, keyCodes])
}
