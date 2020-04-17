
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

    $('#forward').mousedown(function() {
      $.getJSON('/forwardStart', {}, function(data) {});
      return false;
    });

    $('#forward').mouseup(function() {
      $.getJSON('/forwardStop', {}, function(data) {});
      return false;
    });

    $('#rewind').on("click", function() {
      $.getJSON('/rewind', {}, function(data) {});
      return false;
    });
  });