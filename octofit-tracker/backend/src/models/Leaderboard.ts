import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  totalActivities: number;
  totalCalories: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

leaderboardSchema.index({ team: 1, score: -1 });

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
