import { PrismaService } from '../../../database/prisma.service';
import { AvailableSlot, Booking, CreateBookingInput } from './booking.types';
export declare class SchedulingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findNextAvailableSlot(resourceId: string, requestedStart: Date, requestedEnd: Date): Promise<AvailableSlot>;
    checkAvailability(resourceId: string, requestedStart: Date, requestedEnd: Date): Promise<boolean>;
    createBooking(input: CreateBookingInput): Promise<Booking>;
    getBookings(): Promise<Booking[]>;
    private validateTimeRange;
}
