//maps :AIzaSyBVbAsOk4aQc12Yll-7KazLzLnY1GkMRZY

function MapsInitialize() {
var mapOptions = {
  center: { lat: -34.397, lng: 150.644},
  zoom: 8
};
var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
}
google.maps.event.addDomListener(window, 'load', MapsInitialize);


$(function(){

    var $fibCont=$('#test-fib');
//    $fibCont.resizable({
//        aspectRatio: true,
//        resize: function(event, ui){
//          ui.element.find('svg').remove();
//          drawFib();
//        }
//    });
    //drawFib();

});
