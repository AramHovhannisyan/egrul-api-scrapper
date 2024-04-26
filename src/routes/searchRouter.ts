import express from 'express';
import ApiController from '../controllers/ApiController';
import DataController from '../controllers/DataController';
import validateAndSetSearchString from '../middlewares/validateAndSetSearchString';

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search for items
 *     description: Retrieve a list of all items from local DB or from https://egrul.nalog.ru/index.html
 *     parameters:
 *       - in: query
 *         name: string
 *         required: true
 *         description: The keyword to search - ИНН или ОГРН (ОГРНИП) или наименование ЮЛ, ФИО ИП
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: stopped
 *         required: false
 *         description: Indicates if the activity has been terminated 
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   shortName:
 *                     type: string
 *                   inn:
 *                     type: string
 *                   title:
 *                     type: string
 *                   gosRegNum:
 *                     type: string
 *                   kpp:
 *                     type: string
 *                   registeredAt:
 *                     type: string
 *                   stoppedAt:
 *                     type: string
 *                   stopped:
 *                     type: string
 */

const searchRouter = express.Router();

searchRouter.route('/')
  .get(validateAndSetSearchString, DataController.getAll, ApiController.searchData);

export default searchRouter;
