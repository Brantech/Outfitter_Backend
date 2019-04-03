module.exports = {
    'ENV': process.env.NODE_ENV,
    'PORT': '3000',
    'COGNITO_CONFIG': {
        region: "us-east-1",
        cognitoUserPoolId: process.env.USER_POOL,
        tokenUse: "access"
    },
    'DATABASE': 'mongodb://mongo:27017/outfittr',
    'API_DEBUG': 'outfittr-api',
    'ORIGINS': [/\.outfittr\.net$/]
};