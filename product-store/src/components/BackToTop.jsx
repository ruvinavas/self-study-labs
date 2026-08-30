import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPositions'

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  if (scrollY<400){
    return null
  }


  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800"
    >
      <ArrowUp size={20} />
    </button>
  )
}