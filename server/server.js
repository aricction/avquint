import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import app from './app.js';
import taskRouters from './routes/taskRoutes.js';
import authRouters from './routes/authRoutes.js';

dotenv.config();
app.use(cors());

app.use('/api/auth', authRouters);
app.use('/api/tasks', taskRouters);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

