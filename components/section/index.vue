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
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="less">
.section {
  position: relative;
  height: auto;
  margin: @section-margin auto;
  max-width: 1270px;
  &:last-child {
    margin-bottom: (@section-margin / 2);
  }
  &::before {
    content: '';
    background-color: @layout-sider-background;
    width: calc(100px + 50%);
    position: absolute;
    margin-top: -@section-margin;
    margin-left: -50%;
    top: 0;
    left: 0;
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
    left: 0;
  }
  > .content {
    padding: 0 5.62rem;
    margin-left: 6.25rem;
    z-index: 0;
    position: relative;
    > div {
      position: static;
      padding-bottom: @section-margin;
      > .image {
        position: absolute;
        left: 17px;
        bottom: 2px;
        margin-left: @section-margin;
        background-repeat: no-repeat;
        background-position: center;
        display: block;
      }
    }
    hr {
      background-color: @heading-color;
      padding: 1px;
      border: none;
      margin: 0;
    }
  }
}
@media (max-width: 768px) {
  .section {
    margin-top: @section-margin-mobile;
    margin-bottom: @section-margin-mobile;
    &:first-child {
      margin-top: @section-margin-mobile;
    }
    &::before {
      margin-top: -@section-margin-mobile;
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
