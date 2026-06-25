import express, { Router, Request, Response } from 'express';
import { Workout } from '../models';

const router: Router = express.Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('user', 'username email');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get user workouts
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('user', 'username email');

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, title, description, exercises, difficulty, duration } = req.body;

    if (!user || !title || !description || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workout = new Workout({
      user,
      title,
      description,
      exercises,
      difficulty,
      duration,
    });

    const savedWorkout = await workout.save();
    const populatedWorkout = await savedWorkout.populate('user', 'username email');

    res.status(201).json(populatedWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'username email');

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
