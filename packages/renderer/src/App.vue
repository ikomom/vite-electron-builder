<script lang="ts" setup>
import ReactiveCounter from '/@/components/ReactiveCounter.vue';
import ReactiveHash from '/@/components/ReactiveHash.vue';
import ElectronVersions from '/@/components/ElectronVersions.vue';
import ClipBoard from '/@/pages/ClipBoard.vue';

const APP_VERSION = import.meta.env.VITE_APP_VERSION;
</script>

<template>
  <img
    alt="Vue logo "
    src="../assets/logo.svg"
    width="150"
  />

  <p>
    <!-- Example how to inject current app version to UI -->
    App version: {{ APP_VERSION }}
  </p>

  <p>
    For a guide and recipes on how to configure / customize this project,<br />
    check out the
    <a
      href="https://github.com/cawa-93/vite-electron-builder"
      target="_blank"
    >
      vite-electron-builder documentation
    </a>
    .
  </p>

  <fieldset>
    <legend>Test Vue Reactivity</legend>
    <reactive-counter />
  </fieldset>

  <fieldset>
    <legend>Test Node.js API</legend>
    <reactive-hash />
  </fieldset>

  <fieldset>
    <legend>Environment</legend>
    <electron-versions />
  </fieldset>

  <p>
    Edit
    <code>packages/renderer/src/App.vue</code> to test hot module replacement.
  </p>
  <ClipBoard />
</template>

<style>
fieldset {
  margin: 2rem;
  padding: 1rem;
}
</style>
