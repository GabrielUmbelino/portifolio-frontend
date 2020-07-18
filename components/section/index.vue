<template>
  <div class="section">
    <h3 class="primary-title">{{ name }}</h3>
    <div class="content">
      <slot></slot>
      <hr />
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
  position: relative;
  height: auto;
  padding: 2rem 0 ;
  margin: auto;
  max-width: 1170px;
  &:before {
    content: "";
    background-color: @layout-sider-background;
    height: 100%;
    width: calc(100px + 50%);
    position: absolute;
    margin-left: -50%;
    top: 0;
    left: 0px;
    bottom: 0;
    right: 0;
    z-index: 0;
  }
  h3 {
    margin: 0;
    text-transform: uppercase;
    position: absolute;
    font-size: 3.1rem;
    writing-mode: tb-rl;
    transform: rotate(180deg);
    z-index: 1;
  }
  > .content {
    padding: 0 90px;
    margin-left: 100px;
    z-index: 0;
    hr {
      background-color: @heading-color;
      padding: 1px;
      border: none;
      margin: 1.5rem 0;
    }
    &:after {
      content: "";
    }
  }
  &:first-child {
    padding-top: 4.8rem;
  }
}
@media (max-width: 768px) {
  .section {
    padding-top: 1.875;
    padding-bottom: 1.875;
    &:first-child {
      padding-top: 1.875;
    }
    &:before {
      width: calc(80px + 50%);
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