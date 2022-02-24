const axios = require('axios')


async function searchMovie(searchExpression) {
    const search = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${process.env.API_KEY}/${searchExpression}`)
    return search.data 
}

module.exports = { searchMovie }