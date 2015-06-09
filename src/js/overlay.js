/** @constructor */
function fibOverlay(bounds, elem, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.elem_ = elem;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

fibOverlay.prototype = new google.maps.OverlayView();

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
fibOverlay.prototype.onAdd = function() {

  var div = this.elem_;

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

fibOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';


    var $fibCont = $('#fib-cont'),
        $fibSvg = $('#fib-svg'),
        $fibPath = $('#fib-cont path, #fib-cont use'),
        $flipV = $('#flipV'),
        $flipH = $('#flipH'),
        $rotate = $('#rotate'),
        $hideFib = $('#hideFib'),
        $sizeFib = $('#sizeFib'),
        $transCont = $('#translate-container');





    interact('#translate-container')
      .draggable({
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



    $sizeFib.find('.inc').on('click',function(){
        var val = parseFloat($sizeFib.attr('data-slider')) + 0.2;
        $sizeFib.foundation('slider', 'set_value', val );
    });

    $sizeFib.find('.dec').on('click',function(){
        var val = parseFloat($sizeFib.attr('data-slider')) - 0.2;
        $sizeFib.foundation('slider', 'set_value', val );
    });

    $sizeFib.on('change.fndtn.slider', function(e){
        var per = parseFloat( $(this).attr('data-slider') ),
            size = per * ($(window).width() * 1.25) / 100;
        resizeFib(size);
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








};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
fibOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
