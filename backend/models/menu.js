const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String
  },
  category: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], 
    required: true 
  },
  calories: {
    type: Number
  },
  ingredients: [{
    type: String
  }],
  instructions: {
    type: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Meal', mealSchema);
