// services/vendor.service.ts
import { EntityManager } from "typeorm";
import { Vendor } from "src/models/vendor"; // Import your Vendor model
import bcrypt from "bcryptjs";

interface VendorServiceProps {
  manager: EntityManager;
}

class VendorService {
  private manager: EntityManager;

  constructor({ manager }: VendorServiceProps) {
    this.manager = manager;
  }

  // Create a new vendor
  async createVendor(data: { email: string; name: string; password: string }): Promise<Vendor> {
    const { email, name, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor();
    vendor.email = email;
    vendor.name = name;
    vendor.password = hashedPassword;

    return this.manager.save(vendor);  // Use EntityManager to save the vendor
  }

  // Authenticate vendor by email and password
  async loginVendor(email: string, password: string): Promise<Vendor | null> {
    const vendor = await this.manager.findOne(Vendor, { where: { email } });
    if (vendor && await bcrypt.compare(password, vendor.password)) {
      return vendor;
    }
    return null;  // Return null if authentication fails
  }

  // Check if vendor exists by ID
  async authenticateVendor(id: string): Promise<Vendor | null> {
    return this.manager.findOne(Vendor, { where: { id } });
  }
}

export default VendorService;
