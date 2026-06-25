import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';
import { getMongoDBConnectionString } from '../config';

/**
 * Seed the octofit_db database with test data
 *
 * This script initializes the OctoFit database with realistic sample data
 * for development and testing purposes.
 */

async function seedDatabase() {
  try {
    const mongoDBUri = getMongoDBConnectionString();
    console.log('Connecting to MongoDB at:', mongoDBUri);

    await mongoose.connect(mongoDBUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared');

    // Create sample users
    console.log('\n👥 Creating sample users...');
    const users = await User.create([
      {
        username: 'alex_runner',
        email: 'alex@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Alex',
          lastName: 'Johnson',
          bio: 'Running enthusiast and fitness lover',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        },
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Jordan',
          lastName: 'Smith',
          bio: 'Cycling and mountain biking expert',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
        },
      },
      {
        username: 'casey_swimmer',
        email: 'casey@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Casey',
          lastName: 'Williams',
          bio: 'Competitive swimmer and triathlon athlete',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey',
        },
      },
      {
        username: 'morgan_weightlifter',
        email: 'morgan@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Morgan',
          lastName: 'Lee',
          bio: 'Strength training and bodybuilding coach',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan',
        },
      },
      {
        username: 'sam_yogi',
        email: 'sam@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Sam',
          lastName: 'Chen',
          bio: 'Yoga instructor and wellness advocate',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
        },
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample teams
    console.log('\n🤝 Creating sample teams...');
    const teams = await Team.create([
      {
        name: 'Morning Runners Club',
        description: 'For those who love running early in the morning',
        createdBy: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Strength Builders',
        description: 'Dedicated to weightlifting and muscle building',
        createdBy: users[3]._id,
        members: [users[3]._id, users[1]._id, users[4]._id],
      },
      {
        name: 'Fitness Warriors',
        description: 'All-around fitness and wellness community',
        createdBy: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id],
      },
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create sample activities
    console.log('\n🏃 Creating sample activities...');
    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        intensity: 'high',
        notes: 'Morning run at the park',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[0]._id,
        type: 'running',
        duration: 30,
        distance: 5.2,
        calories: 420,
        intensity: 'medium',
        notes: 'Easy evening run',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 60,
        distance: 32,
        calories: 750,
        intensity: 'high',
        notes: 'Mountain bike trail',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 45,
        distance: 2.5,
        calories: 550,
        intensity: 'medium',
        notes: 'Lap swimming at the pool',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[3]._id,
        type: 'weightlifting',
        duration: 90,
        calories: 600,
        intensity: 'high',
        notes: 'Upper body strength training',
        date: new Date(),
      },
      {
        user: users[4]._id,
        type: 'yoga',
        duration: 60,
        calories: 300,
        intensity: 'low',
        notes: 'Relaxing evening yoga session',
        date: new Date(),
      },
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    console.log('\n🏆 Creating sample leaderboard entries...');
    const leaderboardEntries = await Leaderboard.create([
      {
        user: users[0]._id,
        team: teams[2]._id,
        score: 1650,
        rank: 1,
        totalActivities: 12,
        totalCalories: 8450,
      },
      {
        user: users[1]._id,
        team: teams[2]._id,
        score: 1320,
        rank: 2,
        totalActivities: 8,
        totalCalories: 6200,
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        score: 990,
        rank: 3,
        totalActivities: 6,
        totalCalories: 3300,
      },
      {
        user: users[3]._id,
        team: teams[2]._id,
        score: 1100,
        rank: 4,
        totalActivities: 10,
        totalCalories: 5500,
      },
      {
        user: users[4]._id,
        team: teams[2]._id,
        score: 800,
        rank: 5,
        totalActivities: 5,
        totalCalories: 1500,
      },
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    console.log('\n💪 Creating sample workouts...');
    const workouts = await Workout.create([
      {
        user: users[0]._id,
        title: '5K Running Training',
        description: 'Beginner-friendly 5K race preparation program',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 10 },
          { name: 'Main run', sets: 1, reps: 1 },
          { name: 'Cool-down walk', sets: 1, reps: 10 },
        ],
      },
      {
        user: users[3]._id,
        title: 'Full Body Strength',
        description: 'Complete upper and lower body workout',
        difficulty: 'intermediate',
        duration: 90,
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Squats', sets: 4, reps: 10, weight: 225 },
          { name: 'Deadlifts', sets: 3, reps: 5, weight: 275 },
          { name: 'Pull-ups', sets: 3, reps: 10 },
        ],
      },
      {
        user: users[4]._id,
        title: 'Morning Yoga Flow',
        description: 'Energizing yoga routine for morning practice',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          { name: 'Sun Salutation A', sets: 5, reps: 1 },
          { name: 'Standing poses', sets: 3, reps: 1 },
          { name: 'Balance poses', sets: 2, reps: 1 },
          { name: 'Cool-down stretch', sets: 1, reps: 10 },
        ],
      },
      {
        user: users[1]._id,
        title: 'Cycling Endurance Builder',
        description: 'Build cycling stamina with this long-distance program',
        difficulty: 'advanced',
        duration: 120,
        exercises: [
          { name: 'Warm-up ride', sets: 1, reps: 15 },
          { name: 'Steady state ride', sets: 1, reps: 90 },
          { name: 'Cool-down ride', sets: 1, reps: 15 },
        ],
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    // Update users to include teams
    await User.findByIdAndUpdate(users[0]._id, {
      teams: [teams[0]._id, teams[2]._id],
    });
    await User.findByIdAndUpdate(users[1]._id, {
      teams: [teams[0]._id, teams[1]._id, teams[2]._id],
    });
    await User.findByIdAndUpdate(users[2]._id, {
      teams: [teams[0]._id, teams[2]._id],
    });
    await User.findByIdAndUpdate(users[3]._id, {
      teams: [teams[1]._id, teams[2]._id],
    });
    await User.findByIdAndUpdate(users[4]._id, {
      teams: [teams[1]._id, teams[2]._id],
    });
    console.log('✅ Updated users with team associations');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Teams: ${teams.length}`);
    console.log(`   Activities: ${activities.length}`);
    console.log(`   Leaderboard entries: ${leaderboardEntries.length}`);
    console.log(`   Workouts: ${workouts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
