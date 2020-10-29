const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

/* {
  name: "Alex Steward",
  message: "Lorem ipsum dolor sit",
  avatar: "default-avatar.png",
  when: "Yesterday",
  toRespond: 0,
  seen: false,
  active: false
} */
const chatRoomSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ],
  name: {
    type: String
  },
  room_type: {
    type: String
  },
  status: {
    type: String
  },
  deleted: {
    type: Boolean
  },
  seen: {
    type: Boolean
  },
  avatar: {
    type: String
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

chatRoomSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      name: this.name,
      participants: this.participants,
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

const model = mongoose.model('ChatRoom', chatRoomSchema)

exports.schema = model.schema
exports.model = model
