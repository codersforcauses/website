import mongoose from 'mongoose'
import { UserModel } from '@helpers/global'

const UserSchema = new mongoose.Schema<UserModel>(
  {
    firstName: {
      type: String,
      maxLength: [64, 'First name is more than 64 characters'],
      index: true,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      maxLength: [64, 'Last name is more than 64 characters'],
      index: true,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      maxLength: [128, 'Email is more than 128 characters'],
      index: true,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    clerkID: {
      type: String,
      index: true,
      trim: true,
      required: true
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
      maxLength: [512, 'Your bio is more than 512 characters'],
      trim: true,
      default: ''
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
          maxLength: [64, 'This username is more than 64 characters'],
          trim: true
        },
        link: {
          type: String,
          maxLength: [128, 'The URL is more than 128 characters'],
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
    cards: [
      {
        token: {
          type: String,
          trim: true,
          required: true
        },
        details: {
          brand: {
            type: String,
            enum: [
              'VISA',
              'MASTERCARD',
              'DISCOVER',
              'DISCOVER_DINERS',
              'JCB',
              'AMERICAN_EXPRESS',
              'CHINA_UNIONPAY'
            ],
            required: true
          },
          last4: {
            type: String,
            trim: true,
            required: true
          },
          expMonth: {
            type: Number,
            required: true
          },
          expYear: {
            type: Number,
            required: true
          }
        },
        updatedAt: Date
      }
    ]
  },
  {
    timestamps: true
  }
)

export default (mongoose.models.User as mongoose.Model<UserModel>) ||
  mongoose.model<UserModel>('User', UserSchema)
