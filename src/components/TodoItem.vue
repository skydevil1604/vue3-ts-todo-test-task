<script setup lang="ts">
import { watch, computed, onMounted, ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Todo } from "@/types";
import { updateTodo, deleteTodo } from "@/composables/UseTodo";

const props = defineProps<{
  todo: Todo;
}>();

const $router = useRouter();

const checked = ref<boolean>(props.todo.is_completed);

function goToEditTodo() {
  $router.push({ name: "todo", params: { id: props.todo.id } });
}
</script>

<template>
  <li class="todo-list__item">
    <label for="completed" class="completed">
      <input
        id="completed"
        v-model="checked"
        class="todo-list__checkbox"
        type="checkbox"
        @change="updateTodo(props.todo.id, { is_completed: checked })"
      />
      <span class="checkmark"></span>
    </label>

    <p class="todo-list__title" @click="goToEditTodo">{{ props.todo.title }}</p>

    <button class="btn btn-delete" @click="deleteTodo(props.todo.id)">
      <img src="/images/trash.svg" alt="" />
    </button>
  </li>
</template>

<style lang="scss">
.todo-list {
  &__item {
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 16px 0px #0000001a;
    border-radius: 10px;
    padding: 12px 15px;
    margin-bottom: 10px;
    position: relative;
  }

  &__title {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    word-break: break-word;
    max-width: 80%;
    text-align: left;
  }
}

.btn-delete {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
