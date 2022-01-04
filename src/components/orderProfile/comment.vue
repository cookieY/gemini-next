<template>
      <a-list
            class="comment-list"
            :header="`${data.length} 条信息`"
            item-layout="horizontal"
            :data-source="data"
      >
            <template #renderItem="{ item }">
                  <a-list-item>
                        <a-comment :author="item.author" :avatar="icon">
                              <template #content>
                                    <p>{{ item.content }}</p>
                              </template>
                              <template #datetime>
                                    <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                                          <span>{{ item.datetime.fromNow() }}</span>
                                    </a-tooltip>
                              </template>
                        </a-comment>
                  </a-list-item>
            </template>
      </a-list>
      <a-comment>
            <a-avatar slot="avatar" src="/src/assets/comment/rockets.svg" />
            <div slot="content"></div>
      </a-comment>
      <a-form>
            <a-form-item>
                  <a-textarea :rows="4" />
            </a-form-item>
            <a-form-item>
                  <a-button html-type="submit" type="primary">添加评论</a-button>
            </a-form-item>
      </a-form>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const icon = "/src/assets/comment/comment.svg"

const data = [
      {
            actions: ['Reply to'],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
                  'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: dayjs().subtract(1, 'days'),
      },
      {
            actions: ['Reply to'],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
                  'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: dayjs().subtract(2, 'days'),
      },
]
</script>