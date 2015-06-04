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

    var $fibCont = $('#fib-cont'),
        $fibSvg = $('#fib-svg'),
        $flipV = $('#flipV'),
        $flipH = $('#flipH'),
        $rotate = $('#rotate'),
        $hideFib = $('#hideFib'),
        $sizeFib = $('#sizeFib');

    $sizeFib.val( $fibCont.width() );

    $fibCont.resizable({
        handles: 'n, e, s, w',
        aspectRatio: true,
        resize: function(event, ui){
            $sizeFib.val( $fibCont.width() );
        }
    })
    .draggable();

    var rot = {
        z: 0,
        y: 0,
        x: 0
    };

    $flipV.on('click', function(e){
        rot.x = ( rot.x==0 ? 180 : 0 );
        transform();
    });

    $flipH.on('click', function(e){
        rot.y = ( rot.y==0 ? 180 : 0 );
        transform();
    });

    $hideFib.on('click', function(e){
        $fibCont.toggleClass('disable');
        $(this).html( ( $(this).html()=="Hide" ? "Show" : "Hide"  ) );
    });

    $rotate.on('change', function(e){
        rot.z = parseInt( $(this).val() );
        transform();
    });

    $sizeFib.on('change', function(e){
        resizeFib(parseFloat( $(this).val() ))
    });

    function resizeFib(val){
        $fibCont.width(val);
    }

    function transform(){
        $fibSvg.css('transform', 'rotateX(' +rot.x+ 'deg) rotateY(' +rot.y+ 'deg)');
        $fibCont.css('transform', 'rotateZ(' +rot.z+ 'deg)' );
    }

});
