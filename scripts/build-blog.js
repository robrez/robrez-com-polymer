import MarkdownIt from 'markdown-it';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getDirectories = srcPath => {
  const dirFilter = file => fs.statSync(path.join(srcPath, file)).isDirectory();
  return fs.readdirSync(srcPath).filter(dirFilter);
};

const isIgnore = srcPath => {
  const ignorePath = path.join(srcPath, '.blogignore');
  return fs.existsSync(ignorePath);
};

const BLOG_PATH = 'packages/blog/assets';
const blogDir = path.resolve(__dirname, `../${BLOG_PATH}`);
const prettierConfigFile = prettier.resolveConfigFile.sync(blogDir);
const prettierConfig = prettier.resolveConfig.sync(prettierConfigFile);

const getMarkdownFiles = srcPath => {
  const fileFilter = file => {
    const filePath = path.join(srcPath, file);
    const stats = fs.statSync(filePath);
    const isFile = stats.isFile();
    const ext = (path.extname(filePath) || '').toLowerCase();
    return isFile && ['.md'].indexOf(ext) > -1;
  };
  return fs.readdirSync(srcPath).filter(fileFilter);
};

const loadPostMeta = srcDir => {
  const posts = getDirectories(srcDir);

  const postMeta = posts.map(post => {
    const postPath = path.join(srcDir, post);
    const markdownFiles = getMarkdownFiles(postPath).map(mdFile => {
      const mdFilePath = path.join(postPath, mdFile);
      const filePathMeta = path.parse(mdFile);
      const outfile = `${mdFilePath}.ts`;
      return {
        name: filePathMeta.name,
        input: mdFilePath,
        output: outfile,
      };
    });
    const ignore = isIgnore(postPath);
    return {
      path: postPath,
      ignore,
      markdownFiles,
    };
  });

  return postMeta;
};

const prettify = content => {
  const cfg = {
    ...prettierConfig,
    parser: 'babel',
  };
  return prettier.format(content, cfg);
};

const templatize = htmlString => {
  const tmpl = `
      import { html } from 'lit-html';

      export const entry = html\`
      ${htmlString}
      \`;
    `;
  return tmpl;
};

const renderBlogPosts = postMeta => {
  const md = new MarkdownIt();
  postMeta.markdownFiles.forEach(mdFileMeta => {
    const mdFile = mdFileMeta.input;
    const content = fs.readFileSync(mdFile, 'utf-8');
    const mdResult = md.render(content);
    const prettierResult = prettify(templatize(mdResult));
    fs.writeFileSync(mdFileMeta.output, prettierResult);
  });

  const imports = postMeta.markdownFiles.map(mdFileMeta => {
    // todo generate imports and dynamic index
  });
};

const postsMeta = loadPostMeta(blogDir);

postsMeta.forEach(postMeta => {
  renderBlogPosts(postMeta);
});
