import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const KeyboardControlsCanvas = () => {
    const { activeKeystroke, setActiveKeystroke, handleKeyDown, handleKeyUp }  = useContext(AppSettingsContext);
    
    const highlightActiveKey = (target) => {
        const highlightedKey = "keystroke-" + target;
        if (activeKeystroke.key === null) {
            console.log('do nothing');
        } else {
            // if (!activeKeystroke.isReleased) {
            //     console.log(document.getElementById(highlightedKey).classList.add('active'));
            // } else {
            //     console.log(document.getElementById(highlightedKey).classList.remove('active'));
            // }
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
                    <div onKeyDown={handleKeyDown} id="keystroke-R" name="keystroke-R" className={`keyboard-item`}>R</div>
                    <div onKeyDown={handleKeyDown} id="keystroke-Escape" name="keystroke-Escape" className={`keyboard-item`}>esc</div>
                </div>
                <div className="keyboard-group">
                    <div onKeyDown={handleKeyDown} id="keystroke-Z" name="keystroke-Z" className={`keyboard-item`}>Z</div>
                    <div onKeyDown={handleKeyDown} id="keystroke-X" name="keystroke-X" className={`keyboard-item`}>X</div>
                    <div onKeyDown={handleKeyDown} id="keystroke-C" name="keystroke-C" className={`keyboard-item`}>C</div>
                </div>
                <div className="keyboard-group direction-keys">
                    <div>
                        <div onKeyDown={handleKeyDown} id="keystroke-ArrowUp" name="keystroke-ArrowUp" className={`keyboard-item`}>↑</div>
                    </div>
                    <div>
                        <div onKeyDown={handleKeyDown} id="keystroke-ArrowLeft" name="keystroke-ArrowLeft" className={`keyboard-item`}>←</div>
                        <div onKeyDown={handleKeyDown} id="keystroke-ArrowDown" name="keystroke-ArrowDown" className={`keyboard-item`}>↓</div>
                        <div onKeyDown={handleKeyDown} id="keystroke-ArrowRight" name="keystroke-ArrowRight" className={`keyboard-item`}>→</div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default KeyboardControlsCanvas;