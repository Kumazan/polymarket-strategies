import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const getMatches = (regex) => [...html.matchAll(regex)].map((match) => match[1]);

test('首頁包含核心 metadata 與主要章節', () => {
  assert.match(html, /<html lang="zh-TW">/);
  assert.match(html, /<title>Polymarket 交易策略指南<\/title>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/kumazan\.github\.io\/polymarket-strategies\/">/);

  const chapterIds = getMatches(/<section class="chapter" id="([^"]+)">/g);
  assert.equal(chapterIds.length, 7);
  assert.deepEqual(chapterIds, ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7']);
});

test('目錄連結對應到存在的章節 id', () => {
  const chapterIds = new Set(getMatches(/<section class="chapter" id="([^"]+)">/g));
  const tocLinks = getMatches(/<a href="#([^"]+)" onclick="toggleToc\(\)">/g);

  assert.equal(tocLinks.length, 7);
  for (const target of tocLinks) {
    assert.ok(chapterIds.has(target), `Missing section for TOC target: ${target}`);
  }
});

test('本地圖片資源都存在', () => {
  const imagePaths = getMatches(/<img src="([^"]+)"/g).filter((src) => !src.startsWith('http'));
  assert.ok(imagePaths.length > 0, 'Expected at least one local image reference');

  for (const relativePath of imagePaths) {
    const absolutePath = path.join(root, relativePath);
    assert.ok(fs.existsSync(absolutePath), `Missing local asset: ${relativePath}`);
  }
});
