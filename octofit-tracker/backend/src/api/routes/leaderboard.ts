import express, { Router, Request, Response } from 'express';
import Leaderboard from '../../models/Leaderboard';

const router: Router = express.Router();

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId })
      .populate('user', 'username email profile')
      .sort({ score: -1 });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user leaderboard position
router.get('/user/:userId/position', async (req: Request, res: Response) => {
  try {
    const position = await Leaderboard.findOne({ user: req.params.userId })
      .populate('user', 'username email profile')
      .populate('team', 'name');

    if (!position) {
      return res.status(404).json({ error: 'User not found in leaderboard' });
    }

    res.json(position);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user position' });
  }
});

// Update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { score, totalActivities, totalCalories } = req.body;

    const leaderboard = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      {
        score,
        totalActivities,
        totalCalories,
      },
      { new: true }
    ).populate('user', 'username email');

    if (!leaderboard) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
});

export default router;
