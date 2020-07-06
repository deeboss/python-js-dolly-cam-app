import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { VehicleContext } from '../contexts/VehicleContext';

const KeyboardControlsCanvas = () => {
    const { activeKeystroke, setActiveKeystroke }  = useContext(AppSettingsContext);
    const { moveVehicleCommandIssued, setMoveVehicleCommandIssued, handleKeyDown, handleKeyUp }  = useContext(VehicleContext);
    
    const highlightActiveKey = (target) => {
        if (activeKeystroke.key !== null) {
            if (!activeKeystroke.isReleased) {
                document.querySelectorAll("[data-keystroke='" + target + "']")[0].classList.add("active");
            } else {
                document.querySelectorAll("[data-keystroke='" + target + "']")[0].classList.remove("active");
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        highlightActiveKey(activeKeystroke.key);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [activeKeystroke.key, activeKeystroke.isReleased])

      

    return (
        <Fragment>
            <footer className="keyboard-group-container">
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} data-keystroke="+" className={`keyboard-item`}>
                        <span className="tooltip">Save new waypoint</span>
                        +
                    </div>
                    <div onKeyDown={handleKeyDown} data-keystroke="-" className={`keyboard-item`}>
                        <span className="tooltip">Delete last waypoint</span>
                        -
                    </div>
                    <div onKeyDown={handleKeyDown} data-keystroke="Delete" className={`keyboard-item`}>
                        <span className="tooltip">Delete all waypoints</span>
                        del
                    </div>
                </div>
                <div className="keyboard-group keyboard-group-row">
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="a" className={`keyboard-item`}>
                            <span className="tooltip">Go to #1</span>
                            A
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="s" className={`keyboard-item`}>
                            <span className="tooltip">Go to #2</span>
                            S
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="d" className={`keyboard-item`}>
                            <span className="tooltip">Go to #3</span>
                            D
                        </div>
                    </div>
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="z" className={`keyboard-item`}>
                            <span className="tooltip">Save #1</span>
                            Z
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="x" className={`keyboard-item`}>
                            <span className="tooltip">Save #2</span>
                            X
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="c" className={`keyboard-item`}>
                            <span className="tooltip">Save #3</span>
                            C
                        </div>
                    </div>
                </div>
                <div className="keyboard-group keyboard-group-row">
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowUp" className={`keyboard-item`}>
                            <span className="tooltip">Move forwards</span>
                            ↑
                        </div>
                    </div>
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowLeft" className={`keyboard-item`}>
                            <span className="tooltip">Turn left</span>
                            ←
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowDown" className={`keyboard-item`}>
                            <span className="tooltip">Move backwards</span>
                            ↓
                        </div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowRight" className={`keyboard-item`}>
                            <span className="tooltip">Turn right</span>
                            →
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default KeyboardControlsCanvas;