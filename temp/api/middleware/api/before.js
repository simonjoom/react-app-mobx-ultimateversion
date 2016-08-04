import bodyParser from 'body-parser';
import cors from 'express-cors';
import { log } from '../../logger'

export default function () {
  log('Init API Middleware: Before');

  const app = this;
app.use(cors({credentials: true,allowedOrigins: [
        'http://localhost:8080', 'http://localhost:3000', 'http://localhost:8000'
    ]}))
 // app.use(cors({ origin: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
