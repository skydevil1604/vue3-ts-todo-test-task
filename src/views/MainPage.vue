<script setup lang="ts">
import { ref, watch } from 'vue'
import TodoList from '@/components/TodoList.vue'

</script>

<template>
  <div class="main-page">
    <div class="main-logo">
      <img src="/images/site-logo.svg" alt="Todo App logo">
    </div>
    <TodoList />
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 930px;
  padding: 0 40px 30px 40px;
}
</style>
