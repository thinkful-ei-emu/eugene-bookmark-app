/* eslint-disable no-unused-vars */
'use strict';

const api = (function() {
  const BASE_URL =
    'https://thinkful-list-api.herokuapp.com/eugenegian/bookmarks';


  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
        }
        return res.json();
      })
      .then(res => {
        if (error) {
          error.message = res.message;
          return Promise.reject(error);
        }
        return res;
      });
  }
  

  function getBookmarks() {
    return listApiFetch(BASE_URL);
  }

  function createBookmark(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    const options = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: newBookmark
    };
    return listApiFetch(BASE_URL, options);
  }

  function deleteBookmark(id) {
    const options = {
      method: 'DELETE'
    };
    return listApiFetch(`${BASE_URL}/${id}`, options);
  }

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
})();
