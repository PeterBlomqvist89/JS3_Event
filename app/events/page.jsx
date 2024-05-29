"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CalendarHeart, CircleDollarSign, MapPin, Ticket } from "lucide-react";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/events");

      const eventData = response.data.map((event) => {
        // Konvertera eventDate till önskat format: år, månad, dag, timmar och minuter
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
        };
      });
      setEvents(eventData);
      setLoading(false);
      console.log(eventData);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
      toast.error("Something goes wrong!!");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 flex-grow">
        <h2 className="text-6xl font-bold text-center py-14 text-blue-600">Event List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="p-6 border-2 shadow-lg cursor-pointer flex flex-col gap-4 bg-white"
            >
              <div className="flex flex-col h-full">
                <img
                  className="object-cover h-40 w-full rounded"
                  src={event.imageURL}
                  alt={event.eventName}
                />
                <h1 className="text-center uppercase font-bold text-2xl mt-4 text-blue-600 mb-4">
                  {event.eventName}
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-auto mb-2">
                  <span className="font-semibold flex gap-2"><CalendarHeart className="text-blue-600" />Date:</span> {event.eventDate}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-auto mb-2">
                  <span className="font-semibold flex gap-2"><CircleDollarSign className="text-blue-600"/>Price:</span>{event.eventPrice} :- SEK
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-auto mb-2">
                  <span className="font-semibold flex gap-2"><MapPin className="text-blue-600"/>Location:</span>{event.eventLocation}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                  <span className="font-semibold flex gap-2"><Ticket className="text-blue-600"/>Tickets Remaining:</span>{event.availableTickets}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-4 bg-gray-100 mb-20">
      </div>
    </div>
  );
}

export default EventsPage;
