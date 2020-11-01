const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const roomMessageSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  chatRoom: {
    type: Schema.ObjectId,
    ref: 'ChatRoom',
    required: true
  },
  message: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  created: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

roomMessageSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      message: this.message,
      deleted: this.deleted,
      created: this.created,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('RoomMessage', roomMessageSchema)

exports.schema = model.schema
exports.model = model
