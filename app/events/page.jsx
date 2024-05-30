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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('date'); // Default sort by date

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

      setEvents(eventData);
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

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const filterOldEvents = (events) => {
    const now = new Date();
    return events.filter(event => new Date(event.eventDateTime) >= now);
  };

  const sortEvents = (events) => {
    switch (sortType) {
      case 'date':
        return events.sort((a, b) => new Date(a.eventDateTime) - new Date(b.eventDateTime));
      case 'location':
        return events.sort((a, b) => a.eventLocation.localeCompare(b.eventLocation));
      default:
        return events;
    }
  };

  const filteredAndSortedEvents = sortEvents(filterOldEvents(events));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative h-80 bg-cover bg-center bg-fixed mb-20" style={{ backgroundImage: "url('/images/header.jpg')" }}>
        <h2 className="absolute inset-0 flex justify-center items-center text-6xl font-bold text-white">Events List</h2>
      </div>

      <div className="container mx-auto px-4 flex-grow">
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-28 font-semibold h-12  border rounded-xl bg-blue-500 text-white flex justify-center text-center items-center">Sort By</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSortChange('date')}>Date</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('location')}>Location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map((event) => (
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
                    <Ticket className={event.availableTickets === 0 ? "text-red-600 -mt-0.5 line-through" : "text-blue-600 -mt-0.5"} />
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
