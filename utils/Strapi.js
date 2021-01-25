import Strapi from 'strapi-sdk-javascript/build/main'
const localApiUrl = process.env.API_URL || 'http://localhost:1337'
const apiUrl = 'https://portifolio-gabrielu.herokuapp.com'
const strapi = new Strapi(localApiUrl)

const post = async (query, variables = {}) => {
  const response = await strapi.request('post', '/graphql', {
    data: {
      query,
      variables,
    },
  })

  return response.data
}

const get = (contentType) => strapi.request('get', `/${contentType}`)

const sendEmail = async (name, email, message, baseURL) => {
  const emailSettings = await strapi.request(
    'get',
    `/email/settings/production`
  )
  return await strapi.request('post', '/email', {
    baseURL,
    data: {
      to: emailSettings.config.sendmail_default_from,
      from: emailSettings.config.sendmail_default_from,
      replyTo: emailSettings.config.sendmail_default_replyto,
      subject: 'Mensagem do portifolio',
      html: `
        <p>
          <strong>from: ${name} <${email}> </strong> </br>
        </p>
        <span>
          ${message}
        </span>
      `,
    },
  })
}

export { apiUrl, post, get, strapi, sendEmail }
