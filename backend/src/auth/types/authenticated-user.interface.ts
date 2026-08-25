export interface AuthenticatedUser {
    userId: string;
    institutionId: string;
    role: 'STUDENT' | 'FACULTY' | 'ADMIN';
}