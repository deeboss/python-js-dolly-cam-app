
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
      $.getJSON('/api/v1/forwardStop', {}, function(data) {
        var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
        $('#currentSteps').text(data.current_position);
      });
      
      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
    });

    $('#forward').mouseup(function() {
      $.getJSON('/api/v1/forwardStop', {}, function(data) {
        var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
        $('#currentSteps').text(data.current_position);
      });

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
      $.getJSON('/api/v1/backwardStop', {}, function(data) {
        var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
        $('#currentSteps').text(data.current_position);
      });
      
      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
    });

    $('#backward').mouseup(function() {
      $.getJSON('/api/v1/backwardStop', {}, function(data) {
        var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
        $('#currentSteps').text(data.current_position);
      });

      if ($('#eggVolume:checked').length > 0) {
        $('body').removeClass('funmode')
        audioElement.pause(); 
        audioElement.currentTime = 0;
      }
      return false;
    });

    $('#rewind').on("click", function() {
      $.getJSON('/api/v1/rewind', {}, function(data) {
        var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
        $('#currentSteps').text(data.current_position);
      });
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

    var waypointCoordinates = [
      {name: "", steps: 0},
      {name: "", steps: null},
      {name: "", steps: null}
    ]
    var totalSteps = 0;

    function setRouteNodePosition(id, arr) {
      var maxCanvasWidth = ($('.route-canvas').width());

      function getMinMax(array) {
        var data = [];
        for (var i = 0; i < array.length; i++) {
          data.push(array[i].steps);
        }

        var min = Math.min(...data);
        var max = Math.max(...data);

        return [min, max];
      }

      function lerp(max, min, percent) {
        return (max - min) * percent + min;
      }

      function rangePercentage(input, min, max) {
        return 1 - (((input - min) * 100) / (max - min) / 100);
      }

      for (var i = 0; i < arr.length; i++) {
        minMaxArr = getMinMax(arr);
        if (arr[i].steps !== null) {
          var roundedToMeters = Math.round((arr[i].steps / 800) * 10) / 10;
          var percentageFromMax = rangePercentage(arr[i].steps, minMaxArr[0], minMaxArr[1]);
          var stepRange = (Math.abs(minMaxArr[1]) + Math.abs(minMaxArr[0]));
          var placementPosition = lerp((maxCanvasWidth/2), -(maxCanvasWidth/2), percentageFromMax);
          $('.route-item.node#' + i).removeClass("invisible").css('transform', 'translateX(' + placementPosition + 'px)');
          $('[data-node-id="' + i + '"]').text(arr[i].steps);
        }
      }

    }

    $('[data-type="saveWaypoint"]').on("click", function(){
      var id = this.id.split('wp')[1];
      var type = $(this).data("type");
      var wpApiRoute = '/api/v1/' + type + id;
      $.getJSON(wpApiRoute, {}, function(data){
        $('.route-length').removeClass("empty");
        waypointCoordinates[data.id].steps = data.steps;
        setRouteNodePosition(data.id, waypointCoordinates);
      });

      return false;
    })

    $('[data-type="runWaypoint"]').on("click", function(){
      var id = this.id.split('wp')[1];
      var type = $(this).data("type");
      var wpApiRoute = '/api/v1/' + type + id;
      $.getJSON(wpApiRoute, {}, function(data){});
      return false;
    })

    var easingOptions = {
      "Linear": "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
      "QuadraticIn": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "QuadraticOut": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      "QuadraticInOut": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
      "CubicIn": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
      "CubicOut": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
      "CubicInOut": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
      "QuarticIn": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
      "QuarticOut": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
      "QuarticInOut": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
      "QuinticIn": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
      "QuinticOut": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
      "QuinticInOut": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
    }

    function convertStringIdToInt(string) {
      switch(string) {
        case "One":
          return 0;
          break;

        case "Two":
          return 1;
          break;

        case "Three":
          return 2;
          break;
      }
    }

    var vehicle = $('.route-item.vehicle');

    function setVehicleStartingPosition(id) {
      var idx = convertStringIdToInt(id);
      var startingPosition = $('.route-item.node#' + idx).css("transform");
      vehicle.css("transform", startingPosition);
      setTimeout(function(){
        vehicle.removeClass("invisible");
      }, 200);
    }

    function animateVehicleToWaypoint(id, t, ease) {
      var idx = convertStringIdToInt(id);
      var endPosition = $('.route-item.node#' + idx).css("transform");
      var cssEaseProperty = easingOptions[ease];
      console.log(endPosition, t+'s', cssEaseProperty);
      vehicle.css({
        "transition-property": "transform",
        "transition-duration": t + "s",
        "transition-timing-function": cssEaseProperty,
        "transform": endPosition
      });
    }

    $(document).on("click", "#runThisRoute", function(){
      var target = $(this).closest(".route-options");
      var id = target.data("route-id");
      var routeFrom = target.find("#routeFrom option:selected" ).val();
      var routeTo = target.find("#routeTo option:selected" ).val();
      var routeEasing = target.find('#routeEasing option:selected').val();
      var routeDuration = target.find('#routeDuration').val();

      var routeFromId = routeFrom.split('waypoint')[1].split('Steps')[0];
      var routeToId = routeTo.split('waypoint')[1].split('Steps')[0];

      $.when($.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){
        setVehicleStartingPosition(routeFromId);
      })).then(function(){
        setTimeout(function(){
          animateVehicleToWaypoint(routeToId, routeDuration, routeEasing);
          $.getJSON('/api/v1/runSingleRoute', {
            routeFrom: routeFrom,
            routeTo: routeTo,
            routeEasing: routeEasing,
            routeDuration: routeDuration
          }, function(data){
            setTimeout(function(){
              vehicle.addClass("invisible");
              vehicle.css({'transition-property': "", "transition-duration": ""});
              setTimeout(function(){
                vehicle.css("transform", "");
              }, 300);
            }, 1500);
          })
        }, 1000);
      });
    });

    $('#runAllRoutes').on("click", function(){
      var target, id, routeFrom, routeTo, routeEasing, routeDuration, routeFromId, routeToId;
      
      function getTargetRoute(index) {
        target = $(".route-options:nth-of-type(" + index + ")");
        id = target.data("route-id");
        routeFrom = target.find("#routeFrom option:selected" ).val();
        routeTo = target.find("#routeTo option:selected" ).val();
        routeEasing = target.find('#routeEasing option:selected').val();
        routeDuration = target.find('#routeDuration').val();
        routeFromId = routeFrom.split('waypoint')[1].split('Steps')[0];
        routeToId = routeTo.split('waypoint')[1].split('Steps')[0];
      }
      
      getTargetRoute(1);
      
      function first() {
        return $.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){
          setVehicleStartingPosition(routeFromId);
        });
      }
      
      function second() {
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
            routeFrom: routeFrom,
            routeTo: routeTo,
            routeEasing: routeEasing,
            routeDuration: routeDuration
        }, function(data){})
      }

      function third() {
        getTargetRoute(2);
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){})
      }

      function fourth() {
        getTargetRoute(3);
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){
          setTimeout(function(){
            vehicle.addClass("invisible");
            vehicle.css({'transition-property': "", "transition-duration": ""});
            setTimeout(function(){
              vehicle.css("transform", "");
            }, 300);
          }, 1500);
        })
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