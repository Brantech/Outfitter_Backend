module.exports = {
    environment: process.env.NODE_ENV,
    port: '3000',
    cognito: {
        region: "us-east-1",
        userPoolId: "us-east-1_bBfUzR7Vr",
        clientId: '2qlg1os2kkpdbulfhlt48cptq4'
    },
    database: 'mongodb://mongo:27017/outfittr',
    tfjsModel: 'file://tfjs_artifacts/model.json',
    debugId: 'outfittr-api',
    cors: {
        origins: [/\.outfittr\.net$/]
    }
};