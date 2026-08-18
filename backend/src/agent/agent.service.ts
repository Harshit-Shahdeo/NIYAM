import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { AgentReasonResponseDto } from './dto/agent-reason-response.dto';

@Injectable()
export class AgentService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async reason(
    request: AgentReasonRequestDto,
  ): Promise<AgentReasonResponseDto> {
    let response;

    try {
      response = await firstValueFrom(
        this.httpService.post<AgentReasonResponseDto>(
          'http://localhost:8000/agent/reason',
          request,
        ),
      );
    } catch (error) {
      console.error('FastAPI request failed:', error);

      throw new ServiceUnavailableException(
        'AI reasoning service unavailable',
      );
    }

    const aiResponse = plainToInstance(
      AgentReasonResponseDto,
      response.data,
    );

    const errors = await validate(aiResponse, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      console.error(
        'Invalid AI response:',
        errors,
      );

      throw new InternalServerErrorException(
        'AI reasoning service returned an invalid response',
      );
    }

    return aiResponse;
  }
}