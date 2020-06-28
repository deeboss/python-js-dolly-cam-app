import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { VehicleContext } from '../contexts/VehicleContext';

const Drawer = ({}) => {
    const { selectedWaypoint }  = useContext(VehicleContext);

    useEffect(()=>{
        console.log(selectedWaypoint);

        return () => {}
    }, [selectedWaypoint])

    return (
        <Fragment>
            <div className="drawer">
                <div className={Object.keys(selectedWaypoint).length !== 0 ? "drawer-content expand" : "drawer-content"}>
                    <h3>{selectedWaypoint.name}</h3>
                    <div>{selectedWaypoint.id}</div>
                    {
                        selectedWaypoint.position && <div>{selectedWaypoint.position.steps_taken}</div>
                    }
                    <button>Delete this waypoint</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;