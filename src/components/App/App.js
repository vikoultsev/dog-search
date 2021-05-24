import React, { useEffect, useState } from 'react';
import block from 'bem-cn-lite'

import SearchInput from '../SearchInput'
import ResultTable from '../ResultTable'
import NoRecords from '../NoRecords'
import Loader from '../Loader'
import Toolbar from '../Toolbar'
import Pagination from '../Pagination'

import { fetchSearchResults } from '../../api'
import { measuringKeys, sortingKeys, soringOrders, perPageOptions, LOADING_STATES } from '../../helpers'

import './App.scss'

const b = block('App')


function App() {
  const [breedList, setBreedList] = useState([]);
  const [breedListToDisplay, setBreedListToDisplay] = useState([]);
  const [measuringKey, setMeasuringKey] = useState(measuringKeys[0].value);
  const [sortingKey, setSortingKey] = useState(sortingKeys[0].value);
  const [sortingOrder, setSortingOrder] = useState(soringOrders[0].value);
  const [itemsPerPage, setItemsPerPage] = useState(perPageOptions[0].value);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);
  const totalRecords = breedList.length;


  const handleSearch = async (query) => {
    if (query) {
      setLoadingState(LOADING_STATES.LOADING);
      try {
        const breeds = await fetchSearchResults(query);
        sortBreeds(breeds, true);
        setLoadingState(breeds.length ? LOADING_STATES.SUCCESS : LOADING_STATES.NO_RECORDS);
      } catch (error) {
        setLoadingState(LOADING_STATES.ERROR);
      }
    } else {
      setLoadingState(LOADING_STATES.IDLE);
    }
  };

  const handleMeasuringSelect = e => {
    setMeasuringKey(e.target.value);
  }

  const handleSortingKeySelect = e => {
    setSortingKey(e.target.value);
    setPageIndex(0);
  }

  const handleSortingOrderSelect = e => {
    setSortingOrder(e.target.value);
    setPageIndex(0);
  }

  const handleItemsPerPageSelect = e => {
    setItemsPerPage(e.target.value);
    setPageIndex(0);
  }

  const handlePageChange = index => () => {
    setPageIndex(index);
  }

  const handleSetVisibleBreeds = () => {
    setBreedListToDisplay(breedList.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage))
  }

  const sortBreeds = (list, resetPagination) => {
    const { sort } = sortingKeys.find(({ value }) => value === sortingKey);
    if (typeof sort === 'function') {
      const newBreedList = list.slice().sort(sort(sortingOrder, measuringKey));
      setBreedList(newBreedList);
      if (resetPagination) {
        setPageIndex(0);
      }
    }
  }

  useEffect(() => {
    sortBreeds(breedList, true);
  }, [sortingKey, sortingOrder]);

  useEffect(() => {
    sortBreeds(breedList, false);
  }, [measuringKey]);

  useEffect(() => {
    handleSetVisibleBreeds();
  }, [breedList, pageIndex, itemsPerPage]);


  return (
    <main className={b()}>
      <h1 className={b('headline')}>Dog breed search</h1>
      <section className={b('input')}>
        <SearchInput
          onSearch={handleSearch}
          disabled={loadingState === LOADING_STATES.LOADING}
        />
      </section>
      <section className={b('toolbar')}>
        <Toolbar
          totalRecords={totalRecords}
          pageIndex={pageIndex}
          itemsPerPage={itemsPerPage}
          measuringKey={measuringKey}
          sortingKey={sortingKey}
          sortingOrder={sortingOrder}
          onItemsPerPageSelect={handleItemsPerPageSelect}
          onMeasuringSelect={handleMeasuringSelect}
          onSortingKeySelect={handleSortingKeySelect}
          onSortingOrderSelect={handleSortingOrderSelect}
        />
      </section>
      {totalRecords > itemsPerPage && <section className={b('pagination')}>
        <Pagination
          pageIndex={pageIndex}
          itemsPerPage={itemsPerPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      </section>}
      {loadingState === LOADING_STATES.SUCCESS && <section className={b('table')}>
        <ResultTable
          breedList={breedListToDisplay}
          measuringKey={measuringKey}
        />
      </section>}
      {loadingState === LOADING_STATES.LOADING && <section className={b('table')}>
        <Loader />
      </section>}
      {loadingState === LOADING_STATES.NO_RECORDS && <section className={b('table')}>
        <NoRecords />
      </section>}
      {totalRecords > itemsPerPage && <section className={b('pagination')}>
        <Pagination
          pageIndex={pageIndex}
          itemsPerPage={itemsPerPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      </section>}
    </main>
  )
}

export default App
