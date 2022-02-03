import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 128,
      index: true,
      trim: true,
      required: true
    },
    slug: {
      type: String,
      maxLength: 128,
      index: true,
      trim: true,
      required: true
    },
    description: {
      type: String,
      maxLength: 2048,
      trim: true,
      required: true
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
