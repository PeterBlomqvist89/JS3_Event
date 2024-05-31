'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CalendarHeart, CircleDollarSign, MapPin, Ticket } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ROUTE);

      const eventData = response.data.map((event) => {
        const eventDateTime = new Date(event.eventDate.seconds * 1000);
        const formattedEventDate = eventDateTime.toLocaleString('sv-SE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        return {
          ...event,
          eventDate: formattedEventDate,
          eventDateTime // Add eventDateTime for sorting and filtering purposes
        };
      });

      // Filter out old events and sort events by date with nearest date first
      const now = new Date();
      const validEvents = eventData.filter(event => new Date(event.eventDateTime) >= now);
      validEvents.sort((a, b) => new Date(a.eventDateTime) - new Date(b.eventDateTime));

      setEvents(validEvents);
      setLoading(false);
    } catch (err) {
      console.log('Error', err);
      setLoading(false);
      toast.error('Something goes wrong!!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filterEvents = (events) => {
    return events.filter(event => {
      const eventDate = new Date(event.eventDateTime);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const isWithinDateRange = (!start || eventDate >= start) && (!end || eventDate <= end);
      const isAtLocation = !location || event.eventLocation.toLowerCase().includes(location.toLowerCase());

      return isWithinDateRange && isAtLocation;
    });
  };

  const filteredEvents = filterEvents(events);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative h-80 bg-cover bg-center bg-fixed mb-20" style={{ backgroundImage: "url('/images/header.jpg')" }}>
        <h2 className="absolute inset-0 flex justify-center items-center text-6xl font-bold text-white">Events List</h2>
      </div>

      <div className="container mx-auto px-4 flex-grow">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="relative p-6 border-2 shadow-lg cursor-pointer flex flex-col gap-4 bg-white"
            >
              <div className="flex flex-col h-full relative">
                <img
                  className="object-cover h-40 w-full rounded"
                  src={event.imageURL}
                  alt={event.eventName}
                />
                {event.availableTickets === 0 && (
                  <img
                    src="/images/fullyBooked.png"
                    alt="Fully Booked"
                    className="absolute top-[22%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-24"
                  />
                )}
                <h1 className="text-center uppercase font-bold text-2xl mt-4 text-blue-600 mb-4">
                  {event.eventName}
                </h1>
                <p className="text-sm text-muted-foreground flex text-center items-center gap-2 mt-auto mb-3 justify-between border-b">
                  <span className="font-semibold text-center flex gap-2">
                    <CalendarHeart className="text-blue-600 -mt-0.5" />
                    Date:
                  </span>
                  {event.eventDate}
                </p>
                <p className="text-sm text-muted-foreground flex text-center items-center gap-2 mt-auto mb-3 justify-between border-b">
                  <span className="font-semibold text-center flex gap-2">
                    <CircleDollarSign className="text-blue-600 -mt-0.5" />
                    Price:
                  </span>
                  {event.eventPrice} :- SEK
                </p>
                <p className="text-sm text-muted-foreground flex text-center items-center gap-2 mt-auto mb-3 justify-between border-b">
                  <span className="font-semibold text-center flex gap-2">
                    <MapPin className="text-blue-600 -mt-0.5" />
                    Location:
                  </span>
                  {event.eventLocation}
                </p>
                <p className={event.availableTickets === 0 ? "text-sm text-muted-foreground flex text-center items-center gap-2 mb-3 justify-between border-b text-red-600 -mt-0.5 line-through" : "text-sm text-muted-foreground flex text-center items-center gap-2 mb-3 justify-between border-b"}>
                  <span className="font-semibold text-center flex gap-2">
                    <Ticket className={event.availableTickets === 0 ? "text-red-600 -mt-0.5 line-through" : "text-green-600 -mt-0.5"} />
                    Tickets Remaining:
                  </span>
                  <span className={event.availableTickets === 0 ? "text-red-600 font-semibold line-through" : "text-green-600 font-semibold"}>{event.availableTickets}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-4 bg-gray-100 mb-20"></div>
    </div>
  );
}

export default EventsPage;
