
/**
 * Backend Model for ShareCircle using Express.js and MongoDB
 * 
 * This is a conceptual implementation that could be used to power the ShareCircle application.
 * For an actual implementation, you would set up a proper project structure.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// MongoDB connection (replace with actual connection string)
mongoose.connect('mongodb://localhost:27017/sharecircle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'recipient', 'both'], default: 'both' },
  location: { type: String },
  joinedAt: { type: Date, default: Date.now },
  donations: { type: Number, default: 0 },
  requestsMade: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
});

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  weight: { type: String },
  dimensions: { type: String },
  location: { type: String, required: true },
  images: [{ type: String }],
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'pending', 'claimed', 'delivered'], default: 'available' },
  pickupOnly: { type: Boolean, default: false },
  datePosted: { type: Date, default: Date.now },
});

const requestSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  logisticsType: { type: String, enum: ['pickup', 'delivery'], required: true },
  dateRequested: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  answer: { type: String },
  dateAsked: { type: Date, default: Date.now },
  dateAnswered: { type: Date },
});

const logisticsSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  type: { type: String, enum: ['pickup', 'delivery'], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'scheduled', 'in_progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  scheduledDate: { type: Date },
  cost: { type: Number },
  trackingNumber: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create models
const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Request = mongoose.model('Request', requestSchema);
const Question = mongoose.model('Question', questionSchema);
const Logistics = mongoose.model('Logistics', logisticsSchema);

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded._id);
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already in use.' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret', { expiresIn: '7d' });
    
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }
    
    // Generate token
    const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret', { expiresIn: '7d' });
    
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Item routes
app.post('/api/items', authenticate, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, category, condition, weight, dimensions, location, pickupOnly } = req.body;
    
    // Process uploaded images
    const imageFiles = req.files;
    const imagePaths = imageFiles.map(file => `/uploads/${file.filename}`);
    
    const item = new Item({
      title,
      description,
      category,
      condition,
      weight: weight || undefined,
      dimensions: dimensions || undefined,
      location,
      images: imagePaths,
      donor: req.user._id,
      pickupOnly: pickupOnly === 'true'
    });
    
    await item.save();
    
    // Update user's donation count
    await User.findByIdAndUpdate(req.user._id, { $inc: { donations: 1 } });
    
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const { category, search, sort, maxDistance, location } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only show available items
    query.status = 'available';
    
    // Execute query
    let items = await Item.find(query).populate('donor', 'name joinedAt donations rating');
    
    // Apply sorting
    if (sort === 'newest') {
      items = items.sort((a, b) => b.datePosted - a.datePosted);
    } else if (sort === 'oldest') {
      items = items.sort((a, b) => a.datePosted - b.datePosted);
    }
    
    // In a real application, distance calculation would be more sophisticated
    // using geospatial queries and coordinates
    
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('donor', 'name joinedAt donations rating');
    
    if (!item) {
      return res.status(404).send({ error: 'Item not found.' });
    }
    
    // Get questions for the item
    const questions = await Question.find({ item: req.params.id })
      .populate('user', 'name')
      .sort({ dateAsked: -1 });
    
    res.send({ item, questions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Request routes
app.post('/api/requests', authenticate, async (req, res) => {
  try {
    const { itemId, message, logisticsType } = req.body;
    
    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found.' });
    }
    
    // Check if item is available
    if (item.status !== 'available') {
      return res.status(400).send({ error: 'Item is no longer available.' });
    }
    
    // Check if user has already requested this item
    const existingRequest = await Request.findOne({ 
      item: itemId, 
      requester: req.user._id,
      status: { $in: ['pending', 'approved'] }
    });
    
    if (existingRequest) {
      return res.status(400).send({ error: 'You have already requested this item.' });
    }
    
    // Create request
    const request = new Request({
      item: itemId,
      requester: req.user._id,
      message,
      logisticsType
    });
    
    await request.save();
    
    // Update user's request count
    await User.findByIdAndUpdate(req.user._id, { $inc: { requestsMade: 1 } });
    
    res.status(201).send(request);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/requests', authenticate, async (req, res) => {
  try {
    const { type } = req.query;
    let requests;
    
    if (type === 'received') {
      // Get requests for items the user has donated
      const userItems = await Item.find({ donor: req.user._id }).select('_id');
      const itemIds = userItems.map(item => item._id);
      
      requests = await Request.find({ item: { $in: itemIds } })
        .populate('item')
        .populate('requester', 'name')
        .sort({ dateRequested: -1 });
    } else {
      // Get requests made by the user
      requests = await Request.find({ requester: req.user._id })
        .populate({
          path: 'item',
          populate: { path: 'donor', select: 'name' }
        })
        .sort({ dateRequested: -1 });
    }
    
    res.send(requests);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch('/api/requests/:id', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the request
    const request = await Request.findById(req.params.id).populate('item');
    
    if (!request) {
      return res.status(404).send({ error: 'Request not found.' });
    }
    
    // Check if user owns the item
    if (request.item.donor.toString() !== req.user._id.toString()) {
      return res.status(403).send({ error: 'Not authorized to update this request.' });
    }
    
    // Update request status
    request.status = status;
    await request.save();
    
    // If approved, update item status
    if (status === 'approved') {
      request.item.status = 'pending';
      await request.item.save();
    }
    
    res.send(request);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Question routes
app.post('/api/questions', authenticate, async (req, res) => {
  try {
    const { itemId, text } = req.body;
    
    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found.' });
    }
    
    const question = new Question({
      item: itemId,
      user: req.user._id,
      text
    });
    
    await question.save();
    
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.patch('/api/questions/:id/answer', authenticate, async (req, res) => {
  try {
    const { answer } = req.body;
    
    // Find the question
    const question = await Question.findById(req.params.id).populate('item');
    
    if (!question) {
      return res.status(404).send({ error: 'Question not found.' });
    }
    
    // Check if user owns the item
    if (question.item.donor.toString() !== req.user._id.toString()) {
      return res.status(403).send({ error: 'Not authorized to answer this question.' });
    }
    
    // Update question
    question.answer = answer;
    question.dateAnswered = new Date();
    await question.save();
    
    res.send(question);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Logistics routes
app.post('/api/logistics', authenticate, async (req, res) => {
  try {
    const { requestId, type, scheduledDate, cost, notes } = req.body;
    
    // Check if request exists
    const request = await Request.findById(requestId)
      .populate('item')
      .populate('requester');
    
    if (!request) {
      return res.status(404).send({ error: 'Request not found.' });
    }
    
    // Check authorization (either requester or donor can set up logistics)
    const isRequester = request.requester._id.toString() === req.user._id.toString();
    const isDonor = request.item.donor.toString() === req.user._id.toString();
    
    if (!isRequester && !isDonor) {
      return res.status(403).send({ error: 'Not authorized to arrange logistics for this request.' });
    }
    
    const logistics = new Logistics({
      request: requestId,
      type,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
      cost,
      notes
    });
    
    await logistics.save();
    
    // Update request and item status if needed
    if (request.status === 'approved') {
      request.item.status = 'claimed';
      await request.item.save();
    }
    
    res.status(201).send(logistics);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.patch('/api/logistics/:id', authenticate, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['status', 'scheduledDate', 'trackingNumber', 'notes'];
    const updateKeys = Object.keys(updates);
    
    // Validate update fields
    const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));
    if (!isValidUpdate) {
      return res.status(400).send({ error: 'Invalid update fields.' });
    }
    
    // Find logistics
    const logistics = await Logistics.findById(req.params.id)
      .populate({
        path: 'request',
        populate: [
          { path: 'item' },
          { path: 'requester' }
        ]
      });
    
    if (!logistics) {
      return res.status(404).send({ error: 'Logistics arrangement not found.' });
    }
    
    // Check authorization
    const isRequester = logistics.request.requester._id.toString() === req.user._id.toString();
    const isDonor = logistics.request.item.donor.toString() === req.user._id.toString();
    
    if (!isRequester && !isDonor) {
      return res.status(403).send({ error: 'Not authorized to update this logistics arrangement.' });
    }
    
    // Apply updates
    updateKeys.forEach(key => logistics[key] = updates[key]);
    logistics.updatedAt = new Date();
    
    await logistics.save();
    
    // If completed, update item status
    if (updates.status === 'completed') {
      logistics.request.item.status = 'delivered';
      await logistics.request.item.save();
    }
    
    res.send(logistics);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Admin route example (would require admin authentication middleware)
app.get('/api/admin/stats', (req, res) => {
  // This would be protected by admin authentication
  res.send({
    itemsShared: 2580,
    wasteDiverted: 1450, // kg
    membersHelped: 865
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For testing purposes
