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
  </div>
</template>

<script lang="ts" setup>
import {clipboard} from '#preload';
const text = ref('');
</script>

<style scoped lang="scss"></style>
