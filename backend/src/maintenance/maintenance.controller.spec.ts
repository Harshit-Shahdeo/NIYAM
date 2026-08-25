import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';

describe('MaintenanceController', () => {
  let controller: MaintenanceController;

  const mockMaintenanceService = {
    getMyTickets: jest.fn().mockResolvedValue({ tickets: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceController],
      providers: [
        {
          provide: MaintenanceService,
          useValue: mockMaintenanceService,
        },
      ],
    }).compile();

    controller = module.get<MaintenanceController>(MaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getMyTickets with authenticated user', async () => {
    const mockUser = {
      userId: 'student-1',
      institutionId: 'inst-1',
      role: 'STUDENT' as const,
    };
    const req = { user: mockUser } as any;

    const result = await controller.getMyTickets(req);
    expect(result).toEqual({ tickets: [] });
    expect(mockMaintenanceService.getMyTickets).toHaveBeenCalledWith(mockUser);
  });
});
