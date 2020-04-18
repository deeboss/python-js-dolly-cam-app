
$(function() {
    $('#openSettings').on("click", function(){
      $('.drawer').toggle().toggleClass("expand");
    });

    $('button').on('touchstart', function(){
      var that = $(this);
      that.addClass('ontouchstart');
    }).bind('touchend', function(){
      $(this).removeClass('ontouchstart');
  });

    $('input[type="radio"]').on("click", function(event) {
      var target = $(event.target);
      var targetId = target[0].id;
      var splitTarget = targetId.split("_");
      var optionName = splitTarget[0];
      var optionValue = splitTarget[1];
      
      target.prop("checked", true);
      $.getJSON('/changeCameraSettings', {
          optionName: optionName,
          optionValue: optionValue
      }, function(data){
       target.prop("checked", true);
      });
      return false;
    });

    $('#blinkLed').on('click', function() {
      $.getJSON('/blinkLed', {}, function(data) {});
      return false;
    });

    $('#captureImage').on('click', function() {
      $.getJSON('/captureImage', {}, function(data) {});
      return false;
    });

    // $('#forward').on('click', function(){
    //   $.getJSON('/forward', {}, function(data) {});
    //   return false;
    // });
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '/static/data/egg.mp3');

    $('#eggVolume').change(function(){
      if (this.checked) {
        audioElement.volume = 0;
      } else {
        audioElement.volume = .6;
      }
    })

    $('#forward').mousedown(function() {
      $.getJSON('/forwardStart', {}, function(data) {});

      audioElement.addEventListener('ended', function() {
        this.play();
      }, false);
      audioElement.play();

      return false;
    });

    $('#forward').on('touchstart', function() {
      $.getJSON('/forwardStart', {}, function(data) {});

      audioElement.addEventListener('ended', function() {
        this.play();
      }, false);
      audioElement.play();

      return false;
    }).bind('touchend', function(){
      $.getJSON('/forwardStop', {}, function(data) {});
      audioElement.pause(); 
      audioElement.currentTime = 0;
    });

    $('#forward').mouseup(function() {
      $.getJSON('/forwardStop', {}, function(data) {});

      audioElement.pause(); 
      audioElement.currentTime = 0;
      return false;
    });

    $('#rewind').on("click", function() {
      $.getJSON('/rewind', {}, function(data) {});
      return false;
    });
  });