const $script_ = require('scriptjs');

// TODO add libraries language and other map options
export default function googleMapLoader(bootstrapURLKeys) {
  const loadPromise_ = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('google map cannot be loaded outside browser env'));
      return;
    }

    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    if (typeof window._$_google_map_initialize_$_ !== 'undefined') {
      reject(new Error('google map initialization error'));
    }

    window._$_google_map_initialize_$_ = () => {
      delete window._$_google_map_initialize_$_;
      resolve(window.google.maps);
    };

    if (process.env.NODE_ENV !== 'production') {
      if (Object.keys(bootstrapURLKeys).indexOf('callback') > -1) {
        console.error('"callback" key in bootstrapURLKeys is not allowed, ' + // eslint-disable-line
                      'use onGoogleApiLoaded property instead');
        throw new Error('"callback" key in bootstrapURLKeys is not allowed, ' +
                        'use onGoogleApiLoaded property instead');
      }
    }

    const queryString = Object.keys(bootstrapURLKeys)
      .reduce(
        (r, key) => `${r}&${key}=${bootstrapURLKeys[key]}`,
        ''
      );

    $script_(
      `https://maps.googleapis.com/maps/api/js?callback=_$_google_map_initialize_$_${queryString}`,
      () =>
        typeof window.google === 'undefined' &&
          reject(new Error('google map initialization error (not loaded)'))
    );
  });

  return loadPromise_;
}
