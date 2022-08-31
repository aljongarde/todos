import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    
    constructor(private todoService: TodoService) {

    }

    @Post('register_todo')
    async registerTodo(@Body() createTodoOto: TodoEntity){
        const response = await this.todoService.registerTodo(createTodoOto);
        return response;
    }

    @Post('delete_todo/:todo_id')
    async removeTodo(@Param('todo_id') todo_id: number){
        const response = await this.todoService.removeTodo(todo_id);
        return response;
    }

    @Post('finish_todo/:todo_id')
    async finishTodo(@Param('todo_id') todo_id: number, @Body() todo_data: any){
        const response = await this.todoService.finishTodo(todo_id, todo_data);
        return response;
    }

    @Get("get_todo/:user_id")
    async findTodo(@Param('user_id') user_id: number) {
        const response = await this.todoService.findTodo(user_id);
        return response;
    }

    @Get("get_detail_todo/:todo_id")
    async getTaskDetails(@Param('todo_id') todo_id: number) {
        const response = await this.todoService.getTaskDetails(todo_id);
        return response;
    }

    @Get("get_count_todo/:user_id")
    async getTotalCountTodo(@Param('user_id') user_id: number) {
        const response = await this.todoService.getTotalCountTodo(user_id);
        return response;
    }
    
    @Get("get_count_todo_finished/:user_id")
    async getTotalCountFinishedTodo(@Param('user_id') user_id: number) {
        const response = await this.todoService.getTotalCountFinishedTodo(user_id);
        return response;
    }
}
