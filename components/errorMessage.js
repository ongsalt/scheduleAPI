import React from 'react'
import { useAuth } from '../lib/clientContext'
import Icon from './icon'

import style from './errorMessage.module.css'

function ErrorMessage() {
  const { error, setShowError, showError } = useAuth()
  return (
    <div className={`${style.error} ${showError ? '' : style.gone}`}>
      <p>
        {error || 'No error'}
      </p>
      <div onClick={() => setShowError(false)}>
        <Icon id='close' size={18} />
      </div>
    </div>
  )
}

export default ErrorMessage