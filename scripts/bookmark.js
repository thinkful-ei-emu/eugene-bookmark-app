/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
//this file is for all my event listeners as well as my render function

const bookmark = (function() {
  function generateBookmarkElement(newBookmark) {
    let expandedDetails = '';
    let visitSite = '';

    if (newBookmark.seeDetails) {
      expandedDetails = `<section class ="bookmark-desc"><p class="desc">${
        newBookmark.desc
      }</p></section>`;
      visitSite =
        '<button value="Visit Site" class="js-visit-button" type="button">Visit Site</button>';

      return `<fieldset class = "bookmark-display">
      <legend> ${newBookmark.title} </legend>
      <div class = "js-bookmark" data-book-id = ${newBookmark.id}>
        <div>
          <div class = "bookmark-rating">${newBookmark.rating} stars</div>
        </div>
        ${expandedDetails}
        <div id="bookmark-buttons">
          <button class="js-expand-button" type="button">See Details</button>
          <button type="button" class="js-delete-button">Delete</button>
          ${visitSite}
          </div>
        
      </div>
    </fieldset>`;
    }

    return `<fieldset class = "bookmark-display">
    <legend> ${newBookmark.title} </legend>
      <div class = "js-bookmark" data-book-id = ${newBookmark.id}>
      <div>
        <div class ="flex">
          <div class = "bookmark-rating">${newBookmark.rating} stars</div>
        </div>
          <div id="bookmark-buttons">
          <button class="js-expand-button" type="button">See Details</button>
          <button class="js-delete-button" type="button">Delete</button>
          ${visitSite}
          </div>
        </div>
         ${expandedDetails}
      </div>
    </fieldset>`;
  }

  function generateBookmarkElementsString(bookmarkArray) {
    return bookmarkArray.map(book => generateBookmarkElement(book)).join('');
  }

  function render() {
    if (store.addingNew) {
      $('#js-add-bookmark').removeClass('hidden');
      $('#js-new-filter-form').addClass('hidden');
    } else {
      $('#js-add-bookmark').addClass('hidden');
      $('#js-new-filter-form').removeClass('hidden');
    }

    if (store.error) {
      $('#js-error').removeClass('hidden');
      //$('#js-new-filter-form').addClass('hidden');
      $('#error-message').html(`Error: ${store.error}`);
    } else {
      $('#js-error').addClass('hidden');
    }

    let bookmarks = [...store.bookmarks];
    const filteredList = bookmarks.filter(book => (book.rating >= store.ratingFilter));
    const html = generateBookmarkElementsString(filteredList);
    $('#js-bookmark-area').html(html);
  }

  function handleAddExpand() {
    $('#js-new-bookmark-button').click(function(event) {
      event.preventDefault();
      store.toggleAddingNew();
      render();
    });
  }

  function handleCancelButton() {
    $('#js-cancel-button').click(event => {
      event.preventDefault();
      store.toggleAddingNew();
      render();
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark').data('book-id');
  }
  
  function handleDeleteBookmark() {
    $('#js-bookmark-area').on('click', '.js-delete-button', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id);
      store.findAndDelete(id);
      render();
    });
  }

  function handleAddBookmarkSubmit() {
    $('#js-add-bookmark').submit(event => {
      event.preventDefault();

      const title = $('#js-title-input').val();
      const url = $('#js-url-input').val();
      const desc = $('#js-description-input').val();
      const rating = $('#js-rating-selection').val();

      $('#js-title-input').val('');
      $('#js-url-input').val('http://');
      $('#js-description-input').val('');
      $('#js-rating-selection').val('');

      const bookmark = {
        title: title,
        desc: desc,
        url: url,
        rating: rating
      };

      api
        .createBookmark(bookmark)
        .then(res => {
          store.addBookmark(res);
          render();
        })
        .catch(error => {
          store.setError(error.message);
          render();
        });

      store.toggleAddingNew();
    });

  }

  function handleExpandBookmark() {
    $('#js-bookmark-area').on('click', '.js-expand-button', event => {
      const id = getBookmarkIdFromElement(event.currentTarget)
      store.toggleFullView(id);
      render();
    });
  }

  function handleVisitSite() {
    $('#js-bookmark-area').on('click', '.js-visit-button', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.findById(id);
      const url = bookmark.url;
      window.location = url;
    });
  }

  function handleFiltering() {
    $('#js-rating-filter').change(event => {
      const rating = $(event.currentTarget).val();
      store.setRatingFilter(rating);
      render();
    });
  }

  function handleDismissError() {
    $('#js-error-dismiss').click(event => {
      event.preventDefault();
      store.setError(null);
      render();
    });
  }

  function bindEventListeners() {
    handleAddExpand();
    handleCancelButton();
    handleDeleteBookmark();
    handleAddBookmarkSubmit();
    handleExpandBookmark();
    handleVisitSite();
    handleFiltering();
    handleDismissError();
  }

  return {
    bindEventListeners,
    render
  };
})();
