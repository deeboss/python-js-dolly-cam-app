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
      var roundedToMeters = Math.round((arr[i].steps / 3333) * 10) / 10;
      var percentageFromMax = rangePercentage(arr[i].steps, minMaxArr[0], minMaxArr[1]);
      var stepRange = (Math.abs(minMaxArr[1]) + Math.abs(minMaxArr[0]));
      var placementPosition = lerp((maxCanvasWidth/2), -(maxCanvasWidth/2), percentageFromMax);
      $('.route-item.node#' + i).removeClass("invisible").css('transform', 'translateX(' + placementPosition + 'px)');
      $('[data-node-id="' + i + '"]').html(roundedToMeters + ' meters </br> (' + arr[i].steps);
    }
  }

}

function shutdownServer() {
  $.getJSON('/api/v1/shutdown', {}, function(data){});
  setTimeout(function(){
    window.location.reload();
  }, 500);
  return false;
}

function moveForwards() {
  $('#status-text').text("Moving forwards");
  $.getJSON('/api/v1/forwardStart', {}, function(data) {});
  if ($('#eggVolume:checked').length > 0) {
    $('body').addClass('funmode')
    audioElement.play();
  }
  
  return false;
}

function stopForwards() {
  $.getJSON('/api/v1/forwardStop', {}, function(data) {
    var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
    $('#currentSteps').text(data.current_position);
    $('#status-text').text("Idle. Ready for commands");
  });

  if ($('#eggVolume:checked').length > 0) {
    $('body').removeClass('funmode')
    audioElement.pause(); 
    audioElement.currentTime = 0;
  }
  return false;
}

function moveBackwards() {
  $('#status-text').text("Moving backwards");
  $.getJSON('/api/v1/backwardStart', {}, function(data) {});

  if ($('#eggVolume:checked').length > 0) {
    $('body').addClass('funmode')
    audioElement.play();
  }

  return false;
}

function stopBackwards() {
  $.getJSON('/api/v1/backwardStop', {}, function(data) {
    var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
    $('#currentSteps').text(data.current_position);
    $('#status-text').text("Idle. Ready for commands");
  });

  if ($('#eggVolume:checked').length > 0) {
    $('body').removeClass('funmode')
    audioElement.pause(); 
    audioElement.currentTime = 0;
  }
  return false;
}

function rewind() {
  $('#status-text').text("Returning to start position");
  $('body').addClass("disable");

  $.getJSON('/api/v1/rewind', {}, function(data) {
    var roundedToMeters = Math.round((data.current_position / 800) * 10) / 10;
    $('#currentSteps').text(data.current_position);
    $('body').removeClass("disable");
    $('#status-text').text("Idle. Ready for commands");
  });
  return false;
}

