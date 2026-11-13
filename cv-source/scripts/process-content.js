import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content');
const outputFile = path.join(__dirname, '../src/content-data.json');

console.log('Processing markdown files...');

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
const content = [];

files.forEach(file => {
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdown } = matter(fileContent);
  
  content.push({
    ...data,
    content: marked(markdown)
  });
  
  console.log(`✓ Processed ${file}`);
});

fs.writeFileSync(outputFile, JSON.stringify(content, null, 2));
console.log(`\n✓ Wrote ${content.length} items to ${outputFile}`);
