$(document).ready(function() {
    var install = function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var recSlide = event.currentSlide;
        var videoyt = $(recSlide).find('.videoyt');
        var videoframe = $(recSlide).find('.videoframe');
        var ytid = videoyt.attr('ytid') || videoframe.attr('ytid');
        
        // check if is youtube url is inside slide and save youtubeID, prevent reloading checking videoframe
        if(videoframe.html()=='') {
            var width = videoframe.attr('width') || 640;
            var height = videoframe.attr('height') || 360;
            // replace a.videoyt with video embed code
            videoframe.html('<iframe width="'+width+'" height="'+height+'" src="http://www.youtube.com/embed/'+ytid+'?rel=0" frameborder="0" allowfullscreen></iframe>').ready(function() { Reveal.layout(); });
        }
        if (videoyt.length != 0) {
            // &iv_load_policy=<3></3>
            // give anchor with videoid a correct link
            videoyt.attr('href', 'http://www.youtube.com/watch?v='+ytid);
            videoyt.attr('target', '_blank');
        }
    }
    var remove = function(event) {
        // Remove player YouTube from previous slide if it had one,
        // this conserves memory when there are many videos
        recSlide = event.previousSlide;
        videoyt = $(recSlide).find('.videoyt');
        videoframe = $(recSlide).find('.videoframe');
        if (videoframe.html() != '') {
            videoframe.html('');
        }
    }       
    Reveal.addEventListener( 'slidechanged', function(event) {
        install(event);
        remove(event);
    });
    Reveal.addEventListener( 'ready', function(event) {
        install(event);
    });

});