function saveWaypoint(id, route, coordinates) {
  $('#status-text').text("Saving Waypoint " + id);
  $.getJSON(route, {}, function(data){
    $('.route-length').removeClass("empty");
    coordinates[data.id].steps = data.steps;
    setRouteNodePosition(data.id, coordinates);
    $('#status-text').text("Idle. ready for commands");
  });

  return false;
}

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
      $('#status-text').text("Making RPi Blink");
      $('body').addClass('disable');
      $.getJSON('/api/v1/blinkLed', {}, function(data) {
        $('body').removeClass('disable');
        $('#status-text').text("Idle. Ready for commands");
      });
      return false;
    });

    $('#captureImage').on('click', function() {
      $.getJSON('/api/v1/captureImage', {}, function(data) {});
      return false;
    });

    $('#restart').on('click', function() {
      $.getJSON('/api/v1/restart', {}, function(data){});
      setTimeout(function(){
        window.location.reload();
      }, 500);
      return false;
    })

    $('#shutdown').on('click', function() {
      shutdownServer()
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
    
    $('#forward').mousedown(function(event) {
      event.preventDefault();
      moveForwards();
    });
    
    $('#forward').on('touchstart', function() {
      moveForwards();
    }).bind('touchend', function(){
      stopForwards();
    });

    $('#forward').mouseup(function() {
      stopForwards();
    });
    
    $('#backward').mousedown(function(event) {
      moveBackwards();
    });

    $('#backward').on('touchstart', function() {
      moveBackwards();
    }).bind('touchend', function(){
      stopBackwards();
    });

    $('#backward').mouseup(function() {
      stopBackwards();
    });

    $('#rewind').on("click", function() {
      rewind();
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

      saveWaypoint(id, wpApiRoute, waypointCoordinates);
    })

    // $('[data-type="runWaypoint"]').on("click", function(){
    //   var id = this.id.split('wp')[1];
    //   var type = $(this).data("type");
    //   var wpApiRoute = '/api/v1/' + type + id;
    //   $.getJSON(wpApiRoute, {}, function(data){});
    //   return false;
    // })

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
      // console.log(endPosition, t+'s', cssEaseProperty);
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

      $('body').addClass("disable");
      $('#status-text').text("Moving to start position (Waypoint " + routeFromId + ")");

      $.when($.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){
        setVehicleStartingPosition(routeFromId);
      })).then(function(){
        setTimeout(function(){
          animateVehicleToWaypoint(routeToId, routeDuration, routeEasing);
          $('#status-text').text("Running to Waypoint " + routeToId);
          $.getJSON('/api/v1/runSingleRoute', {
            routeFrom: routeFrom,
            routeTo: routeTo,
            routeEasing: routeEasing,
            routeDuration: routeDuration
          }, function(data){
            $('#status-text').text("Route complete");
            setTimeout(function(){
              vehicle.addClass("invisible");
              vehicle.css({'transition-property': "", "transition-duration": ""});
              setTimeout(function(){
                vehicle.css("transform", "");
              }, 300);
              $('body').removeClass("disable");
              $('#status-text').text("Idle. Ready for commands");
            }, 1500);
          })
        }, 1000);
      });
    });

    $('#runAllRoutes').on("click", function(){
      var target, id, routeFrom, routeTo, routeEasing, routeDuration, routeFromId, routeToId;
      $('body').addClass("disable");
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
        $('#status-text').text("Moving to start position (Waypoint " + routeFromId + ")");
        return $.getJSON('/api/v1/runWaypoint' + routeFromId, {}, function(data){
          setVehicleStartingPosition(routeFromId);
        });
      }
      
      function second() {
        $('#status-text').text("Going to Waypoint " + routeToId);
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
            routeFrom: routeFrom,
            routeTo: routeTo,
            routeEasing: routeEasing,
            routeDuration: routeDuration
        }, function(data){})
      }

      function third() {
        getTargetRoute(2);
        $('#status-text').text("Going to Waypoint " + routeToId);
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){})
      }

      function fourth() {
        getTargetRoute(3);
        $('#status-text').text("Going to Waypoint " + routeToId);
        return animateVehicleToWaypoint(routeToId, routeDuration, routeEasing), $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: routeFrom,
          routeTo: routeTo,
          routeEasing: routeEasing,
          routeDuration: routeDuration
        }, function(data){
          $('#status-text').text("Route complete");
          setTimeout(function(){
            vehicle.addClass("invisible");
            vehicle.css({'transition-property': "", "transition-duration": ""});
            setTimeout(function(){
              vehicle.css("transform", "");
            }, 300);
            $('body').removeClass("disable");
            $('#status-text').text("Idle. Ready for commands");
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

  var isUpFired = false;
  var isDownFired = false;

  $(document).on('keydown', function(e) {

    switch(e.keyCode) {
      case 27:
        shutdownServer();
        break;

      case 38:
        if (!isUpFired) {
          isUpFired = true;
          $("body").addClass("disable");
          moveForwards();
  
          return isUpFired;
        }
        break;

      case 40:
        if (!isDownFired) {
          isDownFired = true;
          $("body").addClass("disable");
          moveBackwards();
  
          return isDownFired;
        }
        break;
      
      case 82:
        rewind();
        break;

      case 90:
        saveWaypoint('One', '/api/v1/saveWaypointOne', waypointCoordinates);
        break;

      case 88:
        saveWaypoint('Two', '/api/v1/saveWaypointTwo', waypointCoordinates);
        break;

      case 67:
        saveWaypoint('Three', '/api/v1/saveWaypointThree', waypointCoordinates);
        break;
    }
  });

  $(document).on('keyup', function(e) {
    switch(e.keyCode) {
      case 38:
        if (isUpFired) {
          isUpFired = false;
          stopForwards();
          $("body").removeClass("disable");
          return isUpFired;
        }
        break;

      case 40:
        if (isDownFired) {
          isDownFired = false;
          stopBackwards();
          $("body").removeClass("disable");
          return isDownFired;
        }
        break;
    }
  });
});