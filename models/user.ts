import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 64,
      index: true,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      maxLength: 64,
      index: true,
      trim: true
    },
    email: {
      type: String,
      maxLength: 128,
      index: true,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    profileImage: {
      type: String,
      trim: true
    },
    isGuildMember: {
      type: Boolean,
      default: false
    },
    bio: {
      type: String,
      maxLength: 512,
      trim: true
    },
    gender: {
      type: String,
      enum: ['female', 'male', 'other'],
      default: 'other'
    },
    dob: Date,
    roles: [
      {
        type: String,
        enum: [
          'admin',
          'HLM',
          'president',
          'vice_president',
          'secretary',
          'treasurer',
          'tech_lead',
          'marketing_officer',
          'OCM',
          'first_year_rep'
        ],
        index: true
      }
    ],
    socials: [
      {
        type: {
          type: String,
          enum: [
            'discord',
            'github',
            'gitlab',
            'bitbucket',
            'linkedin',
            'website'
          ]
        },
        username: {
          type: String,
          maxLength: 64,
          trim: true
        },
        link: {
          type: String,
          maxLength: 128,
          trim: true
        }
      }
    ],
    isFinancialMember: {
      type: Boolean,
      default: false
    },
    tech: [
      {
        type: String,
        trim: true
      }
    ],
    services: [
      {
        type: {
          type: String,
          enum: ['stripe']
        },
        ref: {
          type: String,
          maxLength: 1024
        },
        updatedAt: Date,
        data: {}
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
