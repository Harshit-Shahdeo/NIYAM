export interface CreateBookingInput {
    requestId: string;
    resourceId: string;
    userId: string;
    date: string;
    start: string;
    end: string;
    purpose?: string;
}
export interface Booking extends CreateBookingInput {
    id: string;
}
