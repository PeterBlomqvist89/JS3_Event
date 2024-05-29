"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/events");

      const eventData = response.data.map((event) => {
        return {
          ...event,
          eventDate: new Date(event.eventDate?.seconds * 1000).toLocaleString(),
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
    <div className="container mx-auto px-4 mb-40">
      <h2 className="text-6xl font-bold text-center font-mono py-14">
        Event List
      </h2>
      <div className="grid grid-cols-3 gap-10">
        {events.map((event) => (
          <div className="max-h-96" key={event.id}>
            <Link event={event}
              key={event.id}
              href={`/events/${event.id}`}
              className="p-6 rounded-lg border-2 shadow-lg cursor-pointer pb flex flex-col gap-4"
            >
              <h1 className=" text-center uppercase font-bold text-2xl">{event.eventName}</h1>
              <img className="object-cover max-h-40 max-w-60 rounded mx-auto"
                src={event.imageURL}
                alt={event.eventName}
              />
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Date:</span> {event.eventDate}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Price:</span>{event.eventPrice}
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Location:</span>{event.eventLocation}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
