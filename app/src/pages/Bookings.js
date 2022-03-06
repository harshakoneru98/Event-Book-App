import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

const QUERY_ALL_BOOKINGS = gql`
    query GetAllBookings {
        bookings {
            _id
            createdAt
            event {
                _id
                title
                date
            }
        }
    }
`;

function BookingsPage() {
    let contextType = useContext(AuthContext);
    const {
        data: bookingsData,
        loading: bookingsLoading,
        error: bookingsError,
        refetch
    } = useQuery(QUERY_ALL_BOOKINGS);

    // Error Console
    if (bookingsError) {
        console.log(bookingsError);
    }

    return (
        <React.Fragment>
            {bookingsLoading ? (
                <Spinner />
            ) : (
                <ul>
                    {bookingsData?.bookings?.map((booking) => (
                        <li key={booking._id}>
                            {booking.event.title} -{' '}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
}

export default BookingsPage;
