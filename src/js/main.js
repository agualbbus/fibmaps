//maps :AIzaSyBVbAsOk4aQc12Yll-7KazLzLnY1GkMRZY
'use strict';

var lockedFib = false,
    canResize = true,
    resizeTotal = $(window).width(),
    gmapsZoom = 13;

if (typeof google !== "undefined"){
    var overlay;
    var fibDiv = document.getElementById('fib-cont');
    var cataratas = new google.maps.LatLng(-25.665913, -54.448626);
    var initialLocation =  cataratas;
    var mapDiv = document.getElementById('map-canvas');
    var mapOptions = {
          center: initialLocation,//{ lat: -34.397, lng: 150.644},
          zoom: gmapsZoom,
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
              console.log('initial loc is',initialLocation);
              map.setCenter(initialLocation);
            }, function() {
              handleNoGeolocation(browserSupportFlag);
            });
        }
        // Browser doesn't support Geolocation
        else {
            var browserSupportFlag = false;
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
        var bounds = new google.maps.LatLngBounds(swBound, neBound );

        overlay = new fibOverlay(fibDiv, map);
        //click event ltnr

        google.maps.event.addListenerOnce(map, 'idle', function(){
            overlay = new fibOverlay(fibDiv, map);
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
        $lock = $('#lock'),
        $lockI = $lock.find('i');




    //HELP modal
    //$('#helpModal').foundation('reveal', 'open');




    //use this obj to store transforms values
    var transform = {
        rot: { z: 0, y:0, x:0},
        trans: {x:0, y:0}
    };

    $lock.on('click', function(e) {
        lockedFib = (lockedFib ? false : true);
        $lockI.toggleClass('fa-lock');
        $lockI.toggleClass('fa-unlock');
    });

    //CLICKS AND CHANGES

    $flipV.on('click', function(e){
        if (lockedFib !== true){
            transform.rot.x = ( transform.rot.x==0 ? 180 : 0 );
            transformIt();
        }
    });

    $flipH.on('click', function(e){
        if (lockedFib !== true){
            transform.rot.y = ( transform.rot.y==0 ? 180 : 0 );
            transformIt();
        }
    });

    $hideFib.on('click', function(e){
        $fibCont.toggleClass('disable');
        $(this).html( ( $(this).html()=="Hide" ? "Show" : "Hide"  ) );
    });


    $rotate.find('.inc').on('click',function(){
        if (lockedFib !== true){
            var val = parseFloat($rotate.attr('data-slider')) + .5;
            $rotate.foundation('slider', 'set_value', val );
        }
    });

    $rotate.find('.dec').on('click',function(){
        if (lockedFib !== true)
            var val = parseFloat($rotate.attr('data-slider')) - .5;
            $rotate.foundation('slider', 'set_value', val );
    });


    $rotate.on('change.fndtn.slider', function(e){
        if (lockedFib !== true){
            var deg = parseFloat( $(this).attr('data-slider') );
                //deg = per * 360 / 100 - 180;
            transform.rot.z = deg;
            transformIt();
        }
    });



    $sizeFib.find('.inc').on('click',function(e){
        if (lockedFib !== true){
            var val = parseFloat($sizeFib.attr('data-slider')) + 0.2;
            $sizeFib.foundation('slider', 'set_value', val );
        }

    });


    $sizeFib.find('.dec').on('click',function(e){
        if (lockedFib !== true){
            var val = parseFloat($sizeFib.attr('data-slider')) - 0.2;
            $sizeFib.foundation('slider', 'set_value', val );
        }

    });


    $sizeFib.on('change.fndtn.slider', function(e){
        if (lockedFib !== true && canResize === true){
            var per = parseFloat( $(this).attr('data-slider') ),
                size = per * (  resizeTotal ) / 100;
            console.log(size,per, resizeTotal);
            resizeFib(size);
        }
    });



    function resizeFib(val){
      if (typeof overlay !== 'undefined' ){
          $fibCont.css({
              'width': val,
          } );
          var proj = overlay.getProjection(),
              pos  = proj.fromLatLngToDivPixel(overlay.position_);
          console.log('resize is position',pos);
          overlay.setNewBounds(pos.x, pos.y);
          overlay.draw();
      }
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

        //$fibSvg.css('transform', 'rotateX(' +transform.rot.x+ 'deg) rotateY(' +transform.rot.y+ 'deg)');

        $fibCont.css({
          'transform': 'rotateZ(' +transform.rot.z+ 'deg) rotateX(' +transform.rot.x+ 'deg) rotateY(' +transform.rot.y+ 'deg)', // translate(' + transform.trans.x + 'px, ' + transform.trans.y + 'px)',
          'transform-origin': 'left bottom'//tOrigin().x+' '+tOrigin().y
        });



    }

    //
    $(window).load(function(e){

        google.maps.event.addListener(map, 'zoom_changed', function(e){
            //var val = ($transCont.width() * 100) / ($(window).width() * 1.25);
            canResize = false;
            //$sizeFib.foundation('slider', 'set_value', val );

            var newZoom = map.getZoom();
            var per = 50;//(newZoom < gmapsZoom ? 20 : 80 );

            gmapsZoom = newZoom;
            $sizeFib.foundation('slider', 'set_value', per );

            setTimeout(
                function() {
                    canResize = true;
                    resizeTotal = $fibCont.width()*2;
                },
                500
            );

            console.log('zoom changed');
        });

    });


});
