import { ClassConstructor } from 'class-transformer';
export declare function validateToolArguments<T extends object>(dtoClass: ClassConstructor<T>, arguments_: Record<string, unknown>): Promise<T>;
