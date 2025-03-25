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
![Tech Stack](https://img.shields.io/badge/Vitest-3.0.9-6E9F18?style=flat&logo=vitest)
![Tech Stack](https://img.shields.io/badge/Storybook-8.6.9-FF4785?style=flat&logo=storybook)

A modern task management application built with cutting-edge technologies.

## 🎥 Live Demo

[https://user-images.githubusercontent.com/YOUR_USER_ID/VIDEO_ID.mp4](https://github.com/user-attachments/assets/369a1fee-8025-469d-ba75-544a94e40f4e)

## 🚀 Features

- Task creation, completion, and deletion
- Dark/light mode toggle
- Paginated task listing
- Comprehensive test coverage (92%)
- Storybook documentation(for our custom reusable components and not for shadcn components)
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
```

#### Run the development server:

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

### Key Architectural Decisions:

1. **Feature-Based Organization**:

   - Easily scalable to add new features
   - Self-contained features with their own components, hooks, and services
   - Clear separation of concerns
   - Easy feature enablement/disabling

2. **State Management**:

   - **UI State**: Single source of truth for pagination via `PageProvider` context
   - **Server State**: Fully managed by React Query
     - Automatic caching
     - Background refetching
     - Mutation handling
   - **Theme State**: LocalStorage-persisted via `ThemeProvider`

3. **Testing Strategy**:

   - 92% test coverage with Vitest
   - Storybook for UI component documentation
   - Mock service worker for API testing

4. **UI Composition**:
   - Built with Shadcn/ui primitives
   - Custom components only where needed (2 custom components)
   - Tailwind for utility-first styling

### 🧪 Testing & Quality

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

## API: Task Service

### `createTask(text: string): Promise<Task>`

**Core Behavior**:

- Creates task with auto-generated `id` and timestamp
- Defaults: `completed=false`, `deleted=false`
- Validates non-empty text
- Throws sanitized errors

**Types**:

```typescript
interface Task {
  id: string; // Generated UUID
  text: string; // Required content
  completed: boolean; // Toggle state
  deleted: boolean; // Soft-delete flag
  createdAt: string; // ISO-8601 timestamp
}
```

#### Usage:

```typescript
await createTask('Ship feature');
```

### `fetchTasks(params: FetchTasksParams): Promise<FetchTasksResponse | Task[]>`

**Core Behavior**:

- Retrieves tasks with optional pagination
- Automatically filters out deleted tasks
- Returns pagination metadata when paginated
- Throws sanitized errors

**Types**:

```typescript
type FetchTasksParams = {
  page?: number; // Default: 1
  noPagination?: boolean; // Get all tasks when true
};

interface FetchTasksResponse {
  first: number; // First page number
  prev: number | null; // Previous page or null
  next: number | null; // Next page or null
  last: number; // Last page number
  pages: number; // Total pages
  items: number; // Total items
  data: Task[]; // Task array
}

interface Task {
  id: string; // Generated UUID
  text: string; // Required content
  completed: boolean; // Toggle state
  deleted: boolean; // Soft-delete flag
  createdAt: string; // ISO-8601 timestamp
}
```

#### Usage:

```typescript
// Paginated
const { data } = await fetchTasks({ page: 1 });

// All tasks
const allTasks = await fetchTasks({ noPagination: true });
```

### `updateTask(params: UpdateTaskParams): Promise<Task>`

**Core Behavior**:

- Updates task by ID with partial updates
- Handles task completion (`completed: true`)
- Performs soft deletion (`deleted: true`)
- Maintains original `createdAt` timestamp
- Throws sanitized errors

**Types**:

```typescript
type UpdateTaskParams = {
  id: string; // Required task ID
  text: string; // Updated content
  completed?: boolean; // Mark as completed
  deleted?: boolean; // Soft-delete flag
};

interface Task {
  id: string; // Generated UUID
  text: string; // Required content
  completed: boolean; // Toggle state
  deleted: boolean; // Soft-delete flag
  createdAt: string; // ISO-8601 timestamp
}
```

#### Usage:

```typescript
// Complete a task
await updateTask({ id: '123', completed: true });

// Soft-delete a task
await updateTask({ id: '123', deleted: true });

// Update text only (preserves other fields)
await updateTask({ id: '123', text: 'Updated text' });
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

```

```
