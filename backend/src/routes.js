const express = require('express');
const auth = require('./middlewares/auth');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', auth, OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', auth, ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', auth, IncidentController.create);
routes.delete('/incidents/:id', auth, IncidentController.delete);

module.exports = routes;