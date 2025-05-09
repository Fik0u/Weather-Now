import React from 'react'

const Error = ({ message }) => {
  return (
    <div style={{ color: 'red', marginTop: '1rem' }}>
      ⚠️ {message}
    </div>
  )
}

export default Error
