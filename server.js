const express = require('express');
const logger = require('morgan');
const uuid = require('node-uuid');
const next = require('next');
const path = require('path');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const nextApp = next({ dir: '.', dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare()
    .then(() => {
      const server = express();

      if (!dev) {
        server.enable('trust proxy', 'uniquelocal');

        // Enforce SSL in production
        server.use(function(req, res, next) {
          var proto = req.protocol;
          if (proto === "https") {
            return next();
          }
          res.redirect("https://" + req.headers.host + req.url);
        });
      }

      // Use Heroku's request ID (or a new UUID)
      // https://devcenter.heroku.com/articles/http-request-id
      logger.token('id', req => req.get('X-Request-ID') || uuid.v4() );
      server.use(logger(':id :remote-addr :date[iso] :method :url '
        +'HTTP/:http-version :status :response-time ms - :res[content-length]'));
      
      // Static files
      // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
      server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
      }));

      // Default catch-all renders Next app
      server.get('*', (req, res) => {
        // res.set({
        //   'Cache-Control': 'public, max-age=3600'
        // });
        const parsedUrl = url.parse(req.url, true);
        nextHandler(req, res, parsedUrl);
      });

      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Node worker ${process.pid}: listening on port ${port}`);
      });
    });
}