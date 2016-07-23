require('./content/index.html');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('foundation-sites!./foundation.config.js');

ReactDOM.render(<App />, document.getElementById('root'));
