import { ref } from "vue";

export default function () {
      const is_open = ref(false)
      function close () {
            is_open.value = false
      }
      function open () {
            is_open.value = true
      }
      return {
            is_open,
            open,
            close
      }
}