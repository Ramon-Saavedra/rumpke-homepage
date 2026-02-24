# 🎯 AGENT COMPONENT IMPLEMENTATION GUIDE

**BEFORE EVERY IMPLEMENTATION**: Read these documents in order:

1. **[QUICK_CHECKLIST.md](../QUICK_CHECKLIST.md)** - 2 min read
2. **[PROJECT_PROFESSIONALIZATION_GUIDE.md](../PROJECT_PROFESSIONALIZATION_GUIDE.md)** - Full reference
3. **[PROGRESS_TRACKER.md](../PROGRESS_TRACKER.md)** - Current project status

---

## 📋 Core Requirements (15 Sections)

### 1. **Official Documentation First**
- Check official docs for React, Next.js, TypeScript (2026 versions)
- Verify current best practices for all libraries
- Review updated APIs and deprecated features

### 2. **TypeScript Best Practices**
- Zero `any` types (use `unknown` if needed, then narrow)
- Proper interface/type definitions before implementation
- Generic types where applicable
- Discriminated unions for variants
- Strict mode enabled

### 3. **Don't Repeat Yourself (DRY)**
- Extract reusable logic into hooks
- Create utility functions for common operations
- Use composition over duplication
- Shared types in `/types` directory

### 4. **Scalability**
- Component should handle growth (10 → 10,000 items)
- Proper pagination/virtualization if lists
- Lazy loading for heavy components
- Code splitting considerations

### 5. **Unit Testing (80% coverage)**
- Test file created alongside component
- All user interactions tested
- Edge cases covered
- Error scenarios handled
- Accessibility tested

### 6. **Strong Typing**
- All props typed with interfaces
- All function parameters typed
- All return types explicit
- No `any`, minimal `unknown`
- Zod schemas for external data

### 7. **Performance & Optimization**
- Use `React.memo` for expensive components
- `useCallback` for function props
- `useMemo` for expensive computations
- Avoid unnecessary re-renders
- Proper dependency arrays

### 8. **Accessibility (A11y)**
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast ratios

### 9. **CSS/Tailwind - Global Variables Only**
- **NEVER** add new CSS to globals.css
- Use ONLY existing Tailwind custom properties
- Available variables: `bg-l`, `bg-d`, `card-text-l`, `card-text-d`, `primary`, `error`, etc.
- Dark mode support with `dark:` prefix
- Mobile-first responsive design

### 10. **Documentation**
- JSDoc comments for components
- Prop descriptions with `/** */`
- Usage examples in comments
- README updates if needed
- Inline comments for complex logic

### 11. **Security**
- Sanitize user input
- Validate with Zod schemas
- No sensitive data in logs
- Proper error messages (no stack traces to user)
- HTTPS for API calls
- CSRF protection where applicable

### 12. **Composition**
- Small, focused components
- Single Responsibility Principle
- Composable patterns
- Props over configuration
- Children prop when appropriate

### 13. **Next.js 2026 Specific**
- React Server Components by default
- 'use client' only when needed
- App Router conventions
- Parallel routes & intercepting routes
- Server Actions for mutations
- Proper metadata exports

### 14. **State Management**
- Local state: `useState`
- Shared state: Zustand stores
- Server state: React Query / Tanstack Query
- Form state: React Hook Form
- URL state: searchParams

### 15. **Error Handling & Logging**
- Try/catch blocks with proper logging
- Error boundaries for component trees
- User-friendly error messages
- Logged errors with context
- Fallback UI for errors

---

## 🎨 Standard Component Template

```typescript
/**
 * ComponentName - Brief description of what it does
 *
 * @example
 * ```tsx
 * <ComponentName
 *   title="Example"
 *   onAction={handleAction}
 * />
 * ```
 */

'use client'; // Only if needed

import { FC, memo } from 'react';
import { logger } from '@/lib/logger';

interface ComponentNameProps {
  /** The main title to display */
  title: string;
  /** Optional variant styling */
  variant?: 'primary' | 'secondary';
  /** Callback when action is triggered */
  onAction?: () => void;
  /** Child elements */
  children?: React.ReactNode;
}

export const ComponentName: FC<ComponentNameProps> = memo(({
  title,
  variant = 'primary',
  onAction,
  children,
}) => {
  const handleAction = () => {
    try {
      onAction?.();
    } catch (error) {
      logger.error('ComponentName action failed', error as Error, { title });
    }
  };

  return (
    <div
      className={`component-wrapper ${variant}`}
      role="region"
      aria-label={title}
    >
      <h2 className="text-xl font-semibold text-admin-text-l dark:text-admin-text-d">
        {title}
      </h2>
      {children}
      {onAction && (
        <button
          onClick={handleAction}
          className="btn-primary"
          aria-label="Perform action"
        >
          Action
        </button>
      )}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

---

## ✅ Quality Metric (Self-Evaluation)

Rate each component from 0-100% based on:

| Criterion | Weight | Score |
|-----------|--------|-------|
| TypeScript Quality | 20% | _/100 |
| Test Coverage | 20% | _/100 |
| Accessibility | 15% | _/100 |
| Performance | 15% | _/100 |
| Documentation | 10% | _/100 |
| Error Handling | 10% | _/100 |
| Code Reusability | 10% | _/100 |

**Minimum Acceptable**: 80%
**Target**: 90%+
**Excellence**: 95%+

---

## 🤔 Decision Guide: When to Create a Component

### ✅ CREATE when:
- Logic is reused 2+ times
- Component exceeds 200 lines
- Clear single responsibility
- Needs independent testing
- Will be shared across pages

### ❌ DON'T CREATE when:
- Used only once and simple
- Tightly coupled to parent
- Less than 20 lines
- No clear abstraction
- Premature optimization

---

## 🔄 Implementation Workflow

1. **Plan** (5 min)
   - Define types/interfaces
   - List required props
   - Sketch component structure

2. **Implement** (30-60 min)
   - Create component file
   - Add TypeScript types
   - Implement logic
   - Add accessibility
   - Handle errors

3. **Test** (20-30 min)
   - Write test file
   - Test interactions
   - Test edge cases
   - Run coverage

4. **Refine** (10-20 min)
   - Add documentation
   - Run linter
   - Check performance
   - Final review

**Total Time**: ~90 minutes per component (quality over speed)

---

## 📚 Required Reading Before Implementation

1. [React 19 Docs](https://react.dev) - Latest APIs
2. [Next.js 16 Docs](https://nextjs.org/docs) - App Router
3. [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Latest features
4. [Tailwind CSS v4](https://tailwindcss.com/docs) - New features
5. [Vitest Guide](https://vitest.dev/guide/) - Testing patterns

---

**Last Updated**: February 23, 2026
**Version**: 2.0.0


