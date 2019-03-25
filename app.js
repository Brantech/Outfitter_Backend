const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Import routes from routes.js
let apiRoutes = require("./api/routes");

var whitelist = ['http://www.outfittr.net', 'http://3.82.31.148']
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware that adds variables that are shared to all routes. This statement must come before any statements adding
// routes or this middleware will not be used by them.
app.use(function (req, res, next) {
  res.locals = {
    jwk: {
      "keys":
      [
          {
              "alg":"RS256",
              "e":"AQAB",
              "kid":"r59aWNwnX2Zgoap95YQ6JOpMQ8K5N4V0LtuJlXt7OAE=",
              "kty":"RSA",
              "n":"k7VdEiTtMCNs5y3VuwTMBvN4AJVNV836r-PRQCUPnhxZ9UnLeAHBGrg7qByxZ3ZrZ6x4mmpMiMWBl92owl06zTDbj_p3AJDGB-H_yQ6AnxU-A_67K7PQWp1LlGGZx_x7Ivw3YzwZ5tWAeo7OPHlESuyRIczE9WQwSEX7Nvkn4Jw9jvFM71fSaUY4SmF0qV2lnNouqObuChpZ4DrLHpcD_eezLs1Et2PzPdmpRkt0SDOD2tPUKomA7RL4MIHRWnC5g9-UPiv4kHfBsyXzJC2yElcfb3dX8iIlP4D8ydEC02d4QpAh4QE6Jya3LKq7U0G-oAc5Cj5_a8pDYFrDFJWdqw",
              "use":"sig"
              },
              {
                  "alg":"RS256",
                  "e":"AQAB",
                  "kid":"6YCyR6wK9ao3K2Do5uDSd9eqvscDtPCZgu9W3XUkoIc=",
                  "kty":"RSA",
                  "n":"jyIVK7PvVw9zz_e8jKlOBrFRbRVgFn5rPgIk_q6YMO65vQdvhFPOD6FePb_ktsj19eQiP2AsU-3YNkrzOwoC1aMOehcWEbcs6DJn1siAZ9NtGymt1k3Qt6bT4aIBlhrPRrtvWQ3tgIcCr1qpVmar_F33mWOOjKbWeievy5beg-KwYBeeNYb_BE8XUA5JC4V671buykU2vFAfZiCWvb-7drK37eLYKI8hkbiGMf_qKxCq7SxfmPI4dtEdMWB0wM_EfeHY4XxM4UDqcz64PWg4no58_QAa04GMrHUocy8BMv4564bQuTAEiDgNxBf79508Y_tcO4GJzRxmwN7-htYUnQ",
                  "use":"sig"
              }
      ]
    },
  };

  next();
});

app.use('/', apiRoutes);

// Connect to MongoDB using docker image
mongoose
  .connect('mongodb://mongo:27017/outfittr', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// database and port
var db = mongoose.connection;
var port = process.env.PORT || 3000;

// Default url
app.get('/', (req, res) => res.send('Outfittr'));

app.listen(port, () => console.log('Server running on port ' + port));