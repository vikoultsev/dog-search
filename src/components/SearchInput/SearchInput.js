import React, { useCallback, useState } from 'react'
import block from 'bem-cn-lite'
// import debounce from 'lodash.debounce'
import { WAIT_INTERVAL, debounce } from '../../helpers'

import './SearchInput.scss'
const b = block('SearchInput')

function SearchInput(props) {
  const {
    onSearch,
    disabled,
  } = props;

  const [value, setValue] = useState('');
  const handleDebounceLoad = useCallback(debounce(onSearch, WAIT_INTERVAL), []);

  const handleChange = e => {
    setValue(e.target.value);
    handleDebounceLoad(e.target.value);
  };

  return (
    <div className={b()}>
      <div className={b('field')}>
        <input
          data-testid='search-input'
          type='text'
          placeholder='Search'
          className={b('input')}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
    
  )
}

export default SearchInput;
