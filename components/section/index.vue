<template>
  <div class="section">
    <h3>
      {{ name }}
    </h3>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>
<style lang="less">
.section {
  border-bottom: solid 2px @text-color-primary;
  position: relative;
  height: auto;
  padding: 68px 0 60px 0; 
  h3 {
    margin: 0;
    text-transform: uppercase;
    color: @text-color-primary;
    position: absolute;
    font-size: 4.64rem;
    font-weight: bold;
    writing-mode: tb-rl;
    transform: rotate(180deg);
  }
  > .content {
    margin-left: 90px;
  }
}
 </style>