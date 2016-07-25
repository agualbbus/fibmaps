require('./content/index.html');

// Vendor
import 'foundation-sites/dist/foundation.min.css';
import 'babel!foundation-sites/js/foundation.core';
import 'babel!foundation-sites/js/foundation.util.mediaQuery';


// ready to go
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));
