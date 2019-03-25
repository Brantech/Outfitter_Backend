To test, run 'docker-compose build' at the root, and then 'docker-compose up'

Routes for testing:

    - /garments                         - GET, POST
    - /garments/:garment_id             - GET, PATCH, PUT, DELETE
    - /garmentcombos                    - GET

    - /users                            - GET, POST
    - /users/:user_id                   - GET, PATCH, PUT, DELETE

    - /wardrobe/:user_id                - GET, POST
    - /wardrobe/update/:wardrobe_id     - GET, PATCH, PUT, DELETE
    - /wardrobe/wardrobecombos/:user_id - GET
# Skeleton project for Swagger
For testing: if you would like to test requests that are not yet implemented in swagger.yaml, then you must comment out the entire path. For instance, if POST for /users is not yet implemented in swagger.yaml, you must comment out all of /users
