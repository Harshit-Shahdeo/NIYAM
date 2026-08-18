export declare class AgentUserDto {
    id: string;
    role: 'STUDENT' | 'FACULTY' | 'ADMIN';
    department?: string;
    year?: number;
}
