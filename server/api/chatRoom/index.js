let Router = require('express').Router
let query = require('querymen').middleware
let body = require('bodymen').middleware

let token = require('../../services/passport').token
let create = require('./controller').create
let index = require('./controller').index
let show = require('./controller').show
let update = require('./controller').update
let destroy = require('./controller').destroy
let schema =require('./model').schema

exports. ChatRoom = require('./model')
exports.schema = require('./model').schema

const router = new Router()
const { name, participants, owner, created } = schema.tree

/**
 * @api {post} /deliveryOrders Create delivery order
 * @apiName CreateDeliveryOrder
 * @apiGroup ChatRoom
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Delivery order's name.
 * @apiSuccess {Object} deliveryOrder Delivery order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ participants }),
  create)

/**
 * @api {get} /deliveryOrders Retrieve delivery orders
 * @apiName RetrieveDeliveryOrders
 * @apiGroup ChatRoom
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} deliveryOrders List of delivery orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /deliveryOrders/:id Retrieve delivery order
 * @apiName RetrieveDeliveryOrder
 * @apiGroup ChatRoom
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} deliveryOrder Delivery order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /deliveryOrders/:id Update delivery order
 * @apiName UpdateDeliveryOrder
 * @apiGroup ChatRoom
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Delivery order's title.
 * @apiParam created Delivery order's created.
 * @apiSuccess {Object} deliveryOrder Delivery order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, participants}),
  update)

/**
 * @api {delete} /deliveryOrders/:id Delete delivery order
 * @apiName DeleteDeliveryOrder
 * @apiGroup ChatRoom
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

exports.router = router
