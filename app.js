import express from 'express';
import morgan from 'morgan';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoter.js';
import salesRoute from './routes/salesRoute.js';
import swaggerDocs from './docs/swagger.js';
import swaggerUI from 'swagger-ui-express';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './controllers/errorController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 *  @swagger
 * /product:
 *   post:
 *     tags:
 *       - product
 *     summary: Create product
 *     description: Create product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Error
 *   get:
 *     tags:
 *       - product
 *     summary: Get all products
 *     description: Get all products
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 * /product/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: Get product
 *     description: Get product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 *   patch:
 *     tags:
 *       - product
 *     summary: Update product
 *     description: Update a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *       - in: body
 *         name: product
 *         required: true
 *         description: Updated product data
 *         schema:
 *           $ref: '#/components/schemas/product'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 *   delete:
 *     tags:
 *       - product
 *     summary: Delete product
 *     description: Delete a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 * /product/outstock:
 *   get:
 *     tags:
 *       - product
 *     summary: Get products that do not have stock
 *     description: Get products that do not have stock
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Error
 * /product/productquantity:
 *   get:
 *     tags:
 *       - product
 *     summary: Get quantity of products
 *     description: Get quantity of products
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Error
 */
app.use('/api/v1/product', productRouter);
/**
 *  @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Login in user
 *     description: Login in user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/singin'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Error
 * /user:
 *   post:
 *     tags:
 *       - users
 *     summary: Create user
 *     description: Create user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Error
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 * /user/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user
 *     description: Get user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 *   patch:
 *     tags:
 *       - users
 *     summary: Update user
 *     description: Update a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Updated user data
 *         schema:
 *           $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete user
 *     description: Delete a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 */
app.use('/api/v1/user', userRouter);
/**
 *  @swagger
 * /sale:
 *   get:
 *     tags:
 *       - sale
 *     summary: Get all sales
 *     description: Get all sales
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 * /sale/{id}:
 *   post:
 *     tags:
 *       - sale
 *     summary: Create sale
 *     description: Create sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 * /sale/totalprofit:
 *   get:
 *     tags:
 *       - sale
 *     summary: Get total profit
 *     description: Get total profit
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Error
 */
app.use('/api/v1/sale', salesRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
