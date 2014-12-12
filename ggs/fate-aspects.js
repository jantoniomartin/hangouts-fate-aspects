var apiReady = false;

gapi.hangout.onApiReady.add(function(eventObj) {
    console.log('Hangouts API is ready.');
    apiReady = true;
});

$(function() {
    $('#aspects').accordion( {heightStyle: "content"} );

});
