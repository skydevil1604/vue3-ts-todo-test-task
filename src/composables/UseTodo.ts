import { ref } from 'vue'
import type { Todo } from '@/types'
import { toast } from 'vue3-toastify'

const allTodos = ref<Todo[]>([])
const message = ref('')

/**
 * Retrieve all todos
 */
function fetchTodos(): void {
    JSON.parse(localStorage.getItem('todos'))
        ? allTodos.value = JSON.parse(localStorage.getItem('todos'))
        : allTodos.value = []
}

/**
 *  Add a new todo
 */
function addTodo(todo: Todo): void {
    if (allTodos) {
        allTodos.value.push(todo)
        saveTodos()
    } else {
        localStorage.setItem('todos', JSON.stringify(allTodos.value))
        allTodos.value.push(todo)
        saveTodos()
    }

    toast.success('TODO added succesfully')

    fetchTodos()
}

/**
 *  Save todo
 */
function saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(allTodos.value))
    fetchTodos()
}

/**
 * Update todo
 */
function updateTodo(id: string, data: object) {
    const todo = findTodoById(id)

    Object.keys(todo).forEach(el => {
        Object.keys(data).forEach(item => {
            if (el === item) {
                todo[el] = data[item]
            }
        })
    })

    const todoItemIndex = allTodos.value.findIndex((el: { id: string }) => el.id === id)
    allTodos.value[todoItemIndex] = todo

    saveTodos()

    toast.success('TODO updated succesfully')

    fetchTodos()
}

/**
 * Find todo via id
 */
function findTodoById(id: string | string[]): Todo {
    const todoItemIndex = allTodos.value.findIndex((el: { id: string }) => el.id === id)
    const todoItem = allTodos.value[todoItemIndex]

    return todoItem
}

/**
 *  Delete todo via id
 */
function deleteTodo(id: string) {
    const decision = confirm('Are you sure you want delete a todo?')
    if (decision) {
        const todoItemIndex = allTodos.value.findIndex((el: { id: string }) => el.id === id)
        allTodos.value.splice(todoItemIndex, 1)
        saveTodos()

        toast.success('TODO deleted succesfully')

        fetchTodos()

    } else return

}

export { message, allTodos, fetchTodos, addTodo, updateTodo, findTodoById, deleteTodo }