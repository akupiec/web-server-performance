import Fastify from 'fastify'

const fastify = Fastify({
    logger: false
})

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200)
    return {message: "Hello, World 👋!"}
})

fastify.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
    if (err) throw err
})
