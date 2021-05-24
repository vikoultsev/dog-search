import React, { useEffect, useState } from 'react'
import block from 'bem-cn-lite'

import './Pagination.scss'
const b = block('Pagination')

function Pagination(props) {
  const {
    totalRecords,
    pageIndex,
    itemsPerPage,
    onPageChange,
  } = props;
  const [pagination, setPagination] = useState([]);

  const makePagination = () => {
    const length = Math.ceil(totalRecords / itemsPerPage);
    const arr = new Array(length);
    const newPagination = arr
      .fill({})
      .map((item, index) => ({
        text: index + 1,
        onClick: onPageChange(index),
      }));

    setPagination(newPagination);
  }

  useEffect(() => {
    makePagination()
  }, [totalRecords, itemsPerPage])

  const renderButton = (page, index) => (
    <div key={page.text} className={b('item')}>
      <button data-testid='button-item' disabled={pageIndex === index} className={b('button', { disabled: pageIndex === index })} type='button' onClick={page.onClick}>
        {page.text}
      </button>
    </div>
  )

  return (
    <div className={b()}>
      {pagination.map(renderButton)}
    </div>
    
  )
}

export default Pagination;
