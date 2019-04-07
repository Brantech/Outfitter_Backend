module.exports = {
    environment: process.env.NODE_ENV,
    port: '3000',
    cognito: {
        region: "us-east-1",
        userPoolId: process.env.USER_POOL_ID,
        clientId: process.env.CLIENT_ID
    },
    database: 'mongodb://mongo:27017/outfittr',
    debugId: 'outfittr-api',
    cors: {
        origins: [/\.outfittr\.net$/]
    }
};