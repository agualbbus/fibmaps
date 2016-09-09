require('./content/index.html');

// Vendor
import 'bootstrap/dist/css/bootstrap.min';
import 'font-awesome/css/font-awesome.min';
import 'style/index';

// ready to go
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import initFirebase from 'lib/initFirebase';

ReactDOM.render(<App />, document.getElementById('root'));
