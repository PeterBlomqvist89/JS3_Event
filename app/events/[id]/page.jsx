'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getAuth } from 'firebase/auth';
import { CalendarHeart, CircleDollarSign, MapPin, Ticket, TicketSlash } from 'lucide-react';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${id}`);
        setEvent(response.data);
        // Check if the user is already booked for the event
        setIsBooked(response.data.users && response.data.users.includes(userId));
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const bookEvent = async () => {
    setBookingLoading(true);
    setBookingMessage('');
    try {
      const response = await axios.patch(`http://localhost:3001/api/events/${id}`, {
        user: userId,
      });
      setIsBooked(true);
      setBookingMessage(response.data.message);

      // Uppdatera eventets tillgängliga biljetter efter bokning
    setEvent(prevEvent => ({
      ...prevEvent,
      availableTickets: prevEvent.availableTickets - 1
    }));
    } catch (error) {
      setBookingMessage('Failed to book the event');
      console.error('Error booking event:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  const cancelBooking = async () => {
    setBookingLoading(true);
    setBookingMessage('');
    try {
      const response = await axios.patch(`http://localhost:3001/api/events/${id}`, {
        user: userId,
        cancel: true,
      });
      setIsBooked(false);
      setBookingMessage(response.data.message);

      setEvent(prevEvent => ({
        ...prevEvent,
        availableTickets: prevEvent.availableTickets + 1
      }));
    } catch (error) {
      setBookingMessage('Failed to cancel booking');
      console.error('Error canceling booking:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="flex m-10 justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex flex-col md:flex-row">
        <div className="flex-1 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">{event.eventName}</h1>
          <p className="text-lg mb-2 flex gap-2"><CalendarHeart className="text-blue-600 size-8" /><span className="font-semibold">Date:</span> {formatDate(event.eventDate)}</p>
          <p className="text-lg mb-2 flex gap-2"><span className="font-semibold truncate">Description:</span> {event.eventDescription}</p>
          <p className="text-lg mb-2 flex gap-2"><MapPin className="text-blue-600 size-8"/><span className="font-semibold">Location:</span> {event.eventLocation}</p>
          <p className="text-lg mb-2 flex gap-2"><CircleDollarSign className="text-blue-600 size-8"/><span className="font-semibold">Price:</span> {event.eventPrice} :- SEK</p>
          <p className="text-lg mb-4 flex gap-2"><Ticket className="text-blue-600 size-8"/><span className="font-semibold">Tickets Total:</span> {event.eventQuantity}</p>
          <p className="text-lg mb-4 flex gap-2"><TicketSlash className="text-blue-600 size-8"/><span className="font-semibold">Tickets remaining:</span> {event.availableTickets}</p>
          {isBooked ? (
            <Button
              onClick={cancelBooking}
              className="w-full py-3 text-lg font-bold text-white bg-red-600 rounded-lg transform transition-transform duration-200 active:bg-red-700 hover:bg-red-700"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Canceling...' : 'Cancel Booking'}
            </Button>
          ) : (
            <Button
              onClick={bookEvent}
              className="w-full py-3 text-lg font-bold text-white bg-blue-600 rounded-lg transform transition-transform duration-200 active:bg-blue-700 hover:bg-blue-700"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Book Event'}
            </Button>
          )}
          {bookingMessage && <p className="mt-4 text-center">{bookingMessage}</p>}
        </div>
        <div className="flex-shrink-0 md:w-1/2">
          <img
            src={event.imageURL}
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
