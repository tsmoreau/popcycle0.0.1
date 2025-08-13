'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from './button'
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react'

interface TourStep {
  id: string
  title: string
  content: string
  target: string // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
}

interface GuidedTourProps {
  isOpen: boolean
  onClose: () => void
  steps: TourStep[]
  tourTitle?: string
}

export function GuidedTour({ isOpen, onClose, steps, tourTitle = "Page Walkthrough" }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0)
      setHighlightedElement(null)
      return
    }

    const targetElement = document.querySelector(steps[currentStep]?.target) as HTMLElement
    if (targetElement) {
      setHighlightedElement(targetElement)
      
      // Scroll element into view
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      })
      
      // Position tooltip
      positionTooltip(targetElement)
    }
  }, [isOpen, currentStep, steps])

  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      if (highlightedElement) {
        positionTooltip(highlightedElement)
      }
    }

    const handleScroll = () => {
      if (highlightedElement) {
        positionTooltip(highlightedElement)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen, highlightedElement])

  const positionTooltip = (element: HTMLElement) => {
    if (!tooltipRef.current) return

    const rect = element.getBoundingClientRect()
    const tooltip = tooltipRef.current
    const step = steps[currentStep]
    
    // Reset positioning
    tooltip.style.top = ''
    tooltip.style.left = ''
    tooltip.style.right = ''
    tooltip.style.bottom = ''

    const offset = 20
    const arrowSize = 10

    switch (step.position) {
      case 'top':
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - offset}px`
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`
        break
      case 'bottom':
        tooltip.style.top = `${rect.bottom + offset}px`
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`
        break
      case 'left':
        tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`
        tooltip.style.left = `${rect.left - tooltip.offsetWidth - offset}px`
        break
      case 'right':
        tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`
        tooltip.style.left = `${rect.right + offset}px`
        break
    }

    // Ensure tooltip stays within viewport
    const tooltipRect = tooltip.getBoundingClientRect()
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`
    }
    if (tooltipRect.left < 0) {
      tooltip.style.left = '10px'
    }
    if (tooltipRect.bottom > window.innerHeight) {
      tooltip.style.top = `${window.innerHeight - tooltipRect.height - 10}px`
    }
    if (tooltipRect.top < 0) {
      tooltip.style.top = '10px'
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    onClose()
  }

  const getHighlightStyles = (): React.CSSProperties => {
    if (!highlightedElement) return {}
    
    const rect = highlightedElement.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    
    return {
      position: 'absolute',
      top: rect.top + scrollTop - 4,
      left: rect.left + scrollLeft - 4,
      width: rect.width + 8,
      height: rect.height + 8,
      border: '2px solid hsl(214, 100%, 50%)',
      borderRadius: '8px',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
      pointerEvents: 'none',
      zIndex: 9998
    }
  }

  if (!isOpen || steps.length === 0) return null

  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Highlight overlay */}
      {highlightedElement && (
        <div
          className="pointer-events-none transition-all duration-300 ease-in-out"
          style={getHighlightStyles()}
        />
      )}
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed bg-white rounded-lg shadow-xl border max-w-sm z-[9999] p-6"
        style={{ minWidth: '320px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-pop-blue" />
            <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button
                size="sm"
                onClick={handleClose}
                className="bg-pop-blue hover:bg-pop-blue/90 text-white"
              >
                Finish
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleNext}
                className="bg-pop-blue hover:bg-pop-blue/90 text-white flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center mt-4 gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-pop-blue'
                  : index < currentStep
                  ? 'bg-pop-green'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}