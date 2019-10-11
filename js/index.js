$(document).ready(() => {
  // doSearch
  // get text in search input
  // make ajax call
  // populate divs with results
  const doSearch = () => {
    // Get text fom input search box
    let searchQuery = $('.search input:text').val();
    // Here we are composing the endpoint with query parameters as defined from https://developers.google.com/youtube/v3/docs/search/list
    // part=snippet is like a required default
    // maxResults=10 set the number of results we want to retrieve
    // key is your custom key gotten from the previoud step
    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyCYchlTicuWz3_usJZyluJKkW0S6OAoh7E&q=' + searchQuery;
    // we invoke an ajax request here setting the url, method GET
    // on success we want to populate the div .video-play with an iframe that will hold the first video result. The class embed-resopnsive-item is bootstrap made.suggest-list
    // then we call populateSuggestions and pass in the rest of the videos for the suggested videos section
    // on error, we want to show the error response text in place of the video
    $.ajax({
      url: url,
      method: 'GET',
      success: (result) => {
        $('.video-play').text('');
        $('.video-play').append(`<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`)
        populateSuggestions(result.items.slice(1,10));
      },
      error: (err, response) => {
        console.log(err.responseText);
        $('.video-play').text(err.responseText);
      }
    })
  };

  const populateSuggestions = (videos) => {
    // we loop through the videos using a for-of loop
    $('.suggest-list').text('');
    for (video of videos) {
      // create an image link wrapper for each related videos
      // it is important to note that the videoId value is being set in the link as a data attribute
      let videoElement = `<a href="#" class="suggested" data-videoId=${video.id.videoId} ><img src=${video.snippet.thumbnails.medium.url} /></a>`;
      // append video element
      $('.suggest-list').append(videoElement)
    }
    // After creating the suggested videos link, we will want to add a click listener
    // on click of any of these links, we retrieve the videoId in the data attribute and create a new iframe to embed in our .video-play
    $('a.suggested').click((e) => {
      let videoid =  e.currentTarget.dataset.videoid;
      $('.video-play').text('');
      $('.video-play').append(`<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${videoid} allowFullScreen title='youtube player' />`)
    });
  };

  // click event on submit button
    // doSearch with input text
  $('button:button').click(() => {
    doSearch();
  });

  // on document ready 
    // doSearch with default intput text
  doSearch();
});

