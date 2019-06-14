/* eslint-disable strict */
const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/eugenegian/bookmarks';
  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
        // In either case, parse the JSON stream:
        return res.json();
      })
  
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }
  
  
  const getItems = function(){
    return listApiFetch(BASE_URL);
  };
  
  const createItem = function(bookmark){
    const newBookmark = JSON.stringify(bookmark);
    const options ={
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark
    };
    return listApiFetch(BASE_URL, options);
  };
  
  const deleteItem = function(id){
    const options = {
      method: 'DELETE'
    };
    return listApiFetch(`${BASE_URL}/${id}`, options);
  };
  
  return {
    getItems,
    createItem,
    deleteItem,
  };
}());

console.log(api.getItems());
console.log(api.deleteItem('cjwwgm0lc003u0kx1y7c4786y'));