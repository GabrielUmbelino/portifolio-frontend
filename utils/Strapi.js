import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

const post = async (body) => {
  let response;
  try {
    response =  await strapi.request('post', '/graphql', {
      data: {
        query: `
          query ${body}
        `
      }
    })
    
  } catch (error) {
    console.log(error.message)
    throw error.message;
  }

  return response.data
}

const sendEmail = async (name, email, message, baseURL) => {
  const emailSettings = await strapi.request('get', `/email/settings/production`)
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
    }
  })
}

export { apiUrl, post, strapi, sendEmail }
