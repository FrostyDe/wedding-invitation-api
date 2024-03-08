import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Import routes
import wedding from './server/api/wedding.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.87.106:5173',
  process.env.WHITELISTED_URL,
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = {
      origin: false,
      optionsSuccessStatus: 200,
    };
  }

  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));
app.use(express.json());

app.use((req, res, next) => {
  const origin = req.header('Origin');
  if (!allowedOrigins.includes(origin)) {
    res
      .status(403)
      .send(
        'The CORS policy for this resource does not allow access from the particular origin.'
      );
    return;
  }
  next();
});

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! The API is working fine.');
});

app.use('/wedding', wedding);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
