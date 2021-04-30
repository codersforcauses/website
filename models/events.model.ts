import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      trim: true,
      maxLength: [128, 'Name cannot be more than 128 characters'],
      required: [true, 'Event name is required']
    },
    slug: {
      type: String,
      index: true,
      trim: true,
      unique: [true, 'Event slug must be unique'],
      maxLength: [
        256,
        'Identifying event slug cannot be more than 256 characters'
      ],
      required: [true, 'Event slug is required']
    },
    description: {
      type: String,
      trim: true,
      maxLength: [2048, 'Description must be less than 2048 characters'],
      required: [true, 'Event description is required']
    },
    venue: [
      {
        name: String,
        location: {
          address: {
            type: String,
            required: true
          },
          // Coordinates stores as [lng, lat]
          coordinates: {
            type: [Number],
            required: true
          }
        }
      }
    ],
    times: [
      {
        from: {
          type: Date,
          required: true,
          index: true
        },
        to: {
          type: Date,
          required: true,
          index: true
        }
      }
    ],
    requirements: [{ type: String, maxLength: 128, trim: true }],
    imageLinks: [String],
    type: [
      {
        type: String,
        enum: ['workshop', 'industry_night', 'social', 'other'],
        default: 'other'
      }
    ],
    price: {
      member: { type: Number, default: 0 },
      nonMember: { type: Number, default: 0 }
    },
    members: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
