"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";

import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDetailsMutation } from "@/api/rtkApi";

const schema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventDescription: z.string().min(1, "Event description is required"),
  eventHandledBy: z.string().min(1, "Handler is required"),
  eventOrganization: z.string().min(1, "Organization is required"),
  totalSubEvents: z.number().min(1, "Total sub-events are required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type formFields = z.infer<typeof schema>;

export default function UserForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const [addEvent] = useAddDetailsMutation();

  const onSubmit: SubmitHandler<formFields> = (data) => {
    addEvent({ ...data });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input
          {...register("eventName")}
          type="text"
          placeholder="Enter event name"
        />
        {errors.eventName && (
          <div className="text-destructive">{errors.eventName.message}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateRange">Enter Event Start Date - End Date</Label>
        <DatePickerWithRange
          setDate={(range) => {
            setValue("startDate", range?.from?.toISOString() ?? "");
            setValue("endDate", range?.to?.toISOString() ?? "");
          }}
        />
        {(errors.startDate || errors.endDate) && (
          <div className="text-destructive">Date range is required</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventDescription">Event Description</Label>
        <Textarea
          {...register("eventDescription")}
          placeholder="Enter Event Description"
        />
        {errors.eventDescription && (
          <div className="text-destructive">
            {errors.eventDescription.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventHandledBy">Event handled by</Label>
        <Input
          {...register("eventHandledBy")}
          type="text"
          placeholder="Event Handled by..."
        />
        {errors.eventHandledBy && (
          <div className="text-destructive">
            {errors.eventHandledBy.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventOrganization">Event Organisation</Label>
        <Input
          type="text"
          {...register("eventOrganization")}
          placeholder="Enter Event Organization"
        />
        {errors.eventOrganization && (
          <div className="text-destructive">
            {errors.eventOrganization.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="totalSubEvents">Total number of sub-events</Label>
        <Input
          type="number"
          {...register("totalSubEvents", {
            valueAsNumber: true,
          })}
          placeholder="Enter number of Sub-Events"
        />
        {errors.totalSubEvents && (
          <div className="text-destructive">
            {errors.totalSubEvents.message}
          </div>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function DatePickerWithRange({
  setDate,
}: {
  setDate: (range: DateRange | undefined) => void;
}) {
  const [date, setDateState] = React.useState<DateRange | undefined>();

  const handleSelect = (range: DateRange | undefined) => {
    setDateState(range);
    setDate(range);
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
