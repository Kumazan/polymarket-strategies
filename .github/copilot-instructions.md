# Copilot Instructions

## 專案簡介

Polymarket 交易策略互動式學習網站，涵蓋套利、做市、事件驅動等核心策略，以視覺化圖解輔助說明。部署於 GitHub Pages。

## 技術棧

- 純靜態 HTML（單一 `index.html`）
- 無框架、無建置工具
- 所有圖片於 `images/` 目錄

## 程式碼風格偏好

- 所有文案使用**繁體中文**
- HTML 語意化標籤優先
- 行內 CSS/JS 可接受（單頁靜態網站）
- 保持檔案極簡，不引入外部 JS 框架

## 重要的架構/檔案說明

- `index.html` — 唯一主頁，包含所有策略內容與互動邏輯
- `images/` — 策略圖解（hero.png、frontrunner.png、market-making.png 等）
- `README.md` — 專案概覽與線上連結

## PR Review 注意事項

- 確認策略說明的正確性與可讀性
- 確保圖片均有適當 alt text
- 保持頁面無障礙性（WCAG 基本）
- 確認在手機瀏覽器的顯示正常

## 不要做的事

- ❌ 不要引入 npm 依賴或建置流程（維持零依賴）
- ❌ 不要修改 `images/` 中的圖片（它們是手動製作的插圖）
- ❌ 不要新增任何金融建議性的內容（僅教育用途）
