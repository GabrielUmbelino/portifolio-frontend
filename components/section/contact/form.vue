<template>
  <div>
    <a-alert
      v-if="alert.show"
      :message="alert.message"
      :type="alert.type"
      show-icon
      closable
    />
    <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="nameDecorator"
          :placeholder="$t('name')"
          allow-clear
          :max-length="120"
        >
          <ion-icon slot="prefix" name="person"></ion-icon>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="emailDecorator"
          :placeholder="$t('email')"
          allow-clear
          :max-length="120"
        >
          <ion-icon slot="prefix" name="mail"></ion-icon>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="messageDecorator"
          :placeholder="$t('message')"
          :rows="4"
          allow-clear
          :max-length="200"
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
          {{ !loading ? $t('send') : $t('sending') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
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
        message: null,
      },
    }
  },
  computed: {
    nameDecorator() {
      return [
        this.$t('name'),
        {
          rules: [
            { required: true, message: this.$t('please_input_your_name') },
          ],
        },
      ]
    },
    emailDecorator() {
      return [
        this.$t('email'),
        {
          rules: [
            { type: 'email', message: this.$t('please_input_a_valid_email') },
            { required: true, message: this.$t('please_input_your_email') },
          ],
        },
      ]
    },
    messageDecorator() {
      return [
        this.$t('message'),
        {
          rules: [
            { required: true, message: this.$t('please_input_your_message') },
          ],
        },
      ]
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'contact' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.sendEmail(
            values[this.$t('name')],
            values[this.$t('email')],
            values[this.$t('message')]
          )
        }
      })
    },
    async sendEmail(name, email, message) {
      this.loading = true
      const response = await sendEmail(
        name,
        email,
        message,
        this.$store.state.header.apiUrl
      )
      if (response) {
        this.showAlert(this.$t('message_sent_successfully'), 'success')
      } else {
        this.showAlert(this.$t('problem_sending_message'), 'error')
      }
      this.loading = false
    },
    showAlert(message, type) {
      this.alert = {
        show: true,
        message,
        type,
      }
    },
  },
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

  .ant-alert {
    margin: 25px 0;
  }
}
</style>
