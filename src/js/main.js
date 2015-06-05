//maps :AIzaSyBVbAsOk4aQc12Yll-7KazLzLnY1GkMRZY

if (typeof google !== "undefined"){

    var cataratas =new google.maps.LatLng(-25.665913, -54.448626);

    function MapsInitialize() {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 13,
          panControl: true,
          rotateControl: true
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        // Try W3C Geolocation (Preferred)
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
              initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
              map.setCenter(initialLocation);
            }, function() {
              handleNoGeolocation(browserSupportFlag);
            });
        }
        // Browser doesn't support Geolocation
        else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag == true) {
              alert("Geolocation service failed.");
              initialLocation = cataratas;
            } else {
              alert("Your browser doesn't support geolocation. We've placed you in Antartida.");
              initialLocation = cataratas;
            }
            map.setCenter(initialLocation);
        }

    }
    google.maps.event.addDomListener(window, 'load', MapsInitialize);



}



$(function(){
    $(document).foundation();
    var $fibCont = $('#fib-cont'),
        $fibSvg = $('#fib-svg'),
        $flipV = $('#flipV'),
        $flipH = $('#flipH'),
        $rotate = $('#rotate'),
        $hideFib = $('#hideFib'),
        $sizeFib = $('#sizeFib');

    $sizeFib.val( $fibCont.width() );

//    $fibCont.resizable({
//        handles: 'n, e, s, w',
//        aspectRatio: true,
//        resize: function(event, ui){
//            $sizeFib.foundation('slider', 'set_value', $fibCont.width() * 100 / ($(window).width()*1.25)  );
//        }
//    })
//    .draggable();
// target elements with the "draggable" class


    interact('#fib-cont')
      .draggable({
        // enable inertial throwing
        //inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },

        // call this function on every dragmove event
        onmove: function(event){
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            //apply transform
            transform.trans = {
                x: x,
                y: y
            }

            transformIt();

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

        },
        // call this function on every dragend event
        onend: function (event) {
          var textEl = event.target.querySelector('p');

          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
                         event.dy * event.dy)|0) + 'px');
        }
      });

    //use this obj to store transforms values
    var transform = {
        rot: { z: 0, y:0, x:0},
        trans: {x:0, y:0}
    };


    $flipV.on('click', function(e){
        transform.rot.x = ( transform.rot.x==0 ? 180 : 0 );
        transformIt();
    });

    $flipH.on('click', function(e){
        transform.rot.y = ( transform.rot.y==0 ? 180 : 0 );
        transformIt();
    });

    $hideFib.on('click', function(e){
        $fibCont.toggleClass('disable');
        $(this).html( ( $(this).html()=="Hide" ? "Show" : "Hide"  ) );
    });

    $rotate.on('change.fndtn.slider', function(e){
        var deg = parseInt( $(this).attr('data-slider') );
            //deg = per * 360 / 100 - 180;
        transform.rot.z = parseInt( deg );
        transformIt();
    });

    $sizeFib.on('change.fndtn.slider', function(e){
        var per = parseInt( $(this).attr('data-slider') ),
            size = per * ($(window).width() * 1.25) / 100;
        console.log(size);
        resizeFib(size);
    });

    function resizeFib(val){
        $fibCont.width(val);
    }

    function tOrigin(){
      var x,y,
          l='left',
          r='right',
          t='top',
          b='bottom';
      if(transform.rot.x == 0 && transform.rot.y == 0){
        x = l;
        y = b;
      }
      else if(transform.rot.x == 180 && transform.rot.y == 180){
        x = r;
        y = t;
      }
      else if(transform.rot.x == 180 && transform.rot.y == 0){
        x = l;
        y = t;
      }
      else if(transform.rot.x == 0 && transform.rot.y ==180 ){
        x = r;
        y = b;
      }

      return {
        x: x,
        y: y
      }
    }

    function transformIt(translate){

        var origin = tOrigin();
        $fibSvg.css('transform', 'rotateX(' +transform.rot.x+ 'deg) rotateY(' +transform.rot.y+ 'deg)');
        $fibCont.css({
          'transform': 'rotateZ(' +transform.rot.z+ 'deg) translate(' + transform.trans.x + 'px, ' + transform.trans.y + 'px)',
          'transform-origin': tOrigin().x+' '+tOrigin().y
        });

    }

});
