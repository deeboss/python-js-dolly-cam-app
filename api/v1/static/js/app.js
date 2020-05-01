
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
      // $.when($.getJSON('/api/v1/runWaypointOne', {}, function(data){})).then(function(){
      //   $.getJSON('/api/v1/runSingleRoute', {
      //     routeFrom: 'waypointOneSteps',
      //     routeTo: 'waypointTwoSteps',
      //     routeEasing: 'quadratic',
      //     routeDuration: '6'
      //   }, function(data){})
      // });
  
      function first() {
        return $.getJSON('/api/v1/runWaypointOne', {}, function(data){});
      }
      
      function second(data, textStatus, jqXHR) {
        return $.getJSON('/api/v1/runSingleRoute', {
              routeFrom: 'waypointOneSteps',
              routeTo: 'waypointTwoSteps',
              routeEasing: 'quadratic',
              routeDuration: '6'
            }, function(data){})
      }

      function third(data, textStatus, jqXHR) {
        return $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: 'waypointTwoSteps',
          routeTo: 'waypointThreeSteps',
          routeEasing: 'quadratic',
          routeDuration: '6'
        }, function(data){})
      }

      function fourth(data, textStatus, jqXHR) {
        return $.getJSON('/api/v1/runSingleRoute', {
          routeFrom: 'waypointThreeSteps',
          routeTo: 'waypointOneSteps',
          routeEasing: 'quadratic',
          routeDuration: '6'
        }, function(data){})
      }
      
      first().then(second).then(third).then(fourth);
    })
  });