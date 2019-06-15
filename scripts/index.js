/* eslint-disable no-undef */
'use strict';

$(document).ready(function() {
  bookmark.bindEventListeners();
  api.getBookmarks()
    .then((res) => {
      res.forEach(bookmark => store.addBookmark(bookmark));
      bookmark.render();
    });
});