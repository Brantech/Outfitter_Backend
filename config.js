module.exports = {
    'ENV': process.env.NODE_ENV,
    'PORT': process.env.PORT || '3000',
    'SECRET': process.env.SECRET,
    'DATABASE': '',
    'API_DEBUG': 'outfittr-api:server',
    'ORIGINS': [/\.outfittr\.net$/]
};