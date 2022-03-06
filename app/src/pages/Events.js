import React, { useState, useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import './Events.css';

const QUERY_ALL_EVENTS = gql`
    query GetAllEvents {
        events {
            _id
            title
            description
            date
            price
            creator {
                _id
                email
            }
        }
    }
`;

const CREATE_EVENT_MUTATION = gql`
    mutation ($eventInput: EventInput) {
        createEvent(eventInput: $eventInput) {
            _id
            title
            description
            date
            price
            creator {
                _id
                email
            }
        }
    }
`;

function EventsPage() {
    const [creating, setCreating] = useState(false);

    // Event Inputs
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    let contextType = useContext(AuthContext);

    const {
        data: eventsData,
        error: eventsError,
        refetch
    } = useQuery(QUERY_ALL_EVENTS);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    let startCreateEventHandler = () => {
        setCreating(true);
    };

    let modalConfirmHandler = async () => {
        setCreating(false);
        if (
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            console.log('Wrong Inputs');
        } else {
            await createEvent({
                variables: {
                    eventInput: {
                        title,
                        description,
                        date,
                        price: parseFloat(price)
                    }
                }
            })
                .then((data) => {
                    refetch();
                })
                .catch((err) => {
                    console.log(err);
                });
            setTitle('');
            setPrice('');
            setDate('');
            setDescription('');
        }
    };

    let modalCancelHandler = () => {
        setCreating(false);
    };

    // Error Console
    if (eventsError) {
        console.log(eventsError);
    }

    let eventList = eventsData?.events?.map((event) => {
        return (
            <li key={event._id} className="events__list-item">
                {event.title}
            </li>
        );
    });

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
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                value={title}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                value={price}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input
                                type="datetime-local"
                                id="date"
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                                value={date}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="4"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                value={description}
                            />
                        </div>
                    </form>
                </Modal>
            )}
            {contextType.token && (
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn" onClick={startCreateEventHandler}>
                        Create Event
                    </button>
                </div>
            )}
            <ul className="events__list">{eventList}</ul>
        </React.Fragment>
    );
}

export default EventsPage;
