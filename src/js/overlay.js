/** @constructor */
function fibOverlay(elem, map, bounds) {

  // Initialize all properties.
  this.bounds_ = bounds || null;

  this.elem_ = elem;//.cloneNode(true);
  //this.elem_.id = "cloned-fib";
  this.map_ = map;
  this.position_ =  map.getCenter();

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
  var that = this;
  var div = this.elem_;

  //this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  //var panes = this.getPanes();
  //panes.overlayLayer.appendChild(div);

  //drag funbction
  //dragIt(interact(this.div_), tranformFib.doIt );
  div.draggable=true;

  google.maps.event.addDomListener(
      this.map_.getDiv(),
      'mouseleave',
      function(){
          google.maps.event.trigger(div,'mouseup');
      }
  );

  google.maps.event.addDomListener(
      div,
      'mousedown',
      function(e){
        this.style.cursor = 'move';
        that.map_.set('draggable',false);
        that.origin_ = e;

        that.moveHandler  = google.maps.event.addDomListener(
          that.map_.getDiv(),
          'mousemove',
          function(e){
            var origin = that.origin_,
                proj = that.getProjection(),
                left   = origin.clientX-e.clientX,
                top    = origin.clientY-e.clientY,
                //the position
                pos    = proj.fromLatLngToDivPixel(that.position_),
                latLngPos = proj.fromDivPixelToLatLng( new google.maps.Point(pos.x-left, pos.y-top) ),

                //set the new bounds
                sw = proj.fromDivPixelToLatLng(
                    new google.maps.Point(
                        pos.x-left,
                        (pos.y-top) + div.offsetHeight
                    )
                ),

                ne = proj.fromDivPixelToLatLng(
                    new google.maps.Point(
                        pos.x-left + div.offsetWidth,
                        (pos.y-top)
                    )
                );


                that.origin_ = e;
                that.position_ = latLngPos;
                that.bounds_ =  new google.maps.LatLngBounds(sw, ne);
                that.draw();
                console.log('drawed in drag')
            });
        }
  );


  google.maps.event.addDomListener(div,'mouseup',function(){
    that.map_.set('draggable',true);
    this.style.cursor='default';
    google.maps.event.removeListener(that.moveHandler);
  });

  this.div_ = div ;
  this.getPanes().floatPane.appendChild(div);

};

fibOverlay.prototype.draw = function() {
  // */

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var proj = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var div = this.div_;
  if (this.bounds_ !== null ){

      var sw = proj.fromLatLngToDivPixel(this.bounds_.getSouthWest());
      var ne = proj.fromLatLngToDivPixel(this.bounds_.getNorthEast());
      div.style.transform = 'initial';
      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = (ne.x - sw.x) + 'px';
      div.style.height = (sw.y - ne.y) + 'px';

  }
  else{
      var pos = proj.fromLatLngToDivPixel(this.position_);
      div.style.left = pos.x + 'px';
      div.style.top = pos.y + 'px';
      console.log('position first time', pos);
  }


};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
fibOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
