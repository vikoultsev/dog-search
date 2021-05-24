
export const createNumberRangeFromString = (string = '') => {
  const arr = string
    .split(' ')
    .map(Number)
    .filter(value => !isNaN(value));
  const [from, to = from] = arr;

  return {
    from,
    to,
  }; 
};

export const sortByHeight = (order, measuringKey) => (breed1, breed2) => {
  const heightRange1 = createNumberRangeFromString(breed1.height[measuringKey]);
  const heightRange2 = createNumberRangeFromString(breed2.height[measuringKey]);

  if (heightRange1.from !== heightRange2.from) {
    return order === 'ASC' ? heightRange1.from - heightRange2.from : heightRange2.from - heightRange1.from;
  }

  return order === 'ASC' ? heightRange1.to - heightRange2.to : heightRange2.to - heightRange1.to;
};

export const sortByName = (order) => (breed1, breed2) => {
  switch (order) {
    case 'ASC':
      return breed1.name < breed2.name ? -1 : 1;
    case 'DESC':
      return breed1.name > breed2.name ? -1 : 1;
    default:
      return 0;
  }
};

export const sortByLifespan = (order) => (breed1, breed2) => {
  const lifespanRange1 = createNumberRangeFromString(breed1.life_span);
  const lifespanRange2 = createNumberRangeFromString(breed2.life_span);

  if (lifespanRange1.from !== lifespanRange2.from) {
    return order === 'ASC' ? lifespanRange1.from - lifespanRange2.from : lifespanRange2.from - lifespanRange1.from;
  }

  return order === 'ASC' ? lifespanRange1.to - lifespanRange2.to : lifespanRange2.to - lifespanRange1.to;
};

export const debounce = (func, timeout = 0) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};


export const measuringKeys = [{
  text: 'Imperial',
  value: 'imperial',
}, {
  text: 'Metric',
  value: 'metric',
}]

export const sortingKeys = [{
  text: 'Name',
  value: 'name',
  sort: sortByName,
}, {
  text: 'Height',
  value: 'height',
  sort: sortByHeight,
}, {
  text: 'Lifespan',
  value: 'lifespan',
  sort: sortByLifespan,
}];

export const soringOrders = [{
  text: 'Ascending',
  value: 'ASC',
}, {
  text: 'Descending',
  value: 'DESC',
}];

export const perPageOptions = [{
  text: '10',
  value: 10,
}, {
  text: '20',
  value: 20,
}, {
  text: '30',
  value: 30,
}, {
  text: '50',
  value: 50,
}, {
  text: '100',
  value: 100,
}];

export const WAIT_INTERVAL = 1000;

export const LOADING_STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  NO_RECORDS: 'NO_RECORDS',
};
