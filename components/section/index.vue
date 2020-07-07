<template>
  <div class="section">
    <h3 class="secondary-title">{{ name }}</h3>
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
  padding: 68px 0 ;
  max-width: 1170px;
  margin: auto;
  &:after {
    content: "";
    background-color: @layout-sider-background;
    height: 100%;
    width: calc(100px + 30%);
    position: absolute;
    margin-left: -30%;
    top: 0;
    left: 0px;
    bottom: 0;
    right: 0;
    z-index: 0;
  }
  h3 {
    margin: 0;
    text-transform: uppercase;
    color: @text-color-primary;
    position: absolute;
    font-size: 4.64rem;
    font-weight: bold;
    writing-mode: tb-rl;
    transform: rotate(180deg);
    z-index: 1;
  }
  > .content {
    padding: 0 60px;
    margin-left: 90px;
  }
}
@media (max-width: 768px) {
  .section {
    padding: 30px 0;
    &:after {
      width: calc(80px + 30%);
    }
    h3 {
      font-size: 3.125rem;
    }
    > .content {
      padding: 0 20px;
      margin-left: 80px;
    }
  }
}
</style>