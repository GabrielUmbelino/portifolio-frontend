<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
html {
  > body  {
    font-family: 'Cabin';
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
}
body, 
.ant-layout,
.ant-layout-footer {
  background: #fff;
}
</style>
