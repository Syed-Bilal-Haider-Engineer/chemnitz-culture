import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h6 className="text-lg font-light text-gray-900 mb-2">404</h6>
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        The page you are looking for doesn't exist.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to home
      </Link>
    </div>
  )
}