import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const KeyboardControlsCanvas = () => {
    const { activeKeystroke, setActiveKeystroke, handleKeyDown, handleKeyUp }  = useContext(AppSettingsContext);
    
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
    }, [activeKeystroke.key, activeKeystroke.isReleased])

      

    return (
        <Fragment>
            <footer className="keyboard-group-container">
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} data-keystroke="r" className={`keyboard-item`}>R</div>
                    <div onKeyDown={handleKeyDown} data-keystroke="Escape" className={`keyboard-item`}>esc</div>
                </div>
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} data-keystroke="z" className={`keyboard-item`}>Z</div>
                    <div onKeyDown={handleKeyDown} data-keystroke="x" className={`keyboard-item`}>X</div>
                    <div onKeyDown={handleKeyDown} data-keystroke="c" className={`keyboard-item`}>C</div>
                </div>
                <div className="keyboard-group direction-keys">
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowUp" className={`keyboard-item`}>↑</div>
                    </div>
                    <div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowLeft" className={`keyboard-item`}>←</div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowDown" className={`keyboard-item`}>↓</div>
                        <div onKeyDown={handleKeyDown} data-keystroke="ArrowRight" className={`keyboard-item`}>→</div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default KeyboardControlsCanvas;