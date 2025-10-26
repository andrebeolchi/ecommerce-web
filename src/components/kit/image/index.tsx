'use client'

import React, { useState } from 'react'

export const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, children, ...props }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <div className={props.className}>{children}</div>
  }

  return <img src={src} alt={alt} {...props} onError={() => setHasError(true)} />
}
