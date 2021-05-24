import React, { Fragment, useState } from 'react'
import block from 'bem-cn-lite'

import Select from '../Select'

import { measuringKeys, sortingKeys, soringOrders, perPageOptions } from '../../helpers'

import './Toolbar.scss'
const b = block('Toolbar')

function Toolbar(props) {
  const {
    pageIndex,
    totalRecords,
    itemsPerPage,
    measuringKey,
    sortingKey,
    soringOrder,
    onItemsPerPageSelect,
    onMeasuringSelect,
    onSortingKeySelect,
    onSortingOrderSelect,
  } = props;


  return (
    <div className={b()}>
      <div className={b('container')}>
        <div className={b('info')}>
          <p className={b('text')}>Total records: {totalRecords}</p>
          {totalRecords > 0 && <p className={b('text')}>Search results: from {pageIndex * itemsPerPage + 1} to {Math.min(pageIndex * itemsPerPage + itemsPerPage, totalRecords)}</p>}
        </div>
        <div className={b('tools')}>
        <div className={b('tool')}>
            <p className={b('text')}>Items per page: </p>
            <div className={b('select')}>
              <Select
                testId='items-select'
                options={perPageOptions}
                value={itemsPerPage}
                onChange={onItemsPerPageSelect}
              />
            </div>
          </div>
          <div className={b('tool')}>
            <p className={b('text')}>Measuring: </p>
            <div className={b('select')}>
              <Select
                testId='measuring-select'
                options={measuringKeys}
                value={measuringKey}
                onChange={onMeasuringSelect}
              />
            </div>
          </div>
          <div className={b('tool')}>
            <p className={b('text')}>Sort By: </p>
            <div className={b('select')}>
              <Select
                testId='sort-select'
                options={sortingKeys}
                value={sortingKey}
                onChange={onSortingKeySelect}
              />
            </div>
          </div>
          <div className={b('tool')}>
            <p className={b('text')}>Order: </p>
            <div className={b('select')}>
              <Select
                testId='order-select'
                options={soringOrders}
                value={soringOrder}
                onChange={onSortingOrderSelect}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  )
}

export default Toolbar;
