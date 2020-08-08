<template>
  <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
    <a-alert
      v-if="alert.show"
      :message="alert.message"
      :type="alert.type"
      show-icon
    />
    <a-form-item>
      <a-input
        :placeholder="$t('name')"
        v-decorator="nameDecorator"
        allow-clear
        :maxLength="120"
      >
        <ion-icon name="person" slot="prefix"></ion-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        :placeholder="$t('email')"
        v-decorator="emailDecorator"
        allow-clear
        :maxLength="120"
      >
        <ion-icon name="mail" slot="prefix"></ion-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-textarea
        :placeholder="$t('message')"
        v-decorator="messageDecorator"
        :rows="4"
        allow-clear
        :maxLength="200"
      >
      </a-textarea>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 24 }" align="right">
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
      >
        <!-- {{ $t('send') }} -->
        Eviar essa porra
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { sendEmail } from '~/utils/Strapi'

export default {
  data() {
    return {
      loading: false,
      alert: {
        show: false,
        type: null,
        message: null
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'contact' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          sendEmail(
            values[this.$t('name')],
            values[this.$t('message')],
            values[this.$t('email')]
          ).then(
            (res) => this.show(this.$t('message_sent_successfully'), 'success'),
            (err) => this.show(this.$t('problem_sending_message'), 'error'),
            () => (this.loading = false)
          )
        }
      })
    },
    showAlert(message, type) {
      this.state.alert = {
        show: true,
        message,
        type
      }
    },
    hideAlert() {
      this.state.alert = {
        show: false,
        type: null,
        message: null
      }
    }
  },
  computed: {
    nameDecorator() {
      return [
        this.$t('name'),
        {
          rules: [
            { required: true, message: this.$t('please_input_your_name') }
          ]
        }
      ]
    },
    emailDecorator() {
      return [
        this.$t('email'),
        {
          rules: [
            { type: 'email', message: this.$t('please_input_a_valid_email') },
            { required: true, message: this.$t('please_input_your_email') }
          ]
        }
      ]
    },
    messageDecorator() {
      return [
        this.$t('message'),
        {
          rules: [
            { required: true, message: this.$t('please_input_your_message') }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less">
.ant-form {
  .ant-form-item {
    .ant-btn {
      padding: 4px 46px;
      height: 40px;
    }
  }
}
</style>
