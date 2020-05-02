
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

    $('#shutdown').on('click', function() {
      $.getJSON('/api/v1/shutdown', {}, function(data){});
      return false;
    })

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

      if ($('#eggVolume:checked').length > 0) {
        $('body').addClass('funmode')
        audioElement.play();
      }

      return false;
    });

    $('#backward').on('touchstart', function() {
      $.getJSON('/api/v1/backwardStart', {}, function(data) {});

      if ($('#eggVolume:checked').length > 0) {
        $('body').addClass('funmode')
        audioElement.play();
      }

      return false;
    }).bind('touchend', function(){
      $.getJSON('/api/v1/backwardStop', {}, function(data) {});
      
      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
    });

    $('#backward').mouseup(function() {
      $.getJSON('/api/v1/backwardStop', {}, function(data) {});

      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
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

    $('[data-type="saveWaypoint"]').on("click", function(){
      var id = this.id.split('wp')[1];
      var type = $(this).data("type");
      var wpApiRoute = '/api/v1/' + type + id;
      $.getJSON(wpApiRoute, {}, function(data){});
      return false;
    })

    $('[data-type="runWaypoint"]').on("click", function(){
      var id = this.id.split('wp')[1];
      var type = $(this).data("type");
      var wpApiRoute = '/api/v1/' + type + id;
      $.getJSON(wpApiRoute, {}, function(data){});
      return false;
    })

    // $('[data-type="saveWaypoint"]').each(function(){
    //   console.log(this.id);
    // })

    $(document).on("click", "#runThisRoute", function(){
      var target = $(this).closest(".route-options")
      var id = target.data("route-id");
      var routeFrom = target.find("#routeFrom option:selected" ).val();
      var routeTo = target.find("#routeTo option:selected" ).val();
      var routeEasing = target.find('#routeEasing option:selected').val();
      var routeDuration = target.find('#routeDuration').val();

      var routeFromId = routeFrom.split('waypoint')[1].split('Steps')[0];

      $.when($.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){})).then(function(){
        $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){})
      });
    });

    $('#runAllRoutes').on("click", function(){
      var target, id, routeFrom, routeTo, routeEasing, routeDuration, routeFromId;
      
      function getTargetRoute(index) {
        target = $(".route-options:nth-of-type(" + index + ")");
        id = target.data("route-id");
        routeFrom = target.find("#routeFrom option:selected" ).val();
        routeTo = target.find("#routeTo option:selected" ).val();
        routeEasing = target.find('#routeEasing option:selected').val();
        routeDuration = target.find('#routeDuration').val();
        routeFromId = routeFrom.split('waypoint')[1].split('Steps')[0];
      }
      
      getTargetRoute(1);
      
      function first() {
        return $.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){});
      }
      
      function second() {
        return $.getJSON('/api/v1/runSingleRoute', {
              routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
            }, function(data){})
      }

      function third() {
        getTargetRoute(2);
        return $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){})
      }

      function fourth() {
        getTargetRoute(3);
        return $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){})
      }
      
      first().then(second).then(third).then(fourth);
    })



    var elToTrack = ".route-options:nth-of-type(1) #routeTo, .route-options:nth-of-type(2) #routeTo";
    
    $(document).on("change", elToTrack, function(){
      var firstRouteToIdx = $('.route-options:nth-of-type(1) #routeTo')[0].selectedIndex;
      var secondRouteToIdx = $('.route-options:nth-of-type(2) #routeTo')[0].selectedIndex;
  
      var secondRouteFrom = $('.route-options:nth-of-type(2) #routeFrom');
      var thirdRouteFrom = $('.route-options:nth-of-type(3) #routeFrom');
      if ($('#syncRoutes').prop("checked")) {
        secondRouteFrom.prop("selectedIndex", firstRouteToIdx);
        thirdRouteFrom.prop("selectedIndex", secondRouteToIdx);
      }
    })

    $('#syncRoutes').on("change", function(){
      var firstRouteToIdx = $('.route-options:nth-of-type(1) #routeTo')[0].selectedIndex;
      var secondRouteToIdx = $('.route-options:nth-of-type(2) #routeTo')[0].selectedIndex;
  
      var secondRouteFrom = $('.route-options:nth-of-type(2) #routeFrom');
      var thirdRouteFrom = $('.route-options:nth-of-type(3) #routeFrom');

      if ($(this).prop("checked")) {
        secondRouteFrom.attr("disabled", true);
        thirdRouteFrom.attr("disabled", true);
        secondRouteFrom.prop("selectedIndex", firstRouteToIdx);
        thirdRouteFrom.prop("selectedIndex", secondRouteToIdx);
      } else {  
        secondRouteFrom.attr("disabled", false);
        thirdRouteFrom.attr("disabled", false);
      }
    });
  });