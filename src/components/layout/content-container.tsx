import React from 'react'

type ContentContainerProps = {
  children: React.ReactNode
  className?: string
}

const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

export default ContentContainer
