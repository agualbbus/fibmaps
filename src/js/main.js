//maps :AIzaSyBVbAsOk4aQc12Yll-7KazLzLnY1GkMRZY

if (typeof google !== "undefined"){
    var overlay;
    var fibDiv = document.getElementById('translate-container');
    var cataratas =new google.maps.LatLng(-25.665913, -54.448626);

    var mapDiv = document.getElementById('map-canvas');
    var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 13,
          panControl: true,
          rotateControl: true
    };
    var map = new google.maps.Map(mapDiv, mapOptions);


    function MapsInitialize() {


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
              alert("Your browser doesn't support geolocation. We've placed you in Iguazu.");
              initialLocation = cataratas;
            }
            map.setCenter(initialLocation);
        }

        //overlay

        var swBound = new google.maps.LatLng(-22.92804166565176, -43.23171615600586);
        var neBound = new google.maps.LatLng(-22.88503184835787, -43.15824508666992);
        var bounds = new google.maps.LatLngBounds(swBound, neBound);

        //overlay = new fibOverlay(bounds, fibDiv, map);
        //click event ltnr
        google.maps.event.addListener(map, 'click', function(e){
            console.log(e.latLng);
        });

        mapDiv.appendChild(fibDiv);
    }

    google.maps.event.addDomListener(window, 'load', MapsInitialize);
}






$(function(){
    $(document).foundation();
    var $fibCont = $('#fib-cont'),
        $fibSvg = $('#fib-svg'),
        $fibPath = $('#fib-cont path, #fib-cont use'),
        $flipV = $('#flipV'),
        $flipH = $('#flipH'),
        $rotate = $('#rotate'),
        $hideFib = $('#hideFib'),
        $sizeFib = $('#sizeFib'),
        $transCont = $('#translate-container'),
        $lock = $('#lock');


        window.transcont = $transCont ;


    interact('#translate-container')
      .draggable({

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



    //CLICKS AND CHANGES

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


    $rotate.find('.inc').on('click',function(){
        var val = parseFloat($rotate.attr('data-slider')) + .5;
        $rotate.foundation('slider', 'set_value', val );
    });

    $rotate.find('.dec').on('click',function(){
        var val = parseFloat($rotate.attr('data-slider')) - .5;
        $rotate.foundation('slider', 'set_value', val );
    });


    $rotate.on('change.fndtn.slider', function(e){
        var deg = parseFloat( $(this).attr('data-slider') );
            //deg = per * 360 / 100 - 180;
        transform.rot.z = deg;
        transformIt();
    });



    $sizeFib.find('.inc').on('click',function(e){

        var val = parseFloat($sizeFib.attr('data-slider')) + 0.2;
        $sizeFib.foundation('slider', 'set_value', val );

    });


    $sizeFib.find('.dec').on('click',function(e){

        var val = parseFloat($sizeFib.attr('data-slider')) - 0.2;
        $sizeFib.foundation('slider', 'set_value', val );

    });


    $sizeFib.on('change.fndtn.slider', function(e){
        var per = parseFloat( $(this).attr('data-slider') ),
            size = per * ($(window).width() * 1.25) / 100;
        resizeFib(size);
    });


    //locking stuff
    var locked = false;
    $lock.on('click', function(e){

        if(locked === false){

            Math.sqrt( (width()*.382),6;


            var sw = new google.maps.Point(
                $transCont.position().left ,
                $transCont.position().top + $transCont.height()
            );
            var ne = new google.maps.Point(
                $transCont.position().left + $transCont.width(),
                $transCont.position().top

            );

            console.log(sw, ne);
            var proj = map.getProjection();
            //var point = new google.maps.Point($transCont.position().left, $transCont.position().top);
            sw = proj.fromPointToLatLng(sw);
            ne = proj.fromPointToLatLng(ne);
            console.log(sw, ne);


            var swBound = new google.maps.LatLng(sw);//new google.maps.LatLng(-22.92804166565176, -43.23171615600586);
            var neBound =new google.maps.LatLng(ne); //new google.maps.LatLng(-22.88503184835787, -43.15824508666992);
            var bounds = new google.maps.LatLngBounds(sw, ne);

            console.log(bounds);

            overlay = new fibOverlay(bounds, fibDiv, map);
            $transCont.addClass('hide');
            locked = true;
        }
        else{
            $transCont.removeClass('hide');
            overlay.setMap(null);
            locked = false;
        }

    });





    function resizeFib(val){
        $fibCont.width(val);
        $transCont.css({
            'width': $fibCont.width(),
            'height': $fibCont.height(),
        } );

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


    function transformIt(){

        var origin = tOrigin();

        $fibSvg.css('transform', 'rotateX(' +transform.rot.x+ 'deg) rotateY(' +transform.rot.y+ 'deg)');

        $fibCont.css({
          'transform': 'rotateZ(' +transform.rot.z+ 'deg)',// translate(' + transform.trans.x + 'px, ' + transform.trans.y + 'px)',
          'transform-origin': tOrigin().x+' '+tOrigin().y
        });

        $transCont.css({
            'transform': 'translate(' + transform.trans.x + 'px, ' + transform.trans.y + 'px)',
            'width': $fibCont.width(),
            'height': $fibCont.height(),
        } );

    }

  //colors


});
