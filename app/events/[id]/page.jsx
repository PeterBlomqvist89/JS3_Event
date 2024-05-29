'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${id}`);
        setEvent(response.data);
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
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="flex h-[60vh] justify-center items-center  bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex flex-col md:flex-row">
        <div className="flex-1 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">{event.eventName}</h1>
          <p className="text-lg mb-2"><span className="font-semibold">Date:</span> {formatDate(event.eventDate)}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Description:</span> {event.eventDescription}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Location:</span> {event.eventLocation}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Price:</span> {event.eventPrice} SEK</p>
          <p className="text-lg mb-4"><span className="font-semibold">Tickets remaining:</span> {event.eventQuantity}</p>
          <Link href={`/admin/events/${id}`}>
            <Button className="w-full py-3 text-lg font-bold text-white bg-blue-600 rounded-lg transform transition-transform duration-200 hover:scale-105 active:bg-blue-700">
              Book Event
            </Button>
          </Link>
        </div>
        <div className="flex-shrink-0 md:w-1/2">
          <img
            src={event.imageURL}
            alt={event.eventName}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
