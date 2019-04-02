module.exports = {
    'ENV': process.env.NODE_ENV,
    'PORT': process.env.PORT || '3000',
    'SECRET': process.env.SECRET,
    'COGNITO_CONFIG': {
        region: "us-east-1",
        cognitoUserPoolId: "us-east-1_bBfUzR7Vr",
        tokenUse: "access"
    },
    'DATABASE': '',
    'API_DEBUG': 'outfittr-api:server',
    'ORIGINS': [/\.outfittr\.net$/]
};