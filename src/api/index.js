const album = require('../api/modules/album/albumRouter')
const musician = require('../api/modules/musicians/musicianRouter')



exports.loadRoutes = (app, prefix) => {
  app.use('/album', album);
  app.use('/musician', musician);
};
