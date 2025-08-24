import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File paths
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');
const ADMIN_FILE = path.join(__dirname, 'data', 'admin.json');

// Ensure data directory exists
await fs.ensureDir(path.join(__dirname, 'data'));

// Initialize admin credentials if not exists
const initializeAdmin = async () => {
  try {
    if (!await fs.pathExists(ADMIN_FILE)) {
      const defaultAdmin = {
        id: 'admin',
        password: await bcrypt.hash('admin123', 10), // Change this password!
        email: 'admin@croxyexim.com'
      };
      await fs.writeJson(ADMIN_FILE, defaultAdmin);
      console.log('Default admin created - ID: admin, Password: admin123');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Initialize inquiries file if not exists
const initializeInquiries = async () => {
  try {
    if (!await fs.pathExists(INQUIRIES_FILE)) {
      await fs.writeJson(INQUIRIES_FILE, { inquiries: [] });
    }
  } catch (error) {
    console.error('Error initializing inquiries file:', error);
  }
};

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Submit inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, product, message } = req.body;
    
    // Validation
    if (!name || !email || !product || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      product,
      message,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Save to file
    const inquiriesData = await fs.readJson(INQUIRIES_FILE).catch(() => ({ inquiries: [] }));
    inquiriesData.inquiries.push(inquiry);
    await fs.writeJson(INQUIRIES_FILE, inquiriesData);

    // Send email notification
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'admin@croxyexim.com',
        subject: `New Inquiry - ${product}`,
        html: `
          <h2>New Product Inquiry</h2>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Date:</strong> ${new Date(inquiry.date).toLocaleString()}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    
    if (!id || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const adminData = await fs.readJson(ADMIN_FILE);
    
    if (id !== adminData.id) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, adminData.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: adminData.id, email: adminData.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get inquiries (admin only)
app.get('/api/admin/inquiries', authenticateToken, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    
    const inquiriesData = await fs.readJson(INQUIRIES_FILE).catch(() => ({ inquiries: [] }));
    let inquiries = inquiriesData.inquiries;

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      inquiries = inquiries.filter(inquiry => 
        inquiry.name.toLowerCase().includes(searchTerm) ||
        inquiry.email.toLowerCase().includes(searchTerm) ||
        inquiry.product.toLowerCase().includes(searchTerm) ||
        inquiry.message.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by status
    if (status && status !== 'all') {
      inquiries = inquiries.filter(inquiry => inquiry.status === status);
    }

    // Sort by date (newest first)
    inquiries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedInquiries = inquiries.slice(startIndex, endIndex);

    res.json({
      inquiries: paginatedInquiries,
      total: inquiries.length,
      page: parseInt(page),
      totalPages: Math.ceil(inquiries.length / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update inquiry status (admin only)
app.patch('/api/admin/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'processed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const inquiriesData = await fs.readJson(INQUIRIES_FILE).catch(() => ({ inquiries: [] }));
    const inquiryIndex = inquiriesData.inquiries.findIndex(inquiry => inquiry.id === id);

    if (inquiryIndex === -1) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    inquiriesData.inquiries[inquiryIndex].status = status;
    await fs.writeJson(INQUIRIES_FILE, inquiriesData);

    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export inquiries as CSV (admin only)
app.get('/api/admin/inquiries/export', authenticateToken, async (req, res) => {
  try {
    const inquiriesData = await fs.readJson(INQUIRIES_FILE).catch(() => ({ inquiries: [] }));
    const inquiries = inquiriesData.inquiries;

    // Sort by date
    inquiries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create CSV content
    const csvHeader = 'Date,Name,Email,Phone,Product,Status,Message\n';
    const csvContent = inquiries.map(inquiry => {
      const date = new Date(inquiry.date).toLocaleString();
      const message = inquiry.message.replace(/"/g, '""'); // Escape quotes
      return `"${date}","${inquiry.name}","${inquiry.email}","${inquiry.phone}","${inquiry.product}","${inquiry.status}","${message}"`;
    }).join('\n');

    const csv = csvHeader + csvContent;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inquiries.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting inquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize and start server
const startServer = async () => {
  await initializeAdmin();
  await initializeInquiries();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch(console.error);