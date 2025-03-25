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

## 📡 API Documentation

| Component            | Details                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Task Type**        | `interface Task { id: string; text: string; completed: boolean; deleted: boolean; createdAt: string }`                                                       |
| **createTask**       | `(params: { text: string }) => Promise<Task>`                                                                                                                |
| **Params**           | `text`: Required task description (string)                                                                                                                   |
| **Defaults**         | `completed: false`, `deleted: false`, `createdAt`: current ISO timestamp                                                                                     |
| **Endpoint**         | `POST /tasks`                                                                                                                                                |
| **Success Response** | `{ id: string, text: string, completed: boolean, deleted: boolean, createdAt: string }`                                                                      |
| **Error Handling**   | Throws "Task creation failed!" + logs detailed error via `handleApiError`                                                                                    |
| **Example**          | `ts<br>await createTask({ text: "Buy milk" });<br>// Returns: {id: "1", text: "Buy milk", completed: false, deleted: false, createdAt: "2025-03-25T10:00Z"}` |

| **fetchTasks** | `(params?: { page?: number, noPagination?: boolean }) => Promise<FetchTasksResponse \| Task[]>` |
| **Params** | `page`: Page number (default: 1), `noPagination`: Get all tasks when true |
| **Paginated Response** | `ts<br>interface {<br>  first: number;<br>  prev: number \| null;<br>  next: number \| null;<br>  last: number;<br>  pages: number;<br>  items: number;<br>  data: Task[];<br>}` |
| **Endpoint** | `GET /tasks?_page=1&_per_page=10` (or `/tasks` when noPagination=true) |
| **Error Handling** | Throws "Fetching tasks failed!" + detailed logs |

| **updateTask** | `(params: { id: string, text: string, completed?: boolean, deleted?: boolean }) => Promise<Task>` |
| **Params** | `id`: Task ID to update, `text`: New content, `completed/deleted`: Optional flags |
| **Endpoint** | `PUT /tasks/:id` |
| **Behavior** | Maintains original createdAt, allows partial updates |
| **Example** | `ts<br>await updateTask({ id: "1", text: "Buy organic milk", completed: true });` |

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
