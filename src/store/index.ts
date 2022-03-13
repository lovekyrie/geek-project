import { defineStore } from "pinia";
import Task from "../model/task";
//ts中接口数据
interface State {
  userName: string;
  taskList: Task[];
}

let state: State = {
  userName: "小仙女",
  taskList: [],
};

export const useTodoStore = defineStore("todo", {
  state: () => {
    return state;
  },
  actions: {
    createTodo(taskList: Task[], newTask: Task) {
      taskList.push(newTask);
    },
    //接受state,payload
    updateStatus(state: State, payload: any) {
      //解构index,status
      const { index, done } = payload;
      //修改列表项的状态
      state.taskList[index].done = done;
    },
    //删除任务方法
    deleteTodo(taskList: Task[], payload: any) {
      const { index } = payload;
      //将对应的数据删除即可
      taskList.splice(index, 1);
    },
  },
});
