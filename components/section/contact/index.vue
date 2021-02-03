<template>
  <div id="contact" class="contact">
    <a-row type="flex" align="bottom">
      <a-col class="form" :xs="24" :lg="12" :xl="11">
        <p v-if="emailSended">
          {{ $t('message_sended') }}
        </p>
        <p v-else>
          {{ $t('send_a_message') }}
        </p>
        <Form @emailSended="onEmailSended" />
      </a-col>
      <a-col class="background" :xs="24" :lg="12" :xl="13">
        <div class="image">
          <img src="~/static/images/nathalia_dark.svg" :alt="$t('contact')" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Form from '~/components/section/contact/form.vue'

export default {
  components: {
    Form,
  },
  data() {
    return {
      emailSended: false,
    }
  },
  methods: {
    onEmailSended(emailSended) {
      this.emailSended = emailSended
    },
  },
}
</script>

<style lang="less">
section > {
  .content > {
    div.contact {
      margin: auto;
      margin-right: 0;
      padding-bottom: 0;
      width: 100%;
      > .ant-row {
        padding-bottom: 0;
      }
      .form {
        z-index: 1;
        > div {
          padding: 1px;
        }
      }
      .background {
        z-index: 0;
        padding: 0;
        > .image {
          margin: 0 10px;
          img {
            max-width: 100%;
            margin: auto;
            display: block;
          }
        }
      }
    }
    @media (max-width: 768px) {
      .contact {
        padding-right: 0;
        .background {
          padding: 0;
        }
      }
    }
  }
}
</style>
