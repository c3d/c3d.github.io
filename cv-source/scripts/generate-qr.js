import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '../public/qr-cv.png');
const url = 'https://c3d.github.io/cv/';

await QRCode.toFile(out, url, {
  errorCorrectionLevel: 'M',
  type: 'png',
  width: 512,
  margin: 2,
  color: { dark: '#041018', light: '#ffffff' }
});

console.log(`✓ QR code for ${url} → ${out}`);
