import fs from 'fs-extra'
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// An array with your links
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/faq', changefreq: 'daily', priority: 1.0 },
]

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://planci.vercel.app' } )

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Return a promise that resolves with your XML string
await streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => fs.outputFile(`${__dirname}/../public/sitemap.xml`, data.toString()))
  .catch((err) => console.error(err))