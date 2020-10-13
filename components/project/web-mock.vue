<template>
  <div :class="{ small: showSmall }" class="web-mock">
    <figure>
      <img :src="image" :alt="name" />
    </figure>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    showSmall: {
      type: Boolean,
    },
  },
}
</script>
<style lang="less">
@image-small-width: 320px;
@image-width: 500px;
@mock-width: @image-width + 40px;
@mock-small-width: @image-width + 30px;
@mock-padding: 12px 12px 116px 12px;
@mock-padding-small: 7px 8px 74px 8px;

.web-mock {
  overflow: hidden;
  display: flex;
  position: relative;
  width: fit-content;
  margin: auto;

  figure {
    position: relative;
    width: @mock-width;
    margin: auto;
    padding: 0;

    &::before {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('~static/images/web_mock.svg');
    }

    img {
      height: auto;
      margin: auto;
      width: @image-width;
      padding: @mock-padding;
    }
  }

  @media (max-width: 540px) {
    figure {
      width: @mock-small-width;
      img {
        width: @image-small-width;
        padding: @mock-padding-small;
      }
    }
  }

  &.small {
    max-height: 500px;
    max-width: 100%;

    figure {
      width: @mock-small-width;
      img {
        width: @image-small-width;
        padding: @mock-padding-small;
      }
    }
  }
}
</style>
