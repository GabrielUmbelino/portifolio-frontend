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
<style lang="sass">
.section
  border-bottom: solid 2px #E2EBEC
  position: relative
  height: auto
  padding: 68px 0 60px 0 
  h3
    text-transform: uppercase
    transform: rotate(270deg)
    transform-origin: 0 0
    color: #E2EBEC
    position: absolute
    font-size: 4.64rem
    font-weight: bold
    bottom: 0px
    left: 0px
    margin-bottom: -40px
  > .content
    margin-left: 90px
 </style>