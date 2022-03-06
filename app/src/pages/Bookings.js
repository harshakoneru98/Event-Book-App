import React, { useEffect, useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';
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

const DELETE_BOOKING_MUTATION = gql`
    mutation ($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId) {
            _id
            title
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

    const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION);

    useEffect(() => {
        refetch();
    }, []);

    let deleteBookingHandler = (bookingId) => {
        deleteBooking({
            variables: {
                bookingId: bookingId
            }
        })
            .then((data) => {
                refetch();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Error Console
    if (bookingsError) {
        console.log(bookingsError);
    }

    return (
        <React.Fragment>
            {bookingsLoading ? (
                <Spinner />
            ) : (
                <BookingList
                    bookings={bookingsData?.bookings}
                    onDelete={deleteBookingHandler}
                />
            )}
        </React.Fragment>
    );
}

export default BookingsPage;
