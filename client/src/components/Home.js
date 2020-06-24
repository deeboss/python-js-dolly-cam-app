import React, { Fragment } from 'react';
import '../assets/css/styles.scss';
import Chassis from '../assets/img/chassis-outline-demo.png';
import Debug from "../assets/img/icons/debug.svg";
import FreeMove from "../assets/img/icons/free-move.svg";
import RouteEditor from "../assets/img/icons/edit-route.svg";
import LinearMode from "../assets/img/icons/linear.svg";
import DittoMode from "../assets/img/icons/ditto.svg";
import CrewMode from "../assets/img/icons/director.svg";
import SkillsLibrary from "../assets/img/icons/skills.svg";
import TuneParameters from "../assets/img/icons/tune.svg";
import Updates from "../assets/img/icons/update.svg";
import Restart from "../assets/img/icons/reload.svg";
import PowerOff from "../assets/img/icons/poweroff.svg";

import {Link} from "react-router-dom";

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
              <div className="xs-12">
                <div className="module">
                  <div className="row">
                    <div className="xs-12 md-5">
                        <div className="module__device-info flex align-items-center">
                          <div>
                            <img src={Chassis} className="img-device"/>
                            <div className="align-center">
                              <h1>MAD-II</h1>
                              <StatusIndicator/>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="xs-12 md-7">
                      <div className="module__list">
                        <h3>Operator</h3>
                        <ul>
                          <li>
                            <button>
                              <div><img src={Debug} /></div>
                              Dev tools
                            </button>
                          </li>
                          <li><button disabled="true">
                            <div><img src={FreeMove} /></div>
                            Free move
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={RouteEditor} /></div>
                            Route editor
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={LinearMode} /></div>
                            Linear mode
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={DittoMode} /></div>
                            Ditto mode
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={CrewMode} /></div>
                            Crew mode
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={SkillsLibrary} /></div>
                            Skills library
                            </button></li>
                        </ul>
                      </div>
                      <hr />
                      <div className="module__list">
                        <h3>Settings</h3>
                        <ul>
                          <li><button disabled="true">
                            <div><img src={TuneParameters} /></div>
                            Tune parameters
                            </button></li>
                          <li><button disabled="true">
                            <div><img src={Updates} /></div>
                            Check for updates
                            </button></li>
                          <li><button>
                            <div><img src={Restart} /></div>
                            Restart
                            </button></li>
                          <li><button>
                            <div><img src={PowerOff} /></div>
                            Shutdown
                            </button></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default Home;
