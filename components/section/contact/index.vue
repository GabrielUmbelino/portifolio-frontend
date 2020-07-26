<template>
  <div class="contact">
    <a-row>
      <a-col class="form" :xs="24" :lg="10" :xl="8">
        <p>
          {{ $t('send_a_message') }}
        </p>
        <Form @emailSended="emailsended = true" />
      </a-col>
      <a-col class="background" :xs="24" :lg="14" :xl="16">
        <div
          class="image"
          v-html="$store.state.header.content.contact_background"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Form from '~/components/section/contact/form.vue'

export default {
  components: {
    Form
  },
  data() {
    return {
      emailSended: false
    }
  }
}
</script>

<style lang="less">
div.contact {
  margin: auto;
  margin-right: 0;
  width: 100%;
  > .ant-row {
    padding-bottom: 4.25rem;
  }
  .form {
    > div {
      padding: 1px;
    }
  }
  .background {
    padding: 0;
    > .image {
      right: 10px;
      left: initial;
      margin-left: 0;
      margin-right: @section-margin;
    }
  }
}
@media (max-width: 768px) {
  .contact {
    padding-right: 0;
  }
}
@media (max-width: 990px) {
  .projects {
    .thumbnail {
      figure {
        justify-content: center;
        margin: auto;
        float: none;
        padding-bottom: 2rem;
      }
    }
  }
}
</style>
