<script setup lang="ts">
import { watch, computed, onMounted, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Todo } from "@/types";
import { updateTodo, findTodoById, deleteTodo } from "@/composables/UseTodo";
import { format } from "date-fns";

const route = useRoute();
const $router = useRouter();

const id = route.params.id;
const todo: Todo = findTodoById(id);

const checked = ref<boolean>(todo.is_completed);
const title = ref<string>(todo.title);

const errorMessage = ref<string>("");
const validate = ref<boolean>(false);

function deleteTodoHandler() {
  deleteTodo(todo.id);
  $router.push({ name: "main" });
}

function updateTodoHandler() {
  if (validate.value) {
    updateTodo(todo.id, { is_completed: checked });
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

const formatedDate = computed(() => format(todo.created_at, 'dd.MM.yy HH:mm'))
</script>

<template>
  <div class="todo-page">
    <router-link :to="{ name: 'main' }" class="btn-back">< Back</router-link>

    <label for="completed" class="completed">
      <input
        id="completed"
        v-model="checked"
        class="todo-list__checkbox"
        type="checkbox"
        @change="updateTodo(todo.id, { is_completed: checked })"
      />
      <span class="checkmark"></span>
    </label>

    <div class="position-relative">
      <input
        v-model="title"
        class="todo__title"
        type="text"
        @input="validateInput"
        @blur="blurInput"
        @focus="validateInput"
        @keyup.enter="updateTodoHandler"
      />

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>

    <p class="todo__date">Created at: {{ formatedDate }}</p>

    <button class="todo__delete" @click="deleteTodoHandler">Delete</button>
  </div>
</template>

<style scoped lang="scss">
.todo-page {
  padding: 40px;
  display: flex;
  flex-direction: column;

  .btn-back {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #00000033;
    text-decoration: underline;
    margin-bottom: 55px;
  }

  .todo__title {
    margin-top: 10px;
    font-size: 40px;
    font-weight: 700;
    line-height: 46px;
    letter-spacing: 0em;
    margin-bottom: 50px;
    border: none;
  }

  .todo__date {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    margin-bottom: 15px;
    color: #00000033;
  }

  .todo__delete {
    border: none;
    display: inline-block;
    text-decoration: underline;
    color: red;
    text-align: left;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
  }

  .error-message {
    bottom: 10px;
  }
}
</style>
