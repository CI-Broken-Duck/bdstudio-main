const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const matter = require('gray-matter');
const { Parser } = require('json2csv');

const MODULES_DIR = path.join(__dirname, '../src/content/modules');

async function run() {
  const files = await fg(`${MODULES_DIR}/**/*.md`);

  const modules = files.map(file => {
    const content = fs.readFileSync(file, 'utf8');
    const { data } = matter(content);

    return {
      title: data.title || '',
      code: data.code || '',
      category: data.category || '',
      subcategory: data.subcategory || '',
      summary: data.summary || '',
      price: data.price || ''
    };
  });

  const fields = ['title', 'code', 'category', 'subcategory', 'summary', 'price'];
  const parser = new Parser({ fields });
  const csv = parser.parse(modules);

  fs.writeFileSync('module-catalog.csv', csv);
  console.log('✅ module-catalog.csv created with selected fields');
}

run();
