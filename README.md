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