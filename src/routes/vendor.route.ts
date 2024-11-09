// routes/vendor.routes.ts
import { Router } from 'express';
import { AppDataSource } from 'src/datasource';  // Import your database connection setup
import VendorService from 'src/services/vendor.service';  // Adjust path accordingly


const router = Router();

// Obtain the EntityManager from the AppDataSource
const entityManager = AppDataSource.manager;

// Instantiate the VendorService with the EntityManager
const vendorService = new VendorService({ manager: entityManager });

// Route for creating a vendor (sign-up)
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const vendor = await vendorService.createVendor({ email, name, password });
    res.status(201).json({ message: 'Vendor created successfully', vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for vendor login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await vendorService.loginVendor(email, password);
    if (vendor) {
      res.status(200).json({ message: 'Login successful', vendor });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for authenticating a vendor (checking if vendor exists by ID)
router.get('/authenticate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await vendorService.authenticateVendor(id);
    if (vendor) {
      res.status(200).json({ message: 'Vendor authenticated', vendor });
    } else {
      res.status(404).json({ error: 'Vendor not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
