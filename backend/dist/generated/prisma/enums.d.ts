export declare const UserRole: {
    readonly STUDENT: "STUDENT";
    readonly FACULTY: "FACULTY";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ServiceRequestStatus: {
    readonly RECEIVED: "RECEIVED";
    readonly PROCESSING: "PROCESSING";
    readonly WAITING_FOR_APPROVAL: "WAITING_FOR_APPROVAL";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type ServiceRequestStatus = (typeof ServiceRequestStatus)[keyof typeof ServiceRequestStatus];
export declare const ApprovalStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly MORE_INFO_REQUIRED: "MORE_INFO_REQUIRED";
};
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];
export declare const BookingStatus: {
    readonly CONFIRMED: "CONFIRMED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const ResourceType: {
    readonly LAB: "LAB";
    readonly CLASSROOM: "CLASSROOM";
    readonly SEMINAR_HALL: "SEMINAR_HALL";
    readonly EQUIPMENT: "EQUIPMENT";
    readonly OTHER: "OTHER";
};
export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
export declare const AuditEventType: {
    readonly REQUEST_RECEIVED: "REQUEST_RECEIVED";
    readonly AI_REASONING_STARTED: "AI_REASONING_STARTED";
    readonly AI_REASONING_COMPLETED: "AI_REASONING_COMPLETED";
    readonly POLICY_RETRIEVED: "POLICY_RETRIEVED";
    readonly POLICY_CONFLICT_DETECTED: "POLICY_CONFLICT_DETECTED";
    readonly ACTION_PROPOSED: "ACTION_PROPOSED";
    readonly APPROVAL_REQUESTED: "APPROVAL_REQUESTED";
    readonly APPROVAL_GRANTED: "APPROVAL_GRANTED";
    readonly APPROVAL_REJECTED: "APPROVAL_REJECTED";
    readonly MORE_INFORMATION_REQUESTED: "MORE_INFORMATION_REQUESTED";
    readonly ACTION_EXECUTED: "ACTION_EXECUTED";
    readonly BOOKING_CREATED: "BOOKING_CREATED";
    readonly REQUEST_COMPLETED: "REQUEST_COMPLETED";
    readonly REQUEST_FAILED: "REQUEST_FAILED";
};
export type AuditEventType = (typeof AuditEventType)[keyof typeof AuditEventType];
