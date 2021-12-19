<template>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据1333</div>
    <div>
      全选 <input type="checkbox" v-model="allDone" />
      <span>{{ active }}/{{ all }}</span>
    </div>
  </div>
  <div>
    <!-- <div>x坐标：{{ x }}</div>
    <div>y坐标：{{ y }}</div> -->
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMouse } from "../utils/mouse";

let count = ref(1);
let color = ref("red");
function add() {
  count.value++;
  color.value = Math.random() > 0.5 ? "blue" : "red";
}

let { x, y } = useMouse();
let { title, todos, addTodo, clear, active, all, allDone } = useTodos();
</script>
<script>
function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "学习", done: false }]);

  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter((todo) => !todo.done);
  }
  let active = computed(() => {
    return todos.value.filter((todo) => !todo.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get() {
      return active.value === 0; //未完成事件为0
    },
    set(value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  return { title, todos, addTodo, clear, active, all, allDone };
}
</script>
<style scoped>
h1 {
  color: v-bind(color);
}
</style>
