import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../assets/css/styles.scss';
import { VehicleContext } from '../contexts/VehicleContext';

const Drawer = ({}) => {
    const { selectedWaypoint, deleteWaypoint }  = useContext(VehicleContext);

    useEffect(()=>{
        console.log(selectedWaypoint);

        return () => {}
    }, [selectedWaypoint])

    const handleDeleteSelectedWaypoint = (e) => {
        deleteWaypoint({"id": selectedWaypoint.id.toString()});
    }

    return (
        <Fragment>
            <div className={Object.keys(selectedWaypoint).length !== 0 ? "drawer expand" : "drawer"}>
                <div className="drawer-content">
                    <h3>{selectedWaypoint.name}</h3>
                    <div><small>ID: {selectedWaypoint.id}</small></div>
                    {
                        selectedWaypoint.position && <div>{selectedWaypoint.position.steps_taken}</div>
                    }
                    <button onClick={handleDeleteSelectedWaypoint}>Delete this waypoint</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;