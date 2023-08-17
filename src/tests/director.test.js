const request = require('supertest')
const app = require('../app')
const Director = require('../models/Director')
let directorId

beforeAll(async () => {
    return await Director.bulkCreate([
        {
            firstName: "Ana",
            lastName: "Ruiz",
            nationality: "Venezolana",
            image: "https://foto_random.jpg",
            birthday: "04-23-2004"
        },
        {
            firstName: "Joel",
            lastName: "Quintana",
            nationality: "Venezolano",
            image: "https://foto_random.jpg",
            birthday: "01-27-2001"
        },
    ])
})

const director = {
    firstName: "Alan",
    lastName: "Solis",
    nationality: "Argentino",
    image: "https://foto_random.jpg",
    birthday: "05-24-1996"
}

test("GET -> '/api/v1/directors', should return status code 200, body is defined and res.body.length === 2", async () => {
    const res = await request(app)
    .get('/api/v1/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});


test("POST -> '/api/v1/directors', should return status code 201, body is defined, and res.body.firstName === director.firstName ", async () => {
    const res = await request(app)
    .post('/api/v1/directors')
    .send(director)
    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
    expect(res.body.lastName).toBe(director.lastName)
})


test("GET -> '/api/v1/directors/:id', should return status code 200, body is defined, and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
    .get(`/api/v1/directors/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
    expect(res.body.lastName).toBe(director.lastName)
});


test("PUT -> '/api/v1/directors/:id', should return status code 200, body is defined and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: "Carola",
        lastName: "Rodriguez"
    }

    const res = await request(app)
    .put(`/api/v1/directors/${directorId}`)
    .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
    expect(res.body.lastName).toBe(directorUpdate.lastName)
})


test("DELETE -> '/api/v1/directors/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`/api/v1/directors/${directorId}`)

    expect(res.status).toBe(204)
})