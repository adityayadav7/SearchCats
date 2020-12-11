
<template>
  <div class="base-container">
    <md-progress-spinner class="md-accent" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
export default {
  name:"Loader"
}
</script>
<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
  .base-container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 12;
    outline: none;
    pointer-events: all;
    transition: opacity .2s;
}
</style>