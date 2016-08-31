import { goldenRectangulesModel } from 'models';
import { mapModel } from 'models';

function createOverlay(id, elem, options) {
  const map = mapModel.mapInstance;
  const overlay = Object.assign(new window.google.maps.OverlayView(), {
    bounds: null,
    position: map.getCenter(),
    onAdd() {
      const that = this;
      elem.draggable = true;

      window.google.maps.event.addDomListener(
        map.getDiv(),
        'mouseleave',
        () => {
          window.google.maps.event.trigger(elem, 'mouseup');
        }
      );

      window.google.maps.event.addDomListener(
          elem,
          'mousedown',
          function(e) { // eslint-disable-line
            options.makeActiveCb();
            if (options.isLockedCb() === false) {
              this.style.cursor = 'move';
              map.set('draggable', false);
              that.origin = e;

              that.moveHandler = window.google.maps.event.addDomListener(
                map.getDiv(),
                'mousemove',
                function(e) { // eslint-disable-line
                  const proj = that.getProjection();
                  const left = that.origin.clientX-e.clientX; // eslint-disable-line
                  const top = that.origin.clientY-e.clientY; // eslint-disable-line
                  const pos = proj.fromLatLngToDivPixel(that.position);
                  const latLngPos = proj.fromDivPixelToLatLng(new window.google.maps.Point(pos.x-left, pos.y-top)); // eslint-disable-line
                  that.position = latLngPos;
                  that.origin = e;
                  that.setNewBounds();
                  that.draw();
                });
            }
          }
      );

      window.google.maps.event.addDomListener(elem, 'mouseup', function() { // eslint-disable-line
        map.set('draggable', true);
        this.style.cursor = 'default';
        window.google.maps.event.removeListener(that.moveHandler);
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
        // console.log(position , elem.style.left , elem.style.top, elem.style.width  )
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
      const sw = proj.fromDivPixelToLatLng(new window.google.maps.Point(x, y + elem.offsetHeight));
      const ne = proj.fromDivPixelToLatLng(new window.google.maps.Point(x + elem.offsetWidth, y));
      this.bounds = new window.google.maps.LatLngBounds(sw, ne);
    },

    onRemove() {
      goldenRectangulesModel.removeRectangule(id);
    },

    resize() {
      this.setNewBounds();
      this.draw();
    },
  });

  overlay.setMap(map);
  window.google.maps.event.addListener(map, 'idle', () => {
    overlay.draw();
    overlay.setNewBounds();
  });

  return overlay;
}

export default createOverlay;
