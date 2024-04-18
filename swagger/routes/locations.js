/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API to manage Cities
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all cities
 *     tags: [Locations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: region name
 *       - in: query
 *         name: street
 *         schema:
 *           type: string
 *         description: street name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/locationSchema'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new city
 *     tags: [Locations]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/locationSchema'
 *     responses:
 *       '200':
 *         description: The list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/locationSchema'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

exports.locationSchema = {
  type: "object",
  properties: {
    Longitude: {
      type: "Number",
    },
    Latitude: {
      type: "Number",
    },
    region: {
      type: "String",
    },
    street: {
      type: "String",
    },
  },
  example: {
    Longitude: 22.42,
    Latitude: 34.22,
    region: "الشهباء الجديدة",
    street: "الفيلات",
  },
  required: ["Longitude","Latitude","region","street"],
};
