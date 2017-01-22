import State from './state';
import TodoService from './services/todo-service';
export default {
    init: () =>  {
        TodoService.subscribeToState();
    }
}
