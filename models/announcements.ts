import mongoose from 'mongoose'
import { AnnouncementModel } from '@lib/types'

const AnnouncementSchema = new mongoose.Schema<AnnouncementModel>(
  {
    color: {
      type: String,
      enum: ['accent', 'success', 'danger', 'warning'],
      default: 'accent'
    },
    html: {
      type: String,
      maxLength: [256, "Announcements shouldn't be more than 256 characters"],
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default (mongoose.models
  .Announcement as mongoose.Model<AnnouncementModel>) ||
  mongoose.model<AnnouncementModel>('Announcement', AnnouncementSchema)
