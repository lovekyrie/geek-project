<template>
  <div class="syntax">
    <p>第{{ year }}年</p>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
  </div>
</template>
<script>
import { toRefs, reactive, ref, watch, watchEffect } from "vue";
export default {
  setup() {
    const year = ref(0);
    const user = reactive({ name: "xiaofang", age: 26, gender: "女" });
    const state = reactive({ id: 1, attributes: { name: "" } });
    setInterval(() => {
      year.value++;
      user.age++;
    }, 3000);

    //修改user时会触发,
    /**
     * watch参数
     * param1,可以监听string,object,function,array
     * param2,callbackFn
     * param3(可选) deep (监听深层次比如：对象嵌套)、immediate（设为true 表示立即执行，没变化也监听？） 和 flush
     */

    watch(
      () => user.age,
      (curAge, preAge) => {
        console.log(`新值:${curAge}, 老值:${preAge}`);
      }
    );

    watch(year, (newVal, oldVal) => {
      console.log(`新值:${newVal}, 老值:${oldVal}`);
    });

    watch([() => user.age, year], ([curAge, newVal], [preAge, oldVal]) => {
      console.log(`新值:${curAge}, 老值:${preAge}`);
      console.log(`新值:${newVal}, 老值:${oldVal}`);
    });

    const stopFn = watch(
      () => state,
      (state, preState) => {
        console.log("dep", state.attributes.name, preState.attributes.name);
      },
      { deep: true }
    );

    //停止监听
    setTimeout(() => {
      stopFn();
    }, 3000);

    /**
     * 1. 不必传入依赖，这个方法会自动捕捉变化的数据
     * 2. 会先执行一次收集依赖数据
     * 3. 只能获取变化后的值
     */
    watchEffect(() => {
      console.log(`执行了${year.value}次`);
      console.log(user);
      console.log(year);
    });

    return {
      year,
      ...toRefs(user), //使用toRefs结构user,并且不影响响应式
    };
  },
};
</script>
