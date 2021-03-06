const userController = require('../controllers/UserController')
const Joi = require('joi')
const { route } = require('express/lib/application')
const router = require('express').Router()

/**
 * @swagger
 * /api/user/addUser:
 *  post:
 *      summary: Creates a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - firstName
 *                          - lastName
 *                          - email
 *                          - password
 *                          - address
 *                          - phoneno
 *                          - country
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          address:
 *                              type: string
 *                          phoneno:
 *                              type: string
 *                          country:
 *                              type: string
 *      responses:
 *          '201':
 *              desription: Created
 * 
*/
router.post('/addUser', userController.addUser)

/**
 * @swagger
 * /api/user/getUser:
 *  get:
 *    summary: Use to request all users
 *    content: 
 *          - application/json
 *    responses:
 *      '200':
 *          description: A successful response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: array
 */

router.get('/getUser', userController.getUser)

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *     summary: Use to fetch one user by id
 *     parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *     content: application/json
 *     responses:
 *          'default':
 *               description: A successful response
 */

router.get('/:id', userController.getOneUser)

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *      summary: Update an user
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *      requestBody:
 *          required: false
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *                          address:
 *                              type: string
 *                          phoneno:
 *                              type: string
 *                          country:
 *                              type: string
 *      responses:
 *          '200':
 *              description: Successfully updated
 */

router.put('/:id', userController.updateUser)

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: Use to delete an user
 *      parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: integer
 *               required: true
 *      content: application/json
 *      responses:
 *              '200':
 *                  desciption: A successful response
 */


router.delete('/:id', userController.deleteUser)

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: User login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: successful
 */

router.post('/login', userController.login)


module.exports = router
