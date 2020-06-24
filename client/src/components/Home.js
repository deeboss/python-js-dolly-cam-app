import React, { Fragment } from 'react';
import '../assets/css/styles.scss';

import { AppSettingsContext } from '../contexts/AppSettingsContext';
import StatusBar from './Status/StatusBar';
import StatusIndicator from "./Status/StatusIndicator";
import DeviceControls from './DeviceControls';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';

function Home() {
  return (
    <Fragment>
      <StatusBar/>
      <div className="wrapper">
        <div className="app-container">
          <div className="row">
              <div className="xs-4">
                <div className="module">
                  MAD II
                  <StatusIndicator/>
                </div>
              </div>
              <div className="xs-8">
                <div className="module">Test</div>
              </div>
          </div>
          <div className="row">
            <div className="xs-12">
              <DeviceControls/>
            </div>
          </div>
          </div>
        </div>
    </Fragment>
  );
}

export default Home;
