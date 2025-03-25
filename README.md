# WakeCap Todo Application

![Tech Stack](https://img.shields.io/badge/Bun-1.0.0-000000?style=flat&logo=bun)
![Tech Stack](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)
![Tech Stack](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react)
![Tech Stack](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript)
![Tech Stack](https://img.shields.io/badge/Tailwind-4.0.15-06B6D4?style=flat&logo=tailwindcss)
![Tech Stack](https://img.shields.io/badge/shadcn/ui-0.0.0-000000?style=flat&logo=react)
![Tech Stack](https://img.shields.io/badge/Zod-3.24.2-3E67B1?style=flat&logo=zod)
![Tech Stack](https://img.shields.io/badge/Axios-1.8.4-5A29E4?style=flat&logo=axios)
![Tech Stack](https://img.shields.io/badge/React_Query-5.69.0-FF4154?style=flat&logo=reactquery)

A modern task management application built with cutting-edge technologies.

## 🚀 Features

- Task creation, completion, and deletion
- Dark/light mode toggle
- Paginated task listing
- Comprehensive test coverage (92%)
- Storybook documentation
- Optimized build with Vite
- Feature based architecture for scalability.

## 🛠️ Technology Stack

- **Runtime**: Bun v1.0
- **Frontend**:
  - React 19
  - TypeScript 5.7
  - Tailwind CSS 4.0
  - shadcn/ui
  - Zod 3.24 (Input validation)
- **Build Tool**: Vite 6.2
- **Server State Management**:
  - React Query 5.69
- **HTTP Client**: Axios 1.8
- **Testing**:
  - Vitest (92% coverage)
  - Storybook 8.6

## 📦 Installation

1. Ensure you have [Bun](https://bun.sh/) installed.

### Install dependencies:

```bash
bun install
Run the development server:
```

```bash
bun run dev:full
```

This will start:

Frontend on http://localhost:5173
JSON server on http://localhost:4002

## 🏗️ Project Architecture

```bash
src/
├── features/ # Feature-based modules
│   └── tasks/ # Core task functionality
│     ├── components/ # Task-specific UI
│     ├── hooks/ # Custom hooks
│     ├── services/ # API communication
│     └── utils.ts # Shared utilities
│
├── components/ # Shared UI components
│ ├── ui/ # Shadcn/ui based primitives
│ └── header/ # App header
│
├── context/ # Global state
├── layout/ # App layout components
├── lib/ # Utilities and config
└── server/ # Mock API database
```

## Key Architectural Decisions:

### Feature-Based Organization:

- Easily scalable to add new features.
- Self-contained features with their own components, hooks, and services
- Clear separation of concerns
- Easy feature enablement/disabling

## Testing Strategy:

- 92% test coverage with Vitest
- Storybook for our custom UI component documentation(shadcn components are not added in storybook)
- Mock service worker for API testing

## UI Composition:

- Built with Shadcn/ui primitives
- Tailwind for utility-first styling

## 🧪 Testing & Quality

Run unit tests:

```bash
bun run test
```

Run tests with coverage:

```bash
bun run test:coverage
```

Launch Storybook:

```bash
bun run storybook
```

## 📜 Scripts

```bash
bun run dev:full #Start both frontend and mock API
bun run dev  #Start frontend only
bun run server  #Start json server
bun run build #Create production build
bun run storybook #Launch Storybook UI
bun run test #Run all tests
bun run test:coverage #Show test coverage
```

## 🌟 Why This Stands Out

- Cutting-edge stack: Uses the latest versions of all technologies
- Performance: Vite-powered ultra-fast builds
- Maintainability: Clean architecture with 92% test coverage
- Professional UI: Tailwind + Shadcn/ui for beautiful, accessible components
- Documentation: Comprehensive Storybook examples

## 📝 Notes

- This project demonstrates:
- Modern React patterns (hooks, composition)
- TypeScript best practices
- Effective testing strategies
- Clean architecture decisions
- Performance awareness
- Attention to UX details
