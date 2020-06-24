import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const KeyboardControlsCanvas = () => {
    const { status }  = useContext(AppSettingsContext);


    function handleKeyDown(e) {

        switch(e.key) {
            case "ArrowUp":
                console.log("ArrowUp!");
                break;
            case "ArrowDown":
                console.log("ArrowDown!");
                break;
            case "ArrowLeft":
                console.log("ArrowLeft!");
                break;
            case "ArrowRight":
                console.log("ArrowRight!");
                break;

            case "Escape":
                console.log("Escape!");
                break;

            case "z":
                console.log("z");
                break;

            case "x":
                console.log("x");
                break;

            case "c":
                console.log("c");
                break;

            case "r":
                console.log("r");
                break;
                
            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, [])
      

    return (
        <Fragment>
            <footer className="keyboard-group-container">
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} id="keystrokeR" name="keystrokeR" className="keyboard-item">R</div>
                    <div onKeyDown={handleKeyDown} id="keystrokeEscape" name="keystrokeEscape" className="keyboard-item">esc</div>
                </div>
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} id="keystrokeZ" name="keystrokeZ" className="keyboard-item">Z</div>
                    <div onKeyDown={handleKeyDown} id="keystrokeX" name="keystrokeX" className="keyboard-item">X</div>
                    <div onKeyDown={handleKeyDown} id="keystrokeC" name="keystrokeC" className="keyboard-item">C</div>
                </div>
                <div className="keyboard-group direction-keys">
                    <div>
                        <div onKeyDown={handleKeyDown} id="keystrokeArrowUp" name="keystrokeArrowUp" className="keyboard-item">↑</div>
                    </div>
                    <div>
                        <div onKeyDown={handleKeyDown} id="keystrokeArrowLeft" name="keystrokeArrowLeft" className="keyboard-item">←</div>
                        <div onKeyDown={handleKeyDown} id="keystrokeArrowDown" name="keystrokeArrowDown" className="keyboard-item">↓</div>
                        <div onKeyDown={handleKeyDown} id="keystrokeArrowRight" name="keystrokeArrowRight" className="keyboard-item">→</div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default KeyboardControlsCanvas;