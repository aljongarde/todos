import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
        private dataSource: DataSource
    ) { }

    async findTodo(user_id : number){
        //return this.todoRepository.findBy(user_id);
        
    return await this.todoRepository.createQueryBuilder("todos")
    .select(["todos"])
    .where("todos.user_id  = :user_id", {user_id : user_id})
    .orderBy('todos.datetime_added', 'DESC')
    .getMany();
    }

    async getTotalCountTodo(user_id : number){
        //return this.todoRepository.findBy(user_id);
        
    return await this.todoRepository.createQueryBuilder("todos")
    .select(["todos"])
    .where("todos.user_id  = :user_id", {user_id : user_id})
    .getCount();
    }

    async getTaskDetails(todo_id : number){
        //return this.todoRepository.findBy(user_id);
        
        return await this.todoRepository.createQueryBuilder("todos")
        .select(["todos"])
        .where("todos.todo_id  = :todo_id", {todo_id : todo_id})
        .getOne();
    }

    async getTotalCountFinishedTodo(user_id : number){
        //return this.todoRepository.findBy(user_id);
        
    return await this.todoRepository.createQueryBuilder("todos")
    .select(["todos"])
    .where("todos.user_id  = :user_id AND todos.isDone = 1", {user_id : user_id})
    .getCount();
    }
    
    async removeTodo(todo_id : number){
        return await this.todoRepository.delete(todo_id);
    }

    async finishTodo(todo_id : number, todo_data: any){
        //return this.todoRepository.findBy(user_id);
        
        return await this.todoRepository.update(todo_id, { isDone: 1 });
    }

    async registerTodo(user: TodoEntity): Promise<TodoEntity>{
        return await this.todoRepository.save(user);
      }


}
