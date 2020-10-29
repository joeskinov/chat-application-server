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

exports.RoomMessage = require('./model')
exports.schema = require('./model').schema

const router = new Router()
const { message, chatRoom, status, deleted, owner,created } = schema.tree

/**
 * @api {post} /deliveryOrders Create delivery order
 * @apiName CreateDeliveryOrder
 * @apiGroup RoomMessage
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Delivery order's title.
 * @apiParam description Delivery order's description.
 * @apiParam parcel_by_size Delivery order's parcel_by_size.
 * @apiParam parcel Delivery order's parcel.
 * @apiParam delivery_address Delivery order's delivery_address.
 * @apiParam pickup_address Delivery order's pickup_address.
 * @apiParam budget Delivery order's budget.
 * @apiParam status Delivery order's status.
 * @apiParam deleted Delivery order's deleted.
 * @apiParam deliverer Delivery order's deliverer.
 * @apiParam owner Delivery order's owner.
 * @apiParam created Delivery order's created.
 * @apiSuccess {Object} deliveryOrder Delivery order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ message, chatRoom, status, deleted, owner, created }),
  create)

/**
 * @api {get} /deliveryOrders Retrieve delivery orders
 * @apiName RetrieveDeliveryOrders
 * @apiGroup RoomMessage
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} deliveryOrders List of delivery orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query({ message, chatRoom, status, deleted, owner, created }),
  index)

/**
 * @api {get} /deliveryOrders/:id Retrieve delivery order
 * @apiName RetrieveDeliveryOrder
 * @apiGroup RoomMessage
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
 * @apiGroup RoomMessage
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Delivery order's title.
 * @apiParam description Delivery order's description.
 * @apiParam parcel_by_size Delivery order's parcel_by_size.
 * @apiParam parcel Delivery order's parcel.
 * @apiParam delivery_address Delivery order's delivery_address.
 * @apiParam pickup_address Delivery order's pickup_address.
 * @apiParam budget Delivery order's budget.
 * @apiParam status Delivery order's status.
 * @apiParam deleted Delivery order's deleted.
 * @apiParam deliverer Delivery order's deliverer.
 * @apiParam owner Delivery order's owner.
 * @apiParam created Delivery order's created.
 * @apiSuccess {Object} deliveryOrder Delivery order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery order not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ message, chatRoom, status, deleted, owner, created }),
  update)

/**
 * @api {delete} /deliveryOrders/:id Delete delivery order
 * @apiName DeleteDeliveryOrder
 * @apiGroup RoomMessage
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
