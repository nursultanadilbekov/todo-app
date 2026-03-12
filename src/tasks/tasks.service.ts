import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto, TaskQueryDto } from './dto/tasks.dto';

export interface PaginatedTasks {
  items: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId: number, query: TaskQueryDto): Promise<PaginatedTasks> {
    const { page = 1, limit = 10, completed } = query;

    const qb = this.tasksRepository
      .createQueryBuilder('task')
      .where('task.user_id = :userId', { userId })
      .orderBy('task.createdAt', 'DESC');

    if (completed !== undefined) {
      qb.andWhere('task.completed = :completed', { completed });
    }

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Задача с id ${id} не найдена`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('У вас нет доступа к этой задаче');
    }

    return task;
  }

  async create(dto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({
      title: dto.title,
      completed: false,
      userId,
    });
    return this.tasksRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    await this.findOne(id, userId);
    await this.tasksRepository.delete(id);
    return { message: 'Задача успешно удалена' };
  }
}
