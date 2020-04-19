
$(function() {
    $('#openSettings').on("click", function(){
      $('.drawer').toggleClass("expand");
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

    $('#forward').mousedown(function() {
      $.getJSON('/api/v1/forwardStart', {}, function(data) {});
      return false;
    });

    $('#forward').mouseup(function() {
      $.getJSON('/api/v1/forwardStop', {}, function(data) {});
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