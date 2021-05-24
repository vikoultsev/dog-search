import React, { Fragment, useState } from 'react'
import block from 'bem-cn-lite'

import Breed from '../Breed'

import './ResultTable.scss'
const b = block('ResultTable')

function ResultTable(props) {
  const {
    breedList,
    measuringKey,
  } = props;

  const renderBreed = breed => (
    <div key={breed.id} className={b('item')}>
      <Breed data={breed} measuringKey={measuringKey} />
    </div>
  )

  return (
    <div data-testid='result-table' className={b()}>
      {breedList.map(renderBreed)}
    </div>
    
  )
}

export default ResultTable;
