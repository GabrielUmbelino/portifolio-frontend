<template>
  <a-layout-content
    class="header-content"
    :style="{ background: backgroundColor }"
    align="middle"
  >
    <a-row>
      <a-col class="mocks" xl="8" md="10" xs="24" align="middle">
        <figure v-if="mobileMockupImage">
          <img :src="mobileMockupImage" />
        </figure>
        <figure v-else-if="webMockupImage">
          <img :src="webMockupImage" />
        </figure>
      </a-col>
      <a-col class="details" xl="16" md="14" xs="24" align="middle">
        <h2 class="secondary-title">{{ name }}</h2>
        <a-button
          size="large"
          v-if="previewUrl"
          @click="previewUrl"
          icon="github" 
          type="primary"
        >
          {{ $t('see_project') }}
        </a-button>
      </a-col>
    </a-row>
  </a-layout-content>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    mobileMockupImage: {
      type: String
    },
    webMockupImage: {
      type: String
    },
    repositoryUrl: {
      type: String
    },
    previewUrl: {
      type: String
    },
    backgroundColor: {
      type: String
    }
  }
}
</script>
<style lang="less">
.header-content {
  padding: 153px 0;
  border-bottom: solid @grey-2 6px;
  .ant-row {
    max-width: 850px;
    margin: auto;
  }
  .mocks {
    figure {
      border-radius: 100%;
      box-shadow: 0px 0px 6px @primary-title-shadow-color;
      border: 3px solid @primary-title-text-color;
      position: relative;
      width: 214px;
      height: 214px;
      img {
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        max-width: 70%;
        max-height: 70%;
        height: auto;
        width: auto;
      }
    }
  }
  .details {
    align-content: center;
    padding: 0 20px;
    > * {
      text-align: left;
      display: block;
      float: left;
    }
    > h2 {
      width: 100%;
      font-size: 2.3rem;
    }
    > span {
      color: @text-color-dark;
    }
    > .ant-btn-primary {
      margin-top: 20px;
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 60px 0;
  }
}
</style>
