import React, { useState } from 'react';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/Modal';
import './Events.css';

function EventsPage() {
    const [creating, setCreating] = useState(false);

    let startCreateEventHandler = () => {
        setCreating(true);
    };

    let modalConfirmHandler = () => {
        setCreating(false);
    };

    let modalCancelHandler = () => {
        setCreating(false);
    };
    return (
        <React.Fragment>
            {creating && <Backdrop />}
            {creating && (
                <Modal
                    title="Add Event"
                    canCancel
                    canConfirm
                    onCancel={modalCancelHandler}
                    onConfirm={modalConfirmHandler}
                >
                    <p>Modal Content</p>
                </Modal>
            )}
            <div className="events-control">
                <p>Share your own Events!</p>
                <button className="btn" onClick={startCreateEventHandler}>
                    Create Event
                </button>
            </div>
        </React.Fragment>
    );
}

export default EventsPage;
