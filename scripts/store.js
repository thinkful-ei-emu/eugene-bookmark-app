'use strict';

const store = (function() {

  const addBookmark = function(bookmark) {
    bookmark.seeDetails = false;
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return store.bookmarks.find(book => book.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(book => book.id !== id);
  };

  const toggleAddingNew = function() {
    this.addingNew = !this.addingNew;
  };

  const setRatingFilter = function(rating) {
    this.ratingFilter = rating;
  };

  const toggleFullView = function(id) {
    let book = findById(id);
    book.seeDetails = !book.seeDetails;
  };

  const setError = function(error) {
    this.error = error;
  };

  return {
    bookmarks: [],
    addingNew: false,
    ratingFilter: 0,
    error: null,
    addBookmark,
    toggleAddingNew,
    setRatingFilter,
    setError,
    findAndDelete,
    toggleFullView,
    findById
  };
})();
