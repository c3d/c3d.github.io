import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content');
const outputFile = path.join(__dirname, '../src/content-data.json');
// Also publish under public/ so the runtime can fetch with ?v=buildId (cache-bust).
const publicOutputFile = path.join(__dirname, '../public/content-data.json');

function extractBullets(markdown) {
  const bullets = [];
  const lines = markdown.split('\n');
  let section = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    const heading = line.match(/^#{2,3}\s+(.+)/);
    if (heading) {
      section = heading[1].trim();
      continue;
    }
    const bullet = line.match(/^[-*+]\s+(.+)/);
    if (bullet) {
      // Keep [label](url) as HTML anchors so print + HUD bullet fallbacks stay clickable.
      let text = bullet[1].replace(/\*\*/g, '').replace(/\*/g, '').trim();
      text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a class="pv-deep" href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      if (text) bullets.push({ text, section });
    }
  }

  // Fallback: if the author used paragraphs instead of lists, promote short paragraphs
  if (bullets.length === 0) {
    const paras = markdown
      .split(/\n\s*\n/)
      .map((p) => p.replace(/^#+\s+.*/gm, '').replace(/\n/g, ' ').trim())
      .filter((p) => p.length > 20 && !p.startsWith('---'));
    paras.forEach((p) => {
      const sentence = p.split(/(?<=\.)\s+/)[0].trim();
      if (sentence) bullets.push({ text: sentence.replace(/\*\*/g, ''), section: null });
    });
  }

  return bullets;
}

console.log('Processing markdown files...');

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md')).sort();
const content = [];

files.forEach((file) => {
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdown } = matter(fileContent);
  const bullets = extractBullets(markdown);

  content.push({
    ...data,
    content: marked(markdown),
    bullets
  });

  console.log(`✓ ${file} — ${bullets.length} bullets`);
});

const json = JSON.stringify(content, null, 2);
fs.writeFileSync(outputFile, json);
fs.mkdirSync(path.dirname(publicOutputFile), { recursive: true });
fs.writeFileSync(publicOutputFile, json);
console.log(`\n✓ Wrote ${content.length} projects to ${outputFile}`);
console.log(`✓ Published ${publicOutputFile}`);
