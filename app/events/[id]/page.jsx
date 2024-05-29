import { Button } from "@/components/ui/button";
import Link from "next/link";

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const DetailEventPage = ({event}) => {

  'use client'


  const [event, setEvent] = useState({})
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${event.id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
  }, [id])



  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-1/3 flex flex-col ">
        <h1  className="text-4xl text-center mb-8 ">{event?.eventName}</h1>
        <p className="mb-1">Date: {event?.eventDate?.toDate().toLocaleDateString('en-GB')}</p>
        <p className="mb-1">Description: {event?.eventDescription}</p>
        <p className="mb-1">Location: {event?.eventLocation}</p>
        <p className="mb-1">Price: {event?.eventPrice}</p>
        <p className="mb-5">Tickets remaining: {event?.eventQuantity}</p>
        <img src={event?.imageURL} alt={event?.eventName} className="rounded-3xl w-full object-cover mx-auto max-w-52"/>

        {/* <Link href={`/admin/events/${params.id}`} as={`/admin/events/${params.id}`}>
          <Button className="w-full mt-5 bg-slate-100/50 transform transition-transform duration-200 hover:scale-105 active:bg-green-500">
            Book Event
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default DetailEventPage;
