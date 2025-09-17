import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Application } from '../entities/application.entity';
import { ApplicationService } from '../services/application.service';
import { PaginationParams } from 'src/core/classes/pagination.class';
import { ListApplication } from '../dtos/list-application.dto';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Mutation(() => Application)
  async createApplication(@Args() data: Application) {
    return this.applicationService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteApplication(@Args('id') id: string) {
    return this.applicationService.delete(id);
  }

  @Mutation(() => Boolean)
  async updateApplication(@Args('id') id: string, @Args() data: Application) {
    return this.applicationService.update(id, data);
  }

  @Query(() => ListApplication)
  async findAllApplications(@Args() params: PaginationParams) {
    return this.applicationService.findAll(params);
  }

  @Query(() => Application)
  async findApplicationById(@Args('id') id: string) {
    return this.applicationService.findOne(id);
  }
}
