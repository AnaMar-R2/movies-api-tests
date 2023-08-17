const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
let actorId

beforeAll(async () => {
    return await Actor.bulkCreate([
        {
            firstName: "Jennifer",
            lastName: "Aniston",
            nationality: "USA",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/JenniferAnistonHWoFFeb2012.jpg/330px-JenniferAnistonHWoFFeb2012.jpg",
            birthday: "02-11-1969"
        },
        {
            firstName: "Megan",
            lastName: "Fox",
            nationality: "USA",
            image: "https://www.losandes.com.ar/resizer/n4kJnAsu1_Vnt9UeA3MMFYGlXlg=/1023x768/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/6XLZF4TEIBHP5NHPPNLW7ZQLYY.webp",
            birthday: "05-16-1986"
        },
    ])
})

const actor = {
    firstName: "Angelina",
    lastName: "Jolie",
    nationality: "USA",
    image: "https://images.hola.com/images/027f-177a2fd31055-0ec9eacc41ea-1000/horizontal-1200/angelina-jolie.jpg",
    birthday: "06-04-1975"
}

test("GET -> '/api/v1/actors', should return status code 200, body is defined and res.body.length === 2", async () => {
    const res = await request(app)
    .get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
});


test("POST -> '/api/v1/actors', should return status code 201, body is defined, and res.body.firstName === actor.firstName ", async () => {
    const res = await request(app)
    .post('/api/v1/actors')
    .send(actor)
    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


test("GET -> '/api/v1/actors/:id', should return status code 200, body is defined, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
    .get(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});


test("PUT -> '/api/v1/actors/:id', should return status code 200, body is defined and res.body.firstName === actorUpdate.firstName", async () => {
    const actorUpdate = {
        firstName: "Ana",
        lastName: "Ruiz",
    }

    const res = await request(app)
    .put(`/api/v1/actors/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
    expect(res.body.lastName).toBe(actorUpdate.lastName)
})


test("DELETE -> '/api/v1/actors/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(204)
})