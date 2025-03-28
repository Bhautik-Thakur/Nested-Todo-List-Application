const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sync models with MySQL database
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(error => console.error('Error syncing database:', error));

// Routes
app.use('/api/tasks', taskRoutes);

module.exports = app;