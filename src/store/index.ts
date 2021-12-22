import { createStore } from "vuex";
//ts中接口数据
interface State {
  userName: string;
  taskList: any[];
}

let state: State = {
  userName: "小仙女",
  taskList: [],
};

export default createStore({
  state,
  mutations: {
    createTodo(state: any, newTask: any) {
      state.taskList.push(newTask);
    },
    //接受state,payload
    updateStatus(state: any, payload: any) {
      //解构index,status
      const { index, status } = payload;
      //修改列表项的状态
      state.taskList[index].done = status;
    },
    //删除任务方法
    deleteTodo(state, payload: any) {
      const { index } = payload;
      //将对应的数据删除即可
      state.taskList.splice(index, 1);
    },
  },
});
