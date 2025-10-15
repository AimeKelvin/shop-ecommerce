import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import listRoutes from './routes/list.js';
import docsRoute from './routes/docs.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('combined'));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/list', listRoutes);

// Swagger UI at /api/docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/docs-json', (req, res) => res.json(swaggerSpec));

// health + docs route
app.use('/', docsRoute);

// Error handler (last)
app.use(errorHandler);

export default app;
