
$(function() {
    $('#openSettings').on("click", function(){
      $('.drawer').toggleClass("expand");
    });

    $('input[type="radio"]').on("click", function(event) {
      var target = $(event.target);
      var targetId = target[0].id;
      var optionName = targetId.replace(/\d+/g, '');
      var optionValue = targetId.match(/\d+/)[0];
      
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
  });