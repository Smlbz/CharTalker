# CharTalker 前端应用

一个简单的角色对话应用的前端实现。

## 项目概述

这是CharTalker的前端应用，提供了一个简洁的界面让用户可以浏览角色、进行对话等功能。

## 技术栈

- React 18
- TypeScript
- Vite

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

这将启动开发服务器，通常在 http://localhost:5173 上运行。

### 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
frontend/
├── src/
│   ├── assets/        # 静态资源文件
│   ├── App.tsx        # 应用主组件
│   ├── main.tsx       # 应用入口文件
│   ├── App.css        # 应用样式
│   └── index.css      # 全局样式
├── package.json       # 项目配置和依赖
└── vite.config.ts     # Vite配置文件
```

## 功能特性

- 简单的欢迎页面
- 后端连接状态检查
- 功能预览展示

## 注意事项

- 这是一个简化版的前端应用
- 完整功能将在后续开发中逐步实现