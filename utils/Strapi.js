import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
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
  console.log('sendEmail() process.env.API_URL:', apiUrl, process.env.API_URL);
  const config = await strapi.request('get', `/email/settings/${process.env.ENV || 'development'}`)
  console.log('sendEmail() configs:', config, name, email, message);

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
