<script setup lang="ts">
import { watch, computed, onMounted, ref, Ref } from "vue";
import type { Todo } from "@/types";
import {
  message,
  allTodos,
  fetchTodos,
  addTodo,
  updateTodo,
  findTodoById,
  deleteTodo,
} from "@/composables/UseTodo";
import TodoItem from "./TodoItem.vue";

fetchTodos();

const task = ref<string>("");
const errorMessage = ref<string>("");
const validate = ref<boolean>(false);
const input = ref(null);

const allTodosActive = computed<Todo[]>(() => {
  if (allTodos.value) {
    return allTodos.value.filter((todo: Todo) => todo.is_completed === false);
  } else {
    return [];
  }
});

const allTodosDone = computed<Todo[]>(() => {
  if (allTodos.value) {
    return allTodos.value.filter((todo: Todo) => todo.is_completed === true);
  } else {
    return [];
  }
});

function addTodoItem(todoItem) {
  input.value.focus();

  if (validate.value) {
    const todo: Todo = {
      id: Math.random().toString(16).slice(2),
      title: task.value,
      is_completed: false,
      created_at: Date.now(),
    };

    addTodo(todo);

    task.value = "";
  }
}

function validateInput(e) {
  if (!e.target.value) {
    errorMessage.value = "Please fill the input";
    validate.value = false;
    return;
  } else if (e.target.value.length < 3) {
    errorMessage.value = "Todo title must have at least 3 characters";
    validate.value = false;
    return;
  } else {
    errorMessage.value = "";
    validate.value = true;
  }
}

function blurInput(e) {
  if (!e.target.value) {
    errorMessage.value = "";
  }
}
</script>

<template>
  <div class="todo-list__wrapper">
    <div v-if="allTodos && allTodos.length > 0" class="todo-list__inner">
      <div v-if="allTodosActive.length > 0" class="todo-list todo-list__active">
        <ul>
            <template v-for="todo in allTodosActive" :key="todo.id">
                <TodoItem :todo="todo" />
            </template>
        </ul>
      </div>

      <div v-if="allTodosDone.length > 0" class="todo-list todo-list__done">
        <ul>
            <template v-for="todo in allTodosDone" :key="todo.id">
                <TodoItem :todo="todo" class="disabled"/>
            </template>
        </ul>
      </div>
    </div>

    <div v-else class="todo-list__inner">
      <h1>No current Todos</h1>
    </div>

    <div class="todo-list__create">
      <input
        ref="input"
        v-model="task"
        class="todo-list__input"
        :class="{ error: errorMessage }"
        type="text"
        placeholder="Enter your new ToDo..."
        @input="validateInput"
        @blur="blurInput"
        @focus="validateInput"
      />
      <button @click="addTodoItem(task)" class="btn btn-create"></button>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.todo-list {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__create {
    position: relative;
    width: 100%;

    .btn-create {
      position: absolute;
      right: 0;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background-image: url("images/add-icon.svg");
      cursor: pointer;
      top: 15px;
      right: 15px;
    }
  }

  &__inner {
    width: 100%;
    text-align: center;
  }

  &__input {
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 17px 15px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    width: 100%;
    border: 1px solid #fff;
    outline: none;
  }
}
</style>
