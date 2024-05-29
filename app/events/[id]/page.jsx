'use client'
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
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-1/3 flex flex-col">
        <h1 className="text-4xl text-center mb-8">{event.eventName}</h1>
        <p className="mb-1">Date: {formatDate(event.eventDate)}</p>
        <p className="mb-1">Description: {event.eventDescription}</p>
        <p className="mb-1">Location: {event.eventLocation}</p>
        <p className="mb-1">Price: {event.eventPrice} SEK</p>
        <p className="mb-5">Tickets remaining: {event.eventQuantity}</p>
        <img
          src={event.imageURL}
          alt={event.eventName}
          className="rounded-3xl w-full object-cover mx-auto max-w-52"
        />
        <Link href={`/admin/events/${id}`}>
          <Button className="w-full mt-5 bg-slate-100/50 transform transition-transform duration-200 hover:scale-105 active:bg-green-500">
            Book Event
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetailPage;
