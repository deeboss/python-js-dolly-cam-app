
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
      $.getJSON('/api/v1/changeCameraSettings', {
          optionName: optionName,
          optionValue: optionValue
      }, function(data){
       target.prop("checked", true);
      });
      return false;
    });

    $('#blinkLed').on('click', function() {
      $.getJSON('/api/v1/blinkLed', {}, function(data) {});
      return false;
    });

    $('#captureImage').on('click', function() {
      $.getJSON('/api/v1/captureImage', {}, function(data) {});
      return false;
    });

    // $('#forward').on('click', function(){
    //   $.getJSON('/api/v1/forward', {}, function(data) {});
    //   return false;
    // });
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '/static/data/egg.mp3');

    $('#eggVolume').change(function(){
      if (this.checked) {
        audioElement.volume = .3;
      } else {
        audioElement.volume = 0;
      }
    })

    $('#forward').mousedown(function() {
      $.getJSON('/api/v1/forwardStart', {}, function(data) {});

      if ($('#eggVolume:checked').length > 0) {
        $('body').addClass('funmode')
        audioElement.play();
      }

      return false;
    });

    $('#forward').on('touchstart', function() {
      $.getJSON('/api/v1/forwardStart', {}, function(data) {});

      if ($('#eggVolume:checked').length > 0) {
        $('body').addClass('funmode')
        audioElement.play();
      }

      return false;
    }).bind('touchend', function(){
      $.getJSON('/api/v1/forwardStop', {}, function(data) {});
      
      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
    });

    $('#forward').mouseup(function() {
      $.getJSON('/api/v1/forwardStop', {}, function(data) {});

      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
      return false;
    });
    
    $('#backward').mousedown(function() {
      $.getJSON('/api/v1/backwardStart', {}, function(data) {});
      return false;
    });

    $('#backward').mouseup(function() {
      $.getJSON('/api/v1/backwardStop', {}, function(data) {});
      return false;
    });

    $('#rewind').on("click", function() {
      $.getJSON('/api/v1/rewind', {}, function(data) {});
      return false;
    });

    $('#checkForCamera').on("click", function(){
      $.getJSON('/api/v1/checkForDevice', {}, function(data) {
        console.log(data)
        alert("Camera: " + data.name)
        if (data.name === null) {
          $('.camera-controls').hide()
        } else {
          $('.camera-controls').show()
        }
      })
      return false;
    })
  });