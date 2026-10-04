"use client"

import * as React from "react"

interface UseCyclePhaseOptions {
  active: boolean
  cycleMsBase: number
  speed?: number
}

interface UseSteppedCycleOptions {
  active: boolean
  cycleMsBase: number
  steps: number
  speed?: number
  idleStep?: number
}

type FrameListener = (now: number) => void

export function useCyclePhase({ active, cycleMsBase, speed = 1 }: UseCyclePhaseOptions): number {
  const [phase, setPhase] = React.useState(0)

  React.useEffect(() => {
    if (!active) {
      setPhase(0)
      return
    }

    const safeSpeed = speed > 0 ? speed : 1
    const raw = cycleMsBase / safeSpeed
    const cycleMs = raw > 0 && Number.isFinite(raw) ? raw : 1000
    const start = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const elapsed = (((now - start) % cycleMs) + cycleMs) % cycleMs
      setPhase(elapsed / cycleMs)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [active, cycleMsBase, speed])

  return phase
}

const listeners = new Set<FrameListener>()
let rafId: number | null = null

function emit(now: number) {
  listeners.forEach((listener) => {
    listener(now)
  })
}

function tick(now: number) {
  emit(now)
  if (listeners.size > 0) {
    rafId = window.requestAnimationFrame(tick)
  } else {
    rafId = null
  }
}

function subscribeFrame(listener: FrameListener) {
  listeners.add(listener)
  if (rafId === null) {
    rafId = window.requestAnimationFrame(tick)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}

export function useSteppedCycle({
  active,
  cycleMsBase,
  steps,
  speed = 1,
  idleStep = 0,
}: UseSteppedCycleOptions): number {
  const safeSteps = Math.max(1, Math.floor(steps))
  const safeSpeed = speed > 0 ? speed : 1
  const rawCycleMs = cycleMsBase / safeSpeed
  const rawStepMs = rawCycleMs / safeSteps
  const stepMs = rawStepMs > 0 && Number.isFinite(rawStepMs) ? rawStepMs : 1
  const cycleMs = stepMs * safeSteps

  const [step, setStep] = React.useState(() => (active ? 0 : idleStep))
  const startMsRef = React.useRef<number>(0)
  const activeRef = React.useRef(false)
  const currentStepRef = React.useRef(idleStep)

  React.useEffect(() => {
    if (!active) {
      activeRef.current = false
      currentStepRef.current = idleStep
      setStep(idleStep)
      return
    }

    const updateStep = (now: number) => {
      if (!activeRef.current) {
        startMsRef.current = now
        activeRef.current = true
      }

      const elapsed = Math.max(0, now - startMsRef.current)
      const nextStep = Math.floor((elapsed % cycleMs) / stepMs) % safeSteps
      if (nextStep !== currentStepRef.current) {
        currentStepRef.current = nextStep
        setStep(nextStep)
      }
    }

    updateStep(performance.now())
    return subscribeFrame(updateStep)
  }, [active, cycleMs, idleStep, safeSteps, stepMs])

  return active ? step : idleStep
}
