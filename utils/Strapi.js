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

export { apiUrl, post, strapi }
