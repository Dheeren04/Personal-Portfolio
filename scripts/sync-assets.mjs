import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsDir = path.join(rootDir, 'assets');
const publicDir = path.join(rootDir, 'public');
const publicImagesDir = path.join(publicDir, 'images');
const publicCertificatesDir = path.join(publicDir, 'certificates');
const publicThumbsDir = path.join(publicCertificatesDir, 'thumbs');
const contentDir = path.join(rootDir, 'content');
const manifestPath = path.join(contentDir, 'certificates.generated.json');

// Ensure destination directories exist
fs.mkdirSync(publicImagesDir, { recursive: true });
fs.mkdirSync(publicCertificatesDir, { recursive: true });
fs.mkdirSync(publicThumbsDir, { recursive: true });
fs.mkdirSync(contentDir, { recursive: true });

console.log('[sync-assets] Starting asset synchronization...');

if (!fs.existsSync(assetsDir)) {
  console.warn(`[sync-assets] WARNING: Assets directory not found at ${assetsDir}`);
  process.exit(0);
}

// 1. Discover profile picture in assets/
const rootFiles = fs.readdirSync(assetsDir, { withFileTypes: true });
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

let profilePhotoFile = null;
let resumePdfFile = null;

for (const entry of rootFiles) {
  if (entry.isFile()) {
    const ext = path.extname(entry.name).toLowerCase();
    if (imageExtensions.includes(ext) && !profilePhotoFile) {
      profilePhotoFile = entry.name;
    }
    if (ext === '.pdf' && !resumePdfFile) {
      resumePdfFile = entry.name;
    }
  }
}

// Copy Profile Picture
if (profilePhotoFile) {
  const src = path.join(assetsDir, profilePhotoFile);
  const dest = path.join(publicImagesDir, profilePhotoFile);
  fs.copyFileSync(src, dest);
  // Also create a standard alias 'profile.jpg' if needed
  fs.copyFileSync(src, path.join(publicImagesDir, 'profile.jpg'));
  console.log(`[sync-assets] Profile photo synced: ${profilePhotoFile} -> public/images/`);
} else {
  console.warn('[sync-assets] WARNING: No profile photo found in assets/');
}

// Copy Résumé PDF
if (resumePdfFile) {
  const src = path.join(assetsDir, resumePdfFile);
  const dest = path.join(publicDir, 'Dheeren_Resume.pdf');
  fs.copyFileSync(src, dest);
  console.log(`[sync-assets] Résumé synced: ${resumePdfFile} -> public/Dheeren_Resume.pdf`);
} else {
  console.warn('[sync-assets] WARNING: No résumé PDF found in assets/');
}

// 2. Discover certificates folder (support either 'certificates' or 'certifications')
let certsDir = path.join(assetsDir, 'certificates');
if (!fs.existsSync(certsDir)) {
  certsDir = path.join(assetsDir, 'certifications');
}

const knownCertificatesMeta = {
  'deloitte': {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (via Forage)',
    year: '2026',
    description: 'Completed practical, job-simulated tasks in data analysis and forensic technology, replicating real Deloitte analyst workflows.',
    priority: 1,
  },
  'cisco': {
    title: 'Cisco Networking Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    description: 'Built foundational knowledge of networking concepts and database/data-infrastructure fundamentals relevant to data-driven systems.',
    priority: 2,
  },
};

function formatTitleCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const certificateRecords = [];

if (fs.existsSync(certsDir)) {
  const certEntries = fs.readdirSync(certsDir, { withFileTypes: true });

  for (const entry of certEntries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.pdf'];
      if (!validExts.includes(ext)) continue;

      const srcFile = path.join(certsDir, entry.name);
      const destFile = path.join(publicCertificatesDir, entry.name);
      fs.copyFileSync(srcFile, destFile);

      const baseName = path.basename(entry.name, ext);
      const lowerBase = baseName.toLowerCase();

      let matchedMeta = null;
      for (const [key, meta] of Object.entries(knownCertificatesMeta)) {
        if (lowerBase.includes(key)) {
          matchedMeta = meta;
          break;
        }
      }

      const isPdf = ext === '.pdf';
      const fileUrl = `/certificates/${encodeURIComponent(entry.name)}`;
      // For images, the thumbnail is the image itself; for PDFs, placeholder or thumbnail
      const thumbUrl = isPdf ? `/certificates/thumbs/${encodeURIComponent(baseName)}.png` : fileUrl;

      const record = {
        id: baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        fileName: entry.name,
        fileUrl,
        thumbUrl,
        isPdf,
        title: matchedMeta ? matchedMeta.title : formatTitleCase(baseName),
        issuer: matchedMeta ? matchedMeta.issuer : 'TODO: Set Issuer in content/site.ts',
        year: matchedMeta ? matchedMeta.year : 'TODO',
        description: matchedMeta ? matchedMeta.description : 'Additional verified certificate from assets.',
        priority: matchedMeta ? matchedMeta.priority : 99,
      };

      certificateRecords.push(record);
      console.log(`[sync-assets] Certificate synced: ${entry.name}`);
    }
  }
} else {
  console.warn('[sync-assets] WARNING: No certificates folder found in assets/');
}

// Sort: known priority first, then newest year, then alphabetical
certificateRecords.sort((a, b) => {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }
  const yearA = Number.parseInt(a.year, 10) || 0;
  const yearB = Number.parseInt(b.year, 10) || 0;
  if (yearB !== yearA) {
    return yearB - yearA;
  }
  return a.title.localeCompare(b.title);
});

fs.writeFileSync(manifestPath, JSON.stringify(certificateRecords, null, 2), 'utf-8');
console.log(`[sync-assets] Wrote ${certificateRecords.length} certificates to ${manifestPath}`);
console.log('[sync-assets] Synchronization completed successfully.');

