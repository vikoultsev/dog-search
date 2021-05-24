import React from 'react'
import block from 'bem-cn-lite'

import './NoRecords.scss'
const b = block('NoRecords')

function NoRecords() {

  return (
    <div className={b()} data-testid='no-records'>
      <h4 className={b('text')}>
        No records found matching your search query.
      </h4>
    </div>
    
  )
}

export default NoRecords;
