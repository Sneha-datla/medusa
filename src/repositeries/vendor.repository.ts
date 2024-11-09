import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from 'src/models/vendor'; // Adjust the path to your actual model

@EntityRepository(Vendor)
class VendorRepository extends Repository<Vendor> {}

export default VendorRepository;
