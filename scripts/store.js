'use strict';
const store = (function() {

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(book => book.id===id);  
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(book => book.id !== id);
  };

  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };

  const toggleAddNew = function() {
    this.addingNew = !this.addingNew;
  };

  const changeRatingFilter = function(rating) {
    this.ratingFilter = rating;
  };

  function updateError(error) {
    this.error = error;
  }

  function toggleBookmarkFullView(id) {
    let book = findById(id);
    book.fullView = !book.fullView;
  }

  return {
    bookmarks: [],
    addingNew: false,
    ratingFilter: 0,
    error: null,
    addBookmark,
    toggleAddNew,
    changeRatingFilter,
    updateError,
    findAndDelete,
    setItemIsEditing,
    toggleBookmarkFullView,
    findById,
  };
})();