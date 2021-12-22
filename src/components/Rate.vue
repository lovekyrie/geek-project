<template>
  <div :style="fontStyle">
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <!-- 用来覆盖 -->
      <span class="hollow" :style="fontwidth">
        <span
          @click="onRate(num)"
          @mouseover="mouseOver(num)"
          v-for="num in 5"
          :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed, ref } from "vue";
let props = defineProps({
  value: Number,
  theme: { type: String, default: "orange" },
});
let rate = computed(() =>
  "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value)
);
let width = ref(props.value);
function mouseOver(i) {
  width.value = i;
}
function mouseOut() {
  width.value = props.value;
}
//em针对父元素
const fontwidth = computed(() => `width:${width.value}em;`);
const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};

const fontStyle = computed(() => {
  return `color:${themeObj[props.theme]}`;
});

//defineEmits不需要导入
let emits = defineEmits("[update-rate]");
function onRate(num) {
  emits("update-rate", num);
}
</script>
<style lang="scss" scoped>
.rate {
  position: relative;
  display: inline-block;
  span {
    display: inline-block;
    width: 14px;
  }
  > span.hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0; //初始为0，全部为未选中的☆
    overflow: hidden;
  }
}
</style>