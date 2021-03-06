import React, { Fragment, useContext } from 'react';
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
import ServerConnection from "../assets/img/icons/server-connection.svg";
import Blink from "../assets/img/icons/blink.svg";
import Restart from "../assets/img/icons/reload.svg";
import PowerOff from "../assets/img/icons/poweroff.svg";

import {Link} from "react-router-dom";

import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { VehicleContext } from '../contexts/VehicleContext';
import StatusBar from './Status/StatusBar';
import StatusIndicator from "./Status/StatusIndicator";
import DeviceControls from './DeviceControls';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';

function Home() {
  const { blinkLed, testSocketConnection } = useContext(AppSettingsContext);
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
                            <img alt="" src={Chassis} className="img-device"/>
                            <div className="align-center">
                              <h1>MAD-II</h1>
                              <StatusIndicator/>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="xs-12 md-7">
                      <div className="left-spacer">
                        <div className="module__list">
                          {/* <h3>Operator</h3> */}
                          <ul>
                            <li>
                              <Link to="/dev">
                                <button>
                                  <div><img alt="" src={Debug} /></div>
                                  Dev tools
                                </button>
                              </Link>
                            </li>
                            <li><button disabled={true}>
                              <div><img alt="" src={FreeMove} /></div>
                              <span>Free move</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={LinearMode} /></div>
                              <span>Linear mode</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={RouteEditor} /></div>
                              <span>Route editor</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={DittoMode} /></div>
                              <span>Ditto mode</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={CrewMode} /></div>
                              <span>Crew mode</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={SkillsLibrary} /></div>
                              <span>Skills library</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={TuneParameters} /></div>
                              <span>Tune parameters</span>
                              </button></li>
                            <li><button disabled={true}>
                              <div><img alt="" src={Updates} /></div>
                              <span>Check for updates</span>
                              </button></li>
                          </ul>
                          <ul>
                            <li><button onClick={blinkLed}>
                              <div><img alt="" src={Blink} /></div>
                              Make Pi blink
                              </button></li>
                            <li><button onClick={testSocketConnection}>
                              <div><img alt="" src={ServerConnection} /></div>
                              Test socket connection
                              </button></li>
                            <li><button>
                              <div><img alt="" src={Restart} /></div>
                              Restart
                              </button></li>
                            <li><button>
                              <div><img alt="" src={PowerOff} /></div>
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
        </div>
    </Fragment>
  );
}

export default Home;
