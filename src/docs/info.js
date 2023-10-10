export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API E-Commerce',
            version: '1.0.0',
            description: 'Technologies used: Node, Express, MongoDB'
        },
        servers: [
            { url: 'http://localhost:8080' }
        ]
    },
    apis: ['./src/docs/*.yml']
}