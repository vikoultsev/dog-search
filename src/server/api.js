const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const ENDPOINT = 'http://api.thedogapi.com';
const headers = {
  'Accept': 'application/json',
  'x-api-key': '5af5f705-0314-44d6-8b8d-215252f7b322',
};

router.get('/search', (req, res) => {
    const { query } = req.query;
    return fetch(`${ENDPOINT}/v1/breeds/search?q=${query}`, { headers })
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => err);
});

router.get('/image', (req, res) => {
  const { imageId } = req.query;
  return fetch(`${ENDPOINT}/v1/images/${imageId}`, { headers })
      .then(response => response.json())
      .then(data => res.json(data))
      .catch(err => err);
});


module.exports = router;