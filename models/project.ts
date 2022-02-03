import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
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
      unique: true,
      required: true
    },
    description: {
      type: String,
      maxLength: 2048,
      trim: true,
      required: true
    },
    type: [
      {
        type: String,
        enum: ['web', 'mobile_app', 'desktop_app'],
        default: 'web',
        index: true
      }
    ],
    client: [
      {
        name: {
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
        email: {
          type: String,
          maxLength: 128,
          index: true,
          trim: true,
          lowercase: true,
          required: true
        }
      }
    ],
    startDate: {
      type: Date,
      required: true,
      index: true
    },
    endDate: {
      type: Date,
      index: true
    },
    imageLinks: [String],
    impact: [{ type: String, maxLength: 256, trim: true }],
    links: [
      {
        type: {
          type: String,
          enum: [
            'github',
            'gitlab',
            'bitbucket',
            'app_store',
            'play_store',
            'website'
          ],
          required: true
        },
        link: {
          type: String,
          maxLength: 256,
          trim: true
        }
      }
    ],
    tech: [
      {
        type: String,
        maxLength: 64,
        index: true
      }
    ],
    members: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema)
