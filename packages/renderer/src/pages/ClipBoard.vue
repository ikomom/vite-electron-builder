<template>
  <div class="px-2">
    <v-text-field
      v-model="text"
      label="请输入"
    />
    <v-btn
      class="mb-2"
      @click="
        clipboard.writeText(text);
        $forceUpdate();
      "
    >
      添加到剪切板
    </v-btn>
    <div>
      {{ clipboard.readText() }}
    </div>
    <div>
      <div
        v-for="item in lastArr"
        :key="item.t"
      >
        【{{ item.t }}】 {{ item.n }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {clipboard, getClipboardObserver} from '#preload';
const text = ref('');
const lastArr = ref<any>([]);
try {
  getClipboardObserver({
    textChange(n) {
      text.value = n;
      lastArr.value.unshift({n, t: new Date().getTime()});
    },
    imageChange(image) {
      console.log('imageChange', image);
      lastArr.value.unshift({n: image, t: new Date().getTime()});
    },
  });
  // new ClipboardObserver({
  //   textChange(n) {
  //     text.value = n;
  //     lastArr.value.unshift({n, t: new Date().getTime()});
  //   },
  //   // imageChange(image) {
  //   //   lastArr.value.unshift({n: image.toDataURL(), t: new Date().getTime()});
  //   // },
  // });
} catch (e) {
  console.error(e);
}
</script>

<style scoped lang="scss"></style>
