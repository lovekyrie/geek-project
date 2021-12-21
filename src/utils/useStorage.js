import { ref, watchEffect } from "vue";
function useStorage(name, values = []) {
  let data = ref(JSON.parse(localStorage.getItem(name)) || values);
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value));
  });
  return data;
}

export { useStorage };
