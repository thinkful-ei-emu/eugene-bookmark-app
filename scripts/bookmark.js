/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

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

  function generateNewBookmarkFormHtml() {
    return `
    <form>
      <section>
        <div>
          <label for="title">Title</label>
          <input type="text" name="title" id="js-title-input" placeholder="Cool Title Here"/>
        </div>
        <div class>
          <label for="url">Url</label>
          <input
            type="url"
            name="url"
            id="js-url-input"
            placeholder="http://www.coolwebsite.com"
          />
        </div>
        <div class>
          <label for="description">Description</label>
          <input type="text" name="description" id="js-description-input" placeholder= "Website description here"/>
        </div>
      </section>

      <div>
        <label for="rating-selection">Rating</label>
        <select name="rating-selection" id="js-rating-selection" required>
          <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
          <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
          <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
          <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
          <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
        </select>
        <div>
          <button type="submit" id="js-submit-button">Submit</button>
          <button type="button" id="js-cancel-button">Cancel</button>
        </div>
      </div>
    </form>`;
  }

  function generateErrorMessageElement() {
    return `<p id="error-message">Error: ${store.error}</p>
    <button type="button" id="js-error-dismiss">Dismiss</button>
    `;
  }

  function handleDismissError() {
    $('#js-error').on('click','#js-error-dismiss', function() {
      store.setError(null);
      render();
    });
  }


  function render() {
    if (store.addingNew) {
      $('#js-add-bookmark').html(generateNewBookmarkFormHtml());
      $('#js-new-filter-form').addClass('hidden');
    } else {
      $('#js-add-bookmark').html('');
      $('#js-new-filter-form').removeClass('hidden');
    }

    if (store.error) {
      $('#js-error').html(generateErrorMessageElement());
    } else {
      $('#js-error').html('');
    }

    let bookmarks = [...store.bookmarks];
    const filteredList = bookmarks.filter(book => (book.rating >= store.ratingFilter));
    const html = generateBookmarkElementsString(filteredList);
    $('#js-bookmark-area').html(html);
  }

  function handleNewBookmarkButton() {
    $('#js-new-bookmark-button').click(function() {
      store.toggleAddingNew();
      render();
    });
  }

  function handleCancelButton() {
    $('#js-add-bookmark').on('click','#js-cancel-button',function() {
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
    $('#js-add-bookmark').on('click', '#js-submit-button', event => {
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
      const id = getBookmarkIdFromElement(event.currentTarget);
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

 

  function bindEventListeners() {
    handleNewBookmarkButton();
    handleDeleteBookmark();
    handleAddBookmarkSubmit();
    handleCancelButton();
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
