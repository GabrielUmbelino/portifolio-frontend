<template>
  <a-layout-footer style="text-align: center">
    {{ $t('gabriels_portifolio') }} ©{{ new Date().getFullYear() }}
  </a-layout-footer>
</template>

<style lang="less">
.ant-layout-footer {
  background-color: @grey-2;
}
</style>
