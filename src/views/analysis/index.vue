<!-- <template>
  <transition-group name="message" tag="div" class="chat-messages">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="chat-message"
      :class="{ 'is-user': message.isUser }"
    >
      {{ message.text }}
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
  import dayjs, { extend } from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import { Comment, postOrderComment } from '@/apis/orderPostApis';
  import { onMounted, ref, nextTick, onUpdated } from 'vue';
  import { useStore } from '@/store';
  import comment from '@/assets/comment/rockets.svg';
  import icon from '@/assets/comment/comment.svg';
  import { useWebSocket, useWindowSize } from '@vueuse/core';
  import { checkSchema } from '@/lib';
  import { COMMON_URI } from '@/config/request';

  extend(relativeTime);
  extend(customParseFormat);

  const data = ref<Comment[]>([]);

  const { height } = useWindowSize();

  const ws = ref();

  const content = ref('');

  const scrollTop = () => {
    nextTick(() => {
      let h = document.getElementById('comment') as HTMLElement;
      h.scrollTop = h.scrollHeight;
    });
  };

  const store = useStore();

  const postComment = async () => {
    ws.value.send(JSON.stringify({ sql: content.value }));
    data.value.push({
      username: store.state.user.account.user,
      time: dayjs().format('YY-MM-DD HH:mm'),
      content: content.value,
    } as Comment);
    content.value = '';
    scrollTop();
  };

  onUpdated(() => {
    scrollTop();
  });

  onMounted(async () => {
    ws.value = useWebSocket(`${checkSchema()}${COMMON_URI}/fetch/gpt`, {
      autoReconnect: {
        retries: 3,
      },
      heartbeat: {
        interval: 5000,
        message: 'ping',
      },
      protocols: [store.state.user.account.token],
      onMessage: (e, event) => {
        data.value.push({
          username: 'AI助手',
          time: dayjs().format('YY-MM-DD HH:mm'),
          content: event.data,
        } as Comment);
      },
    });
  });
</script> -->
