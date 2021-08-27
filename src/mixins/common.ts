import { reactive, ref } from "vue";

export default function () {
      const is_open = ref(false)
      function close () {
            is_open.value = false
      }
      function open () {
            is_open.value = true
      }

      const pagination = reactive({
            pageSize: 15,
            pageCount: 1,
      })

      return {
            pagination,
            is_open,
            open,
            close
      }
}