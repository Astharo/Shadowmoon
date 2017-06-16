import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shadowmoon from '../dist/shadowmoon';

import { appKey } from './config/config';
import styleTemplate from './config/template.json';

class App extends Component {
  constructor(props) {
    super(props);

    this._onMapLoad = this._onMapLoad.bind(this);
  }

  render() {
    return (
      <Shadowmoon
        appKey={appKey}
        styleTemplate={styleTemplate}
      />
    );
  }
}

const MapApp = App;

ReactDOM.render(<MapApp />, document.querySelector('#root'));
