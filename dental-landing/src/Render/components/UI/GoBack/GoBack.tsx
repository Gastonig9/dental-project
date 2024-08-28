import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import { GoBackProps } from '../../../../types/props/goBack.props'

export const GoBack: React.FC<GoBackProps> = ({ path, titleGoBack }) => {
  return (
    <div className="flex items-center mb-6">
        <Link to={`/${path}`} className="mr-4 lg:mr-16">
          <button className="flex items-center bg-transparent poppins-medium">
            <ChevronLeftIcon
              className="h-5 w-5 flex-none text-black"
              aria-hidden="true"
            />
            {titleGoBack}
          </button>
        </Link>
      </div>
  )
}
