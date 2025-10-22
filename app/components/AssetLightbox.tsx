"use client"

import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

interface AssetLightboxProps {
  isOpen: boolean
  onClose: () => void
  assets: string[]
  currentIndex: number
  onNavigate: (index: number) => void
  fileType?: 'auto' | 'image' | 'svg' | 'pdf' | 'video'
}

export function AssetLightbox({
  isOpen,
  onClose,
  assets,
  currentIndex,
  onNavigate,
  fileType = 'auto'
}: AssetLightboxProps) {
  const currentAsset = assets[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < assets.length - 1

  const detectFileType = (url: string): 'image' | 'svg' | 'pdf' | 'video' => {
    if (!url) return 'image'
    
    const ext = url.toLowerCase().split('.').pop()?.split('?')[0] || ''
    
    if (['svg'].includes(ext)) return 'svg'
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image'
    if (['pdf'].includes(ext)) return 'pdf'
    if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video'
    
    return 'image'
  }

  const type = fileType === 'auto' ? detectFileType(currentAsset) : fileType

  const handlePrev = () => {
    if (canGoPrev) onNavigate(currentIndex - 1)
  }

  const handleNext = () => {
    if (canGoNext) onNavigate(currentIndex + 1)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, assets.length])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
      onClick={onClose}
      
      data-testid="lightbox-backdrop"
    >
      <div 
        className="relative w-full h-full flex items-center justify-center p-8 bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-[70]"
          onClick={onClose}
          data-testid="button-close-lightbox"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation arrows */}
        {canGoPrev && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-[70]"
            onClick={handlePrev}
            data-testid="button-prev-asset"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {canGoNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-[70]"
            onClick={handleNext}
            data-testid="button-next-asset"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Asset display */}
        <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center z-[65]">
          {(type === 'image' || type === 'svg') && (
            <img
              src={currentAsset}
              alt={`Asset ${currentIndex + 1} of ${assets.length}`}
              className="w-[80vw] h-[80vh] object-contain"
              data-testid="lightbox-image"
            />
          )}

          {type === 'pdf' && (
            <iframe
              src={currentAsset}
              className="w-[90vw] h-[90vh] bg-white"
              title={`PDF ${currentIndex + 1} of ${assets.length}`}
              data-testid="lightbox-pdf"
            />
          )}

          {type === 'video' && (
            <video
              src={currentAsset}
              controls
              className="max-w-full max-h-full"
              data-testid="lightbox-video"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded z-[70]">
          {currentIndex + 1} / {assets.length}
        </div>
      </div>
    </div>
  )
}
