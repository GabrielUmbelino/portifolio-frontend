<template>
  <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
    <a-form-item>
      <a-input
        placeholder="Nome"
        :decorator="nameDecorator"
        allow-clear
        :maxLength="120"
      >
        <ion-icon name="person" slot="prefix"></ion-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        placeholder="E-Mail"
        :decorator="emailDecorator"
        allow-clear
        :maxLength="120"
      >
        <ion-icon name="mail" slot="prefix"></ion-icon>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-textarea
        placeholder="Message"
        :decorator="messageDecorator"
        :rows="4"
        allow-clear
        :maxLength="200"
      >
      </a-textarea>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 24 }" align="right">
      <a-button type="primary" html-type="submit" size="large">
        Enviar
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

export default {
  components: {
    IconFont
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange(value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    }
  },
  computed: {
    nameDecorator() {
      return [
        'Nome',
        { rules: [{ required: true, message: 'Please input your name!' }] }
      ]
    },
    emailDecorator() {
      return [
        'E-Mail',
        { rules: [{ required: true, message: 'Please input your email!' }] }
      ]
    },
    messageDecorator() {
      return [
        'Message',
        { rules: [{ required: true, message: 'Please input your message!' }] }
      ]
    }
  }
}
</script>
