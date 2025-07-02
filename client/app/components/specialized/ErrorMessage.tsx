'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ErrorMessageProps } from '@/app/type/type';

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-base text-gray-700 mb-6 max-w-md">
        {message}
      </p>

      <div className="flex gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-green-600 
            text-white text-sm rounded hover:bg-green-700 transition"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </button>
        )}

        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
