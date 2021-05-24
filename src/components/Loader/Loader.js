import React from 'react'
import block from 'bem-cn-lite'
import Spinner from 'react-loader-spinner'

import './Loader.scss'
const b = block('Loader')

function Loader() {

  return (
    <div className={b()} data-testid='loader'>
      <Spinner
        type='Rings'
        color='#4a90e2'
        height={100}
        width={100}
        timeout={10000}
      />
    </div>
  )
}

export default Loader;
