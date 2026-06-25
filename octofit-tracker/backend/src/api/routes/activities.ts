import express, { Router, Request, Response } from 'express';
import Activity from '../../models/Activity';

const router: Router = express.Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username email')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get user activities
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, type, duration, calories, distance, intensity, notes, date } = req.body;

    if (!user || !type || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const activity = new Activity({
      user,
      type,
      duration,
      calories,
      distance,
      intensity,
      notes,
      date: date || new Date(),
    });

    const savedActivity = await activity.save();
    const populatedActivity = await savedActivity.populate('user', 'username email');

    res.status(201).json(populatedActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'username email');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
