/* eslint-disable no-undef */
'use strict';
/* global Bookmark, store*/
// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  Bookmark.bindEventListeners();
  api.getItems()
    .then((bookmarks) => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      Bookmark.render();
    });
});