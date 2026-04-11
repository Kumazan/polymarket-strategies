import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(testDir, '..');
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const getMatches = (source, regex) => [...source.matchAll(regex)].map((match) => match[1]);
const getChapterIds = () =>
  getMatches(html, /<section\b(?=[^>]*\bclass="[^"]*\bchapter\b[^"]*")(?=[^>]*\bid="([^"]+)")[^>]*>/g);
const getTocLinks = () => {
  const tocMatch = html.match(/<(?:nav|div)\b[^>]*\bclass="[^"]*\btoc-(?:menu|drawer)\b[^"]*"[^>]*>([\s\S]*?)<\/(?:nav|div)>/i);
  assert.ok(tocMatch, 'Expected a TOC container');
  return getMatches(tocMatch[1], /<a\b[^>]*\bhref="#([^"]+)"[^>]*>/g);
};

test('首頁包含核心 metadata 與主要章節', () => {
  assert.match(html, /<html lang="zh-TW">/);
  assert.match(html, /<title>Polymarket 交易策略指南<\/title>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/kumazan\.github\.io\/polymarket-strategies\/">/);

  const chapterIds = getChapterIds();
  assert.equal(chapterIds.length, 7);
  assert.deepEqual(chapterIds, ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7']);
});

test('目錄連結對應到存在的章節 id', () => {
  const chapterIds = new Set(getChapterIds());
  const tocLinks = getTocLinks();

  assert.equal(tocLinks.length, 7);
  for (const target of tocLinks) {
    assert.ok(chapterIds.has(target), `Missing section for TOC target: ${target}`);
  }
});

test('本地圖片資源都存在', () => {
  const imagePaths = getMatches(html, /<img\b[^>]*\bsrc="([^"]+)"/g).filter((src) => !src.startsWith('http'));
  assert.ok(imagePaths.length > 0, 'Expected at least one local image reference');

  for (const relativePath of imagePaths) {
    const absolutePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(absolutePath), `Missing local asset: ${relativePath}`);
  }
});
