import Todo from './Todo.svelte'
import { todos } from '../stories/mockups'

export default { title: 'Todo app' }
export const virtualTodo = () => ({
  Component: Todo,
  props: { todos, uid: todos.length + 1 }
})
