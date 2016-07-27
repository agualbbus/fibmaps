require('./content/index.html');

// Vendor
import 'foundation-sites/dist/foundation.min.css';
import 'style/index';

// ready to go
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
