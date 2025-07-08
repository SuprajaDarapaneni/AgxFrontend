import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of your site
const baseUrl = 'https://www.agx-international.com';

// List of your site's routes
const pages = [
  '',
  'about',
  'products',
  'services',
  'blogs',
  'contact',
  'buy-sell',
  'review'
];

// Create sitemap content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}/${page}</loc>
  </url>`
    )
    .join('')}
</urlset>`;

// Write to public/sitemap.xml
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log('✅ Sitemap generated successfully at:', sitemapPath);
