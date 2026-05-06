import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const assetsDir = path.join(distDir, 'assets');
const distIndexPath = path.join(distDir, 'index.html');

const imageKeys = [
  'heroChaleneStudio',
  'heroChaleneFitness',
  'storyApproachChalene',
  'storyPartnerChaleneBrock',
  'productMagnesiumBreakthrough',
  'productMasszymes',
  'productProbioticBreakthrough',
  'productBerberineBreakthrough',
  'productMagnesiumDrink',
  'commentChaleneAvatar',
  'logo',
];

async function getEntryJsPath() {
  const assetFiles = await fs.readdir(assetsDir);
  const entryFile = assetFiles.find((name) => /^index-.*\.js$/.test(name));
  if (!entryFile) {
    throw new Error('Could not find built JS entry file in dist/assets.');
  }
  return path.join(assetsDir, entryFile);
}

function extractAssetByVar(bundleCode) {
  const varToAsset = new Map();
  const varAssignmentRegex = /([A-Za-z_$][\w$]*)=`(\/assets\/[^`]+\.(?:webp|svg))`/g;
  let match = varAssignmentRegex.exec(bundleCode);
  while (match) {
    varToAsset.set(match[1], match[2]);
    match = varAssignmentRegex.exec(bundleCode);
  }
  return varToAsset;
}

function extractKeyToVar(bundleCode) {
  const keyToVar = new Map();
  const fallbackRegex = /f\(`([^`]+)`,([A-Za-z_$][\w$]*)\)/g;
  let match = fallbackRegex.exec(bundleCode);
  while (match) {
    keyToVar.set(match[1], match[2]);
    match = fallbackRegex.exec(bundleCode);
  }
  return keyToVar;
}

function buildResolvedAssets(bundleCode) {
  const varToAsset = extractAssetByVar(bundleCode);
  const keyToVar = extractKeyToVar(bundleCode);
  const resolved = new Map();

  for (const key of imageKeys) {
    const varName = keyToVar.get(key);
    const assetPath = varName ? varToAsset.get(varName) : undefined;
    if (!assetPath) {
      throw new Error(`Could not resolve built asset path for key "${key}".`);
    }
    resolved.set(key, assetPath);
  }
  return resolved;
}

function replaceOverrideBlock(html, resolvedAssets) {
  let output = html;
  for (const [key, value] of resolvedAssets.entries()) {
    const keyLineRegex = new RegExp(`(${key}:\\s*)'[^']*'`, 'g');
    output = output.replace(keyLineRegex, `$1'${value}'`);
  }
  return output;
}

async function main() {
  const entryJsPath = await getEntryJsPath();
  const [bundleCode, indexHtml] = await Promise.all([
    fs.readFile(entryJsPath, 'utf8'),
    fs.readFile(distIndexPath, 'utf8'),
  ]);

  const resolvedAssets = buildResolvedAssets(bundleCode);
  const updatedHtml = replaceOverrideBlock(indexHtml, resolvedAssets);
  await fs.writeFile(distIndexPath, updatedHtml, 'utf8');

  console.log('Updated dist/index.html image overrides with current built asset hashes.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
