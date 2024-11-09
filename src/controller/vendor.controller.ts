import { Request, Response } from 'express';
import VendorService from '../services/vendor.service';  // Adjust path as necessary

class VendorController {
  private vendorService: VendorService;

  constructor(vendorService: VendorService) {
    this.vendorService = vendorService;
  }

  // Create a new vendor
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;
      const vendor = await this.vendorService.createVendor({ email, name, password });
      res.status(201).json({ message: 'Vendor created successfully', vendor });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Login a vendor
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const vendor = await this.vendorService.loginVendor(email, password);
      if (vendor) {
        res.status(200).json({ message: 'Login successful', vendor });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Authenticate a vendor by ID
  public async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vendor = await this.vendorService.authenticateVendor(id);
      if (vendor) {
        res.status(200).json({ message: 'Vendor authenticated', vendor });
      } else {
        res.status(404).json({ error: 'Vendor not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default VendorController;
