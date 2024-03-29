import { TodoListRepository } from "../infrastructure/interfaces/todo-list-repository";

export class CompleteTodoItem {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async perform(user_email: string, item_description: string): Promise<void> {
    const todolist = await this.todoListRepository.findByEmail(user_email);
    if (todolist) {
      const todo = todolist.find_by_description(item_description);
      if (todo) {
        todo.mark_completed();
        await this.todoListRepository.update(user_email, todolist);
      }
    }
    this.todoListRepository.setStatus("ready");
  }
}
