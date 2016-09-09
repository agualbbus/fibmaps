const $script_ = require('scriptjs');

export default function firebaseUILoader() {
  return new Promise((resolve, reject) => {
    $script_(
      'https://www.gstatic.com/firebasejs/ui/live/0.5/firebase-ui-auth.js',
      () => {
        if (window.fireabaseui === 'undefined') {
          reject(new Error('firabse ui not loaded'));
        } else {
          resolve(window.firebaseui);
        }
      }
    );
  });
}
