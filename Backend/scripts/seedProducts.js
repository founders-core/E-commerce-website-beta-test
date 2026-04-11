// scripts/seedProducts.js
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: join(__dirname, '../.env') });

// Import models (adjust paths based on your actual structure)
import { Product } from '../src/models/product.model.js';
import { Category } from '../src/models/category.model.js';
import { User } from '../src/models/user.model.js';
import { DB_NAME } from '../src/constants.js';

const productsData = [
  // 1. Paver Block – 80mm
  {
    productID: 'PAV-80-001',
    productName: 'Paver block 80mm',
    description: 'Standard 80mm paver block for heavy-duty applications.',
    price: 85,
    stockQuantity: 5000,
    productImage: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-80-ZZ-002',
    productName: 'Paver block 80mm zig zag',
    description: '80mm zig zag paver block for driveways and industrial yards.',
    price: 87,
    stockQuantity: 4000,
    productImage: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.8,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-80-ZZ-RED-003',
    productName: 'Paver block 80mm zig zag red',
    description: '80mm zig zag paver block in red color.',
    price: 89,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-80-ZZ-YEL-004',
    productName: 'Paver block 80mm zig zag yellow',
    description: '80mm zig zag paver block in yellow color.',
    price: 89,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-80-ZZ-BLK-005',
    productName: 'Paver block 80mm zig zag black',
    description: '80mm zig zag paver block in black color.',
    price: 89,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  // 2. Paver Block – 60mm
  {
    productID: 'PAV-60-ZZ-GRY-006',
    productName: 'Paver block 60mm zig zag grey',
    description: '60mm zig zag paver block in grey color.',
    price: 65,
    stockQuantity: 8000,
    productImage: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-ZZ-YEL-007',
    productName: 'Paver block 60mm zig zag yellow',
    description: '60mm zig zag paver block in yellow color.',
    price: 67,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-ZZ-BLK-008',
    productName: 'Paver block 60mm zig zag black',
    description: '60mm zig zag paver block in black color.',
    price: 67,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/1268958/pexels-photo-1268958.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-ZZ-RED-009',
    productName: 'Paver block 60mm zig zag red',
    description: '60mm zig zag paver block in red color.',
    price: 67,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-COS-GRY-010',
    productName: 'Paver block 60mm cosmic',
    description: '60mm cosmic paver block in grey.',
    price: 75,
    stockQuantity: 3000,
    productImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-COS-RED-011',
    productName: 'Paver block 60mm cosmic red',
    description: '60mm cosmic paver block in red.',
    price: 75,
    stockQuantity: 3000,
    productImage: 'https://images.pexels.com/photos/1743222/pexels-photo-1743222.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-COS-YEL-012',
    productName: 'Paver block 60mm cosmic yellow',
    description: '60mm cosmic paver block in yellow.',
    price: 75,
    stockQuantity: 3000,
    productImage: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-COS-BLK-013',
    productName: 'Paver block 60mm cosmic black',
    description: '60mm cosmic paver block in black.',
    price: 75,
    stockQuantity: 3000,
    productImage: 'https://images.pexels.com/photos/1389729/pexels-photo-1389729.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-014',
    productName: 'Paver block 60mm 8/8',
    description: '60mm 8/8 paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-44-GRY-015',
    productName: 'Paver block 60mm 4/4 grey',
    description: '60mm 4/4 paver block in grey.',
    price: 68,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-BLK-016',
    productName: 'Paver block 60mm 8/8 black',
    description: '60mm 8/8 paver block in black.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-44-BLK-017',
    productName: 'Paver block 60mm 4/4 black',
    description: '60mm 4/4 paver block in black.',
    price: 68,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-84-018',
    productName: 'Paver block 60mm 8/4',
    description: '60mm 8/4 paver block.',
    price: 72,
    stockQuantity: 4500,
    productImage: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-DGRY-019',
    productName: 'Paver block 60mm 8/8 dark grey',
    description: '60mm 8/8 paver block in dark grey.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  // 3. Paver Tiles – 25mm
  {
    productID: 'TILE-25-001',
    productName: 'Paver tiles 25mm',
    description: 'Standard 25mm paver tile.',
    price: 55,
    stockQuantity: 4000,
    productImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.3,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-CAD-002',
    productName: 'Paver tiles 25mm cadbury',
    description: '25mm cadbury paver tile.',
    price: 60,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1743222/pexels-photo-1743222.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-CAD-RED-003',
    productName: 'Paver tiles 25mm cadbury red',
    description: '25mm cadbury paver tile in red.',
    price: 60,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-CAD-YEL-004',
    productName: 'Paver tiles 25mm cadbury yellow',
    description: '25mm cadbury paver tile in yellow.',
    price: 60,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-CAD-BLK-005',
    productName: 'Paver tiles 25mm cadbury black',
    description: '25mm cadbury paver tile in black.',
    price: 60,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1389729/pexels-photo-1389729.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-DOT-BLK-006',
    productName: 'Paver tiles 25mm dotted black',
    description: '25mm dotted paver tile in black.',
    price: 62,
    stockQuantity: 2800,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-CIR-RED-007',
    productName: 'Paver tiles 25mm circle red',
    description: '25mm circle paver tile in red.',
    price: 62,
    stockQuantity: 2800,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-DOT-RED-008',
    productName: 'Paver tiles 25mm dotted red',
    description: '25mm dotted paver tile in red.',
    price: 62,
    stockQuantity: 2800,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-DOT-YEL-009',
    productName: 'Paver tiles 25mm dotted yellow',
    description: '25mm dotted paver tile in yellow.',
    price: 62,
    stockQuantity: 2800,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Tiles'
  },
  // 4. Brick Block – 80mm
  {
    productID: 'BRK-80-001',
    productName: 'Brick block 80mm',
    description: 'Standard 80mm brick block.',
    price: 45,
    stockQuantity: 10000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Brick Blocks'
  },
  {
    productID: 'BRK-80-RED-002',
    productName: 'Brick block 80mm red',
    description: '80mm brick block in red.',
    price: 45,
    stockQuantity: 10000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Brick Blocks'
  },
  {
    productID: 'BRK-80-YEL-003',
    productName: 'Brick block 80mm yellow',
    description: '80mm brick block in yellow.',
    price: 45,
    stockQuantity: 10000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Brick Blocks'
  },
  {
    productID: 'BRK-80-BLK-004',
    productName: 'Brick block 80mm black',
    description: '80mm brick block in black.',
    price: 45,
    stockQuantity: 10000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Brick Blocks'
  },
  // 5. Kerb Stone
  {
    productID: 'KRB-400-300-100-001',
    productName: 'Kerb stone 400×300×100',
    description: 'Kerb stone 400×300×100mm.',
    price: 120,
    stockQuantity: 2000,
    productImage: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-400-300-150-002',
    productName: 'Kerb stone 400×300×150',
    description: 'Kerb stone 400×300×150mm.',
    price: 135,
    stockQuantity: 1800,
    productImage: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-450-300-150-003',
    productName: 'Kerb stone 450×300×150',
    description: 'Kerb stone 450×300×150mm.',
    price: 150,
    stockQuantity: 1500,
    productImage: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.8,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-450-300-100-004',
    productName: 'Kerb stone 450×300×100',
    description: 'Kerb stone 450×300×100mm.',
    price: 140,
    stockQuantity: 2200,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Kerb Stones'
  },
  // 6. Paver Block – 60mm (Additional Variants)
  {
    productID: 'PAV-60-88-PLN-GRY-020',
    productName: '60 mm 8/8 plain grey plastic',
    description: '60mm 8/8 plain grey plastic paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-44-COB-GRY-021',
    productName: '60 mm 4/4 cobble grey',
    description: '60mm 4/4 cobble grey paver block.',
    price: 68,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-44-PLN-GRY-022',
    productName: '60 mm 4/4 plain grey',
    description: '60mm 4/4 plain grey paver block.',
    price: 68,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-84-PLN-023',
    productName: '60 mm 8/4 plain (200×100×60mm)',
    description: '60mm 8/4 plain paver block (200×100×60mm).',
    price: 72,
    stockQuantity: 4500,
    productImage: 'https://images.pexels.com/photos/1389729/pexels-photo-1389729.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-44-DGRY-024',
    productName: '60 mm 4/4 dark grey',
    description: '60mm 4/4 dark grey paver block.',
    price: 68,
    stockQuantity: 7000,
    productImage: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-COB-GRY-025',
    productName: '60 mm cobble 8/8 grey',
    description: '60mm cobble 8/8 grey paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-BLK-026',
    productName: '60 mm 8/8 black',
    description: '60mm 8/8 black paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-RED-PLS-027',
    productName: '60 mm 8/8 red plastic',
    description: '60mm 8/8 red plastic paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-COB-BLK-028',
    productName: '60 mm cobble 8/8 black',
    description: '60mm cobble 8/8 black paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-COB-RED-029',
    productName: '60 mm cobble 8/8 red',
    description: '60mm cobble 8/8 red paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-60-88-COB-YEL-030',
    productName: '60 mm cobble 8/8 yellow',
    description: '60mm cobble 8/8 yellow paver block.',
    price: 70,
    stockQuantity: 6000,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Paver Blocks'
  },
  // 7. Paver Block – 80mm (Plain Variants)
  {
    productID: 'PAV-80-PLN-44-GRY-031',
    productName: '80 mm plain 4/4 grey',
    description: '80mm plain 4/4 grey paver block.',
    price: 80,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'PAV-80-PLN-44-DGRY-032',
    productName: '80 mm plain 4/4 dark grey',
    description: '80mm plain 4/4 dark grey paver block.',
    price: 80,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Paver Blocks'
  },
  {
    productID: 'BRK-80-PLN-001',
    productName: 'Brick Block 80mm',
    description: 'Traditional brick-format concrete blocks for boundary walls and decorative facades.',
    price: 45,
    stockQuantity: 10000,
    productImage: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.4,
    categoryName: 'Brick Blocks'
  },
  {
    productID: 'KRB-400-001',
    productName: 'Kerb Stone 400×300×100mm',
    description: 'Standard kerb stone for road edging and footpath delineation.',
    price: 120,
    stockQuantity: 2000,
    productImage: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-400-002',
    productName: 'Kerb Stone 400×300×150mm',
    description: 'Medium-height kerb for urban roads and parking lots.',
    price: 135,
    stockQuantity: 1800,
    productImage: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.7,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-450-003',
    productName: 'Kerb Stone 450×300×150mm',
    description: 'Extended length kerb for highways and commercial developments.',
    price: 150,
    stockQuantity: 1500,
    productImage: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.8,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'KRB-450-004',
    productName: 'Kerb Stone 450×300×100mm',
    description: 'Slim long kerb for garden boundaries and decorative road edging.',
    price: 140,
    stockQuantity: 2200,
    productImage: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Kerb Stones'
  },
  {
    productID: 'TILE-25-PLN-001',
    productName: 'Paver Tiles 25mm — Plain',
    description: 'Slim 25mm tiles for terraces, balconies, and garden paths.',
    price: 55,
    stockQuantity: 4000,
    productImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.3,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-PLN-CAD-002',
    productName: 'Paver Tiles 25mm — Cadbury',
    description: 'Embossed anti-slip tiles for coordinated landscaping projects.',
    price: 60,
    stockQuantity: 3500,
    productImage: 'https://images.pexels.com/photos/1743222/pexels-photo-1743222.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.5,
    categoryName: 'Tiles'
  },
  {
    productID: 'TILE-25-DOT-003',
    productName: 'Paver Tiles 25mm — Dotted & Circle',
    description: 'Tactile tiles meeting accessibility standards for public pavements.',
    price: 62,
    stockQuantity: 2800,
    productImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    productRating: 4.6,
    categoryName: 'Tiles'
  }
];

// Category definitions
const categories = [
  { name: 'Paver Blocks', categoryID: 'CAT-PAV-001' },
  { name: 'Brick Blocks', categoryID: 'CAT-BRK-001' },
  { name: 'Kerb Stones', categoryID: 'CAT-KRB-001' },
  { name: 'Tiles', categoryID: 'CAT-TIL-001' },
  { name: 'Cement', categoryID: 'CAT-CMT-001' },
  { name: 'Plasters', categoryID: 'CAT-PLS-001' },
  { name: 'Admixtures', categoryID: 'CAT-ADM-001' },
  { name: 'Bitumen Roads', categoryID: 'CAT-BTM-001' }
];

async function seedProducts() {
  try {
    // Check if MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    console.log('Connecting to MongoDB...');
    console.log(`${process.env.MONGODB_URI}/${DB_NAME}`); // Hide credentials
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log('✅ Connected to MongoDB successfully');

    // Drop legacy indexes (e.g. wrong-case productname/productID) so inserts match schema fields
    await Product.syncIndexes();
    console.log('✅ Product indexes synced with schema');

    // Create categories
    console.log('\n📁 Creating categories...');
    const categoryMap = new Map();
    for (const cat of categories) {
      const category = await Category.findOneAndUpdate(
        { categoryID: cat.categoryID },
        { ...cat },
        { upsert: true, new: true }
      );
      categoryMap.set(cat.name, category._id);
      console.log(`  ✓ ${cat.name}`);
    }

    // Get or create admin user
    let adminUser = await User.findOne({ privilege: 'admin' });
    if (!adminUser) {
      console.log('\n👤 No admin user found. Creating a system admin...');
      adminUser = await User.create({
        userName: 'system_admin',
        email: 'systemAdmin@pavingplus.com',
        phoneNo: '9999999999',
        password: 'Admin@123',
        role: 'Individual Buyer',
        organisation: 'Paving Plus',
        address: [{
          street: 'Admin Street',
          city: 'Admin City',
          state: 'West Bengal',
          pincode: '000000'
        }],
        privilege: 'admin'
      });
      console.log('  ✅ Created system admin user');
      console.log('  📧 Email: admin@pavingplus.com');
      console.log('  🔑 Password: Admin@123');
    } else {
      console.log(`\n👤 Admin user found: ${adminUser.email}`);
    }

    // Create products
    console.log('\n📦 Creating products...');
    let createdCount = 0;
    let skippedCount = 0;

    for (const productData of productsData) {
      const categoryId = categoryMap.get(productData.categoryName);
      if (!categoryId) {
        console.log(`  ⚠ Skipped: ${productData.productName} (Category "${productData.categoryName}" not found)`);
        skippedCount++;
        continue;
      }

      const existingProduct = await Product.findOne({
        $or: [{ productID: productData.productID }, { productName: productData.productName }]
      });

      if (existingProduct) {
        console.log(`  ⏭ Skipped: ${productData.productName} (already exists)`);
        skippedCount++;
        continue;
      }

      await Product.create({
        ...productData,
        category: categoryId,
        createdBy: adminUser._id
      });
      console.log(`  ✅ Created: ${productData.productName} (₹${productData.price})`);
      createdCount++;
    }

    // Summary
    console.log('\n═══════════════════════════════════════');
    console.log('🌟 SEEDING COMPLETE 🌟');
    console.log('═══════════════════════════════════════');
    console.log(`✅ Products created: ${createdCount}`);
    console.log(`⚠ Products skipped: ${skippedCount}`);
    console.log(`📊 Total categories: ${categories.length}`);
    console.log(`👤 Admin user: ${adminUser.email}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Start your backend: npm run dev');
    console.log('   2. Start your frontend: cd ../frontend && npm run dev');
    console.log('   3. Visit products page to see seeded data');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    if (error.name === 'MongoServerError') {
      console.error('   MongoDB error. Check your connection string and network.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedProducts();