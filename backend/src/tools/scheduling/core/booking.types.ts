export interface CreateBookingInput {
  requestId: string;
  resourceId: string;
  userId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  purpose: string | null;
}

export interface Booking extends CreateBookingInput {
  id: string;
}

export interface AvailableSlot {
  exactMatch: boolean;
  scheduledStart: Date;
  scheduledEnd: Date;
}
