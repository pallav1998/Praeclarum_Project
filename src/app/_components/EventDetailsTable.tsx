"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDetailsQuery } from "@/api/rtkApi";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";

export default function EventDetailsTable() {
  const { data: eventDetails, isLoading } = useGetDetailsQuery({});

  if (eventDetails?.length === 0) return <p>No Event Details Found</p>;

  return (
    <Fragment>
      {isLoading ? (
        <Loader2 className="size-24 animate-spin m-auto" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>HandledBy</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Sub-Events</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventDetails?.map((event: any) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventDescription}</TableCell>
                <TableCell>{event.eventHandledBy}</TableCell>
                <TableCell>{event.eventOrganization}</TableCell>
                <TableCell>{event.totalSubEvents}</TableCell>
                <TableCell>{event.startDate}</TableCell>
                <TableCell>{event.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Fragment>
  );
}
