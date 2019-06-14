/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */
const Bookmark = (function(){
 
  // //wireframe function, will delete
  function handleAddBookmarkExpand() {
    $('#add-bookmark-button').on('click', () => {
      $('#add-bookmark-div').removeClass('hidden');
      $('#add-bookmark-button').addClass('hidden');
    });
  }

  //wireframe function, will delete
  function handleCancelButton() {
    $('#cancel-button').on('click', () => {
      $('#add-bookmark-div').addClass('hidden');
      $('#add-bookmark-button').removeClass('hidden');
      $('#add-bookmark-form').trigger('reset');
    });
  }

  //wireframe function, will delete
  function handleSeeDetailsButton() {
    $('.see-details-button').on('click', () => {
      $('.hide-details-button').removeClass('hidden');
      $('.see-details-button').addClass('hidden');
      $('.expanded-details').removeClass('hidden');
    });
  }

  //wireframe function, will delete
  function handleHideDetailsButton() {
    $('.hide-details-button').on('click', () => {
      $('.hide-details-button').addClass('hidden');
      $('.see-details-button').removeClass('hidden');
      $('.expanded-details').addClass('hidden');
    });
  }



  function bindEventListeners() {
    handleCancelButton();
    handleAddBookmarkExpand();
    handleSeeDetailsButton();
    handleHideDetailsButton();
  }

  return {
    bindEventListeners,
    render
  };
})();
  

