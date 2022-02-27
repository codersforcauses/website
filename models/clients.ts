import mongoose from 'mongoose'
import { ClientModel } from '@helpers/types'

const ClientSchema = new mongoose.Schema<ClientModel>({
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
})

export default (mongoose.models.Project as mongoose.Model<ClientModel>) ||
  mongoose.model<ClientModel>('Project', ClientSchema)
