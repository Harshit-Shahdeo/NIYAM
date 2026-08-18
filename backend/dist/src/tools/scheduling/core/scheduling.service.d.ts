import { PrismaService } from '../../../database/prisma.service';
import { Booking, CreateBookingInput } from './booking.types';
export declare class SchedulingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkAvailability(resourceId: string, date: string, start: string, end: string): Promise<boolean>;
    createBooking(input: CreateBookingInput): Promise<Booking>;
    getBookings(): Promise<Booking[]>;
    private toDateOnly;
    private toDateTime;
    private formatDate;
    private formatTime;
    private validateTimeRange;
}
