import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = 'https://portifolio-gabrielu.herokuapp.com'
const strapi = new Strapi(apiUrl)

const post = async (body) => {
  const response = await strapi.request('post', '/graphql', {
    data: {
      query: `
        query ${body}
      `
    }
  })
  return response.data
}

const sendEmail = async (name, email, message) => {
  const config = await strapi.request('get', `/email/settings/${process.env.ENV || 'development'}`)

  return await strapi.request('post', '/email', {
    to: config.sendmail_default_from,
    from: email,
    replyTo: config.sendmail_default_replyto,
    subject: 'Mensagem do portifolio',
    text: `from: ${name}; message: ${message}`,
    html: `
      <p>
        <strong>from: ${name}</strong> </br>
      </p>
      <span>
        ${message}
      </span>
    `,
  })
}

export { apiUrl, post, strapi, sendEmail }
