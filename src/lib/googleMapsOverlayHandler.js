import { mapModel } from 'models';

function createOverlay(id, elem, position, callbacks) {
  const map = mapModel.mapInstance;
  const gMaps = window.google.maps;

  const overlay = Object.assign(new gMaps.OverlayView(), {
    bounds: null,
    position: position ? new gMaps.LatLng(position.lat, position.lng) : map.getCenter(), // intial position
    isDraggable: false,
    elem,

    onAdd() {
      const that = this;
      elem.draggable = true;

      gMaps.event.addDomListener(
        map.getDiv(),
        'mouseleave',
        () => {
          gMaps.event.trigger(elem, 'mouseup');
        }
      );

      gMaps.event.addDomListener(
          elem,
          'mousedown',
          function(e) { // eslint-disable-line
            callbacks.makeActiveCb();
            if (!this.isDraggable && callbacks.isActive() && callbacks.isLockedCb() === false) {
              this.style.cursor = 'move';
              map.set('draggable', false);
              that.origin = e;
              that.isDraggable = true;

              that.moveHandler = gMaps.event.addDomListener(
                map.getDiv(),
                'mousemove',
                function(e) { // eslint-disable-line
                  if (that.isDraggable) {
                    const proj = that.getProjection();
                    const left = that.origin.clientX-e.clientX; // eslint-disable-line
                    const top = that.origin.clientY-e.clientY; // eslint-disable-line
                    const pos = proj.fromLatLngToDivPixel(that.position);
                    const latLngPos = proj.fromDivPixelToLatLng(new gMaps.Point(pos.x-left, pos.y-top)); // eslint-disable-line
                    that.position = callbacks.setNewPosition(latLngPos);
                    that.origin = e;
                    that.setNewBounds();
                    that.draw();
                  }
                });
            } else {
              that.isDraggable = false;
            }
          }
      );

      gMaps.event.addDomListener(elem, 'mouseup', function() { // eslint-disable-line
        map.set('draggable', true);
        this.style.cursor = 'default';
        gMaps.event.removeListener(that.moveHandler);
        that.isDraggable = false;
      });

      this.getPanes().floatPane.appendChild(elem);
    },

    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const proj = this.getProjection();

      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the elem.
      if (this.bounds !== null) {
        const sw = proj.fromLatLngToDivPixel(this.bounds.getSouthWest());
        const ne = proj.fromLatLngToDivPixel(this.bounds.getNorthEast());
        elem.style.left = `${sw.x}px`;
        elem.style.top = `${ne.y}px`;
        elem.style.width = `${(ne.x - sw.x)}px`;
      } else {
        const pos = proj.fromLatLngToDivPixel(this.position);
        elem.style.left = `${pos.x}px`;
        elem.style.top = `${pos.y}px`;
      }
      elem.style.display = 'block';
    },

    setNewBounds() {
      const proj = this.getProjection();
      const { x, y } = proj.fromLatLngToDivPixel(this.position);
      const sw = proj.fromDivPixelToLatLng(new gMaps.Point(x, y + elem.offsetHeight));
      const ne = proj.fromDivPixelToLatLng(new gMaps.Point(x + elem.offsetWidth, y));
      this.bounds = new gMaps.LatLngBounds(sw, ne);
    },

    onRemove() {
    },

    resize() {
      this.setNewBounds();
      this.draw();
    },
  });

  overlay.setMap(map);
  gMaps.event.addListener(map, 'idle', () => {
    overlay.draw();
    overlay.setNewBounds();
  });

  return overlay;
}

export default createOverlay;
