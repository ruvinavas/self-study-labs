import { useState } from 'react'
import Modal from './components/Modal'

function App() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="font-display text-4xl font-bold">
        Product Store
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 rounded-lg bg-teal-700 px-5 py-3 text-white hover:bg-teal-800"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
      >
        <p className="text-slate-700">
          This is my reusable modal component.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-5 rounded-lg bg-teal-700 px-4 py-2 text-white"
        >
          Close
        </button>
      </Modal>

    </div>
  )
}

export default App