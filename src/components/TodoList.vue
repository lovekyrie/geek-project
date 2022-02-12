<template>
  <button @click="loading">加载icon</button>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
  <div class="container">
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没输入！</div>
      </div>
    </transition>
    <input type="text" v-model="title" @keydown.enter="addTodo1" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, index) in todos" :key="index">
          <!-- <input type="checkbox" v-model="todo.done" /> -->
          <p
            @click="updateStatus(index, !todo.done)"
            :class="{ done: todo.done }"
          >
            {{ todo.title }}
          </p>
          <div class="item-delete" @click="deleteTodo(index)">X</div>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
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

<script setup lang="ts">
import { computed, ref } from "vue";
// import { useMouse } from "../utils/mouse";
import useFavicon from "../utils/useFavicon";
import Task from "../model/task";

let count = ref(1);
let color = ref("red");
let { favicon } = useFavicon();
function add() {
  count.value++;
  // color.value = Math.random() > 0.5 ? "blue" : "red";
}

function loading() {
  favicon.value = "/geek.png";
}

// let { x, y } = useMouse();
let {
  title,
  todos,
  addTodo,
  addTodo1,
  updateStatus,
  deleteTodo,
  clear,
  active,
  all,
  allDone,
  showModal,
} = useTodos();
</script>
<script>
//import { useStorage } from "../utils/useStorage";
import { useStore } from "vuex";
function useTodos() {
  let title = ref("");
  // let todos = useStorage("todos", []);
  //使用hook的方式，拿到store仓库
  const store = useStore();
  const todos = computed<Task[]>(() => store.state.taskList);

  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }

  let showModal = ref(false);
  const addTodo1 = () => {
    if (!title.value) {
      showModal.value = true;
      setTimeout(() => {
        showModal.value = false;
      }, 1500);
      return;
    }
    store.commit("createTodo", {
      title: title.value,
      done: false,
    });
    title.value = "";
  };

  const updateStatus = (index: number, done: boolean) => {
    store.commit("updateStatus", {
      index,
      done,
    });
  };

  const deleteTodo = (index: number) => {
    store.commit("deleteTodo", {
      index,
    });
  };

  function clear() {
      //用vuex去更新
    // todos.value = todos.value.filter((todo: Task) => !todo.done);
  }
  let active = computed(() => {
    return todos.value.filter((todo: Task) => !todo.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get() {
      return active.value === 0; //未完成事件为0
    },
    set(value: boolean) {
      todos.value.forEach((todo: Task) => {
        todo.done = value;
      });
    },
  });
  return {
    showModal,
    title,
    todos,
     addTodo,
    addTodo1,
    updateStatus,
    deleteTodo,
    clear,
    active,
    all,
    allDone,
  };
}
</script>
<style scoped lang="scss">
.container {
  position: relative;
  ul {
    padding-left: 0;
  }
}

h1 {
  color: red;
}
.done {
  text-decoration: line-through;
  color: #999;
}
.item-delete {
  float: right;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.info-wrapper {
  position: absolute;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: #fff;
  background-color: #d88986;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transfrom 0.8s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
</style>
