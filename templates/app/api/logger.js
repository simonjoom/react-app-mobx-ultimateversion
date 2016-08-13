
var error,log;
error = console.log.bind(error);
log = console.log.bind(log);

function logInit() {
  log('------------------------------------------');
  log('--------------- RFX STACK ----------------');
  log('------------------------------------------');
}

function logServerConfig(type = null) {
  const port = type === 'API' ? process.env['API_PORT'] : process.env['WEB_PORT'];
  const host = type === 'API' ? process.env['API_HOST'] : process.env['WEB_HOST'];

  const url = ['http://', host, ':', port].join('');

  if (type === 'API') {
    log('------------------------------------------');
    log('API Listening at:', url);
    log('------------------------------------------');
    log('Database Host:', process.env['DB_HOST']);
    log('Database Name:', process.env['DB_NAME']);
    log('Database Port:', process.env['DB_PORT']);
    log('------------------------------------------');
  }

  if (type !== 'API') {
    log('WEB Listening at:', url);
    log('Environment:', process.env['NODE_ENV']);
    log('------------------------------------------');
    log('IO Host:', process.env['IO_HOST']);
    log('IO Port:', process.env['IO_PORT']);
    log('------------------------------------------');
  }
}

export { log,error, logInit, logServerConfig };
