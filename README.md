# Hovercraft - CSS悬浮特效博物馆

中文 | [English](README_EN.md)

![Hovercraft Logo](assets/favicon.svg)

Hovercraft是一个交互式CSS悬浮特效展示和生成工具，让你轻松创建、预览和导出各种精美的CSS悬浮动画效果。

## ✨ 特性

- **多种悬浮特效**：包含缩放、旋转、发光、模糊、倾斜和边框等多种特效
- **实时预览**：所有特效参数调整都能即时预览效果
- **自定义控制**：调整动画速度、特效幅度和动画曲线
- **代码导出**：一键生成CSS代码并复制到剪贴板
- **响应式设计**：完美适配各种设备屏幕
- **现代UI**：赛博朋克风格的界面设计

## 🚀 快速开始

### 本地安装

1. 克隆仓库
   ```bash
   git clone https://github.com/zym9863/hovercraft.git
   cd hovercraft
   ```

2. 使用本地服务器运行
   - 使用VS Code的Live Server插件
   - 或使用Python的HTTP服务器
     ```bash
     python -m http.server
     ```
   - 或使用Node.js的http-server
     ```bash
     npx http-server
     ```

3. 在浏览器中访问 `http://localhost:8000` 或对应端口

## 💡 使用指南

### 选择特效

1. 点击特效展示区域中的任意特效卡片
2. 或从控制面板的下拉菜单中选择特效类型

### 自定义参数

- **动画速度**：调整滑块控制特效的过渡时间（0.1秒至2秒）
- **特效幅度**：调整滑块控制特效的强度（1至2倍）
- **动画曲线**：从下拉菜单选择不同的过渡效果（平滑、渐快、加速、减速、匀速）

### 导出代码

1. 调整参数至满意效果
2. 在代码导出区域查看生成的CSS代码
3. 点击"复制代码