# Tasks Management App

A modern, responsive task management application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **React Query**, and **Subframe UI**. This project demonstrates best practices for frontend development with comprehensive CRUD operations, modular architecture, and beautiful, accessible UI design.

---

## Features

### Core Functionality

- ✅ **Complete CRUD Operations**: Create, Read, Update, Delete tasks
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ✅ **Loading States**: Smooth loading indicators and skeleton screens
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **In-Memory State**: Fast, lightweight data management for demo purposes

### Advanced Features

- ✅ **Pagination**: Smart pagination with 10 tasks per page
- ✅ **Filtering**: Filter tasks by status (All, Pending, In Progress, Completed)
- ✅ **Column Sorting**: Sort by title, status, or due date with visual indicators
- ✅ **Status Management**: Track tasks through different states (Pending, In Progress, Completed)
- ✅ **Due Date Tracking**: Visual indicators for overdue tasks
- ✅ **Form Validation**: Client-side validation with detailed error messages
- ✅ **Task Statistics**: Real-time dashboard with task counts and progress metrics
- ✅ **Clear Filters**: One-click reset of all filters and sorting

### Technical Features

- ✅ **TypeScript**: Full type safety across the application
- ✅ **Tailwind CSS**: Utility-first CSS framework for rapid development
- ✅ **Subframe UI**: Modern, accessible React component library for all UI
- ✅ **React Query**: Data fetching and state management
- ✅ **Modular Components**: Reusable UI components (TaskModal, TaskFilters, Pagination, etc.)
- ✅ **Custom Hooks**: Clean separation of logic with `useTasksPage` and others
- ✅ **Performance Optimized**: Lazy loading, code splitting, and optimal re-renders
- ✅ **Code Quality**: ESLint and Prettier

---

## Tech Stack

| Technology   | Version | Purpose                            |
| ------------ | ------- | ---------------------------------- |
| Next.js      | 15.x    | React framework with App Router    |
| React        | 19.x    | UI library                         |
| TypeScript   | 5.x     | Type safety                        |
| Tailwind CSS | 4.x     | Styling                            |
| Subframe UI  | latest  | Modern UI components               |
| React Query  | 5.x     | Data fetching and state management |
| Prettier     | 3.x     | Code formatting                    |
| ESLint       | 9.x     | Linting                            |

---

## Installation & Setup

### Prerequisites

- Node.js 18.17 or later
- npm 9.x or yarn 1.22.x
- Git

### Quick Start

Clone the repository:

```bash
git clone <your-repo-url>
cd proto-test
```

Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

### Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
yarn format           # Format all files with Prettier
```

---

## Project Structure

```
proto-test/
├── .husky/                     # Git hooks configuration
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/             # Modular UI components (tasks, modals, filters, etc.)
│   ├── hooks/                  # Custom React hooks for business logic
│   ├── types/                  # TypeScript type definitions
│   └── ui/                     # Subframe UI components and layouts
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
├── package.json
└── README.md
```

---

## Design System

- **Color Palette**: Customizable via Tailwind and CSS variables
- **Typography**: Inter font (default), responsive scale, accessible contrast
- **Spacing**: Utility-based, consistent with design system
- **Components**: All UI built with Subframe for consistency and accessibility

---

## Testing

### Manual Testing Checklist

- Create, edit, and delete tasks
- Update task status (Pending → In Progress → Completed)
- Filter and sort tasks
- Paginate through tasks (10 per page)
- Validate forms (empty, invalid, edge cases)
- Test on mobile, tablet, and desktop
- Check loading and error states
- Test keyboard navigation and accessibility

---

## Deployment

### Vercel Deployment

1. Connect your repository to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js and deploy
4. Push to `main` branch for automatic deployment

No environment variables or additional configuration needed!

---

## Configuration

- **Tailwind CSS**: See `tailwind.config.js` for custom theme and extensions
- **Subframe UI**: All UI components are imported from `src/ui/components` and are easily replaceable with new Subframe exports

---

## Performance Optimization

- Code splitting and lazy loading for modals and heavy components
- Font and image optimization
- Memoization for expensive components

---

## Troubleshooting

- **Build Errors**: Clear `.next` and `node_modules`, reinstall, and retry
- **Tailwind Issues**: Rebuild and check PostCSS config
- **Debug Mode**: Use `DEBUG=true yarn dev` for verbose logs

---

## Subframe Integration Guide

This project is architected for seamless Subframe integration:

1. **Design in Subframe**: Build and export components (Task Table, Task Modal, Delete Modal)
2. **Drop-in Replacement**: Place exports in `src/ui/components` or `src/components/subframe`
3. **Connect to Logic**: Pass hooks and state as props—no business logic changes needed
4. **Test**: Ensure all CRUD, validation, and UI states work as expected

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Next.js Team
- Tailwind CSS Team
- Subframe for the UI design system
- Unsplash for avatar images

---

For questions or support, please create an issue in the repository.

\*NOTE: Some eslint-disable comments are used in Subframe components to ignore 'any' and unused variable errors due to time constraints and technology limitations. Please revisit and refactor these as time and resources allow.
