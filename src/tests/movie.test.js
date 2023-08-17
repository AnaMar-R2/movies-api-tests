const request = require('supertest')
const app = require('../app')
const Movie = require('../models/Movie')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require("../models")
let movieId

beforeAll(async () => {
    return await Movie.bulkCreate([
        {
            name: "Barbie",
            image: "https://foto_random.jpg",
            synopsis: "una película de fantasia",
            releaseYear: 2001
        },
        {
            name: "Matrix",
            image: "https://foto_random.jpg",
            synopsis: "una película de ficcon",
            releaseYear: 1999
        },
    ])
})

const movie = {
    name: "IT",
    image: "https://foto_random.jpg",
    synopsis: "una película de un payaso",
    releaseYear: 2017
}

test("GET -> '/api/v1/movies', should return status code 200, body is defined and res.body.length === 2", async () => {
    const res = await request(app)
    .get('/api/v1/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});


test("POST -> '/api/v1/movies', should return status code 201, body is defined, and res.body.name === movie.name ", async () => {
    const res = await request(app)
    .post('/api/v1/movies')
    .send(movie)
    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})


test("GET -> '/api/v1/movies/:id', should return status code 200, body is defined, and res.body.name === movie.name", async () => {
    const res = await request(app)
    .get(`/api/v1/movies/${movieId}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});


test("PUT -> '/api/v1/movies/:id', should return status code 200, body is defined and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name: "Los juegos de Hambre"
    }

    const res = await request(app)
    .put(`/api/v1/movies/${movieId}`)
    .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})


test("POST -> '/api/v1/movies/:id/actors', should return status code 200 and res.body.length === 1", async () => {
    const actor = {
        firstName: "Cole",
        lastName: "Sprouse",
        nationality: "USA",
        image: "https://foto_random.jpg",
        birthday: "08-04-1992"
    }

    const createActor = await Actor.create(actor)
    
    const res = await request(app)
    .post(`/api/v1/movies/${movieId}/actors`)
    .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await createActor.destroy()
})


test("POST -> '/api/v1/movies/:id/directors', should return status code 200 and res.body.length === 1", async () => {
    const director = {
        firstName: "Tim",
        lastName: "Burtom",
        nationality: "USA",
        image: "https://foto_random.jpg",
        birthday: "08-16-2023"
    }

    const createDirector = await Director.create(director)
    
    const res = await request(app)
    .post(`/api/v1/movies/${movieId}/directors`)
    .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await createDirector.destroy()
})


test("POST -> '/api/v1/movies/:id/genres', should return status code 200 and res.body.length === 1", async () => {
    const genre = {
        name: "Gore"
    }

    const createGenre = await Genre.create(genre)
    
    const res = await request(app)
    .post(`/api/v1/movies/${movieId}/genres`)
    .send([createGenre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    await createGenre.destroy()
})


test("DELETE -> '/api/v1/movies/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`/api/v1/movies/${movieId}`)

    expect(res.status).toBe(204)
})