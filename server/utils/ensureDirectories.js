import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectories = () => {
  // Define paths relative to project root
  const uploadsDir = path.join(__dirname, '../../public/uploads');
  
  // Create directories if they don't exist
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  console.log('Directories verified successfully');
};

export default ensureDirectories;
