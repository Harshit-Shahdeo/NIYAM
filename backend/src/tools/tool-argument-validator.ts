import { BadRequestException } from '@nestjs/common';

import { plainToInstance, ClassConstructor } from 'class-transformer';

import { validate } from 'class-validator';

export async function validateToolArguments<T extends object>(
  dtoClass: ClassConstructor<T>,
  arguments_: Record<string, unknown>,
): Promise<T> {
  const dto = plainToInstance(dtoClass, arguments_);

  const errors = await validate(dto);

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  return dto;
}
