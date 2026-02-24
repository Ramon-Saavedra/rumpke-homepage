# ⚡ QUICK IMPLEMENTATION CHECKLIST

**Read before EVERY implementation task**

---

## 🎯 PRE-IMPLEMENTATION (5 min)

- [ ] Read [PROJECT_PROFESSIONALIZATION_GUIDE.md](./PROJECT_PROFESSIONALIZATION_GUIDE.md)
- [ ] Check official docs for tools/libraries being used
- [ ] Verify 2026 best practices
- [ ] Check if component/function already exists
- [ ] Plan approach (types → implementation → tests)

---

## 📝 DURING IMPLEMENTATION

### TypeScript
- [ ] Zero `any` types
- [ ] Proper interfaces defined
- [ ] Zod schema for validation (if API data)
- [ ] Type exports documented

### Code Quality
- [ ] No `console.log` (use `logger`)
- [ ] No hardcoded URLs (use `ENV` config)
- [ ] No hardcoded values (use constants)
- [ ] Error handling with try/catch
- [ ] Loading states handled
- [ ] Error states handled

### React/Next.js
- [ ] Functional component
- [ ] Proper prop typing
- [ ] Use existing hooks when possible
- [ ] Client/Server component decision documented
- [ ] Performance considered (memo, callback)

### Styling
- [ ] Use ONLY existing Tailwind variables
- [ ] No new CSS added to globals.css
- [ ] Dark mode support
- [ ] Responsive design (mobile-first)

### Accessibility
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Alt text for images

### Testing
- [ ] Unit tests written
- [ ] User interactions tested
- [ ] Error scenarios tested
- [ ] 80%+ coverage
- [ ] Tests pass locally

---

## ✅ POST-IMPLEMENTATION

- [ ] Run `npm run lint`
- [ ] Run `npm test`
- [ ] Check TypeScript errors
- [ ] Test in browser (light/dark mode)
- [ ] Test responsive behavior
- [ ] Review accessibility
- [ ] Add JSDoc documentation
- [ ] Commit with descriptive message

---

## 🚨 RED FLAGS

Stop and refactor if you see:
- ❌ `any` type
- ❌ `console.log`
- ❌ Hardcoded `http://localhost:3000`
- ❌ Try/catch without logging
- ❌ No error handling
- ❌ No loading state
- ❌ Missing tests
- ❌ No TypeScript types

---

## 📚 QUICK REFERENCES

### Import Paths
```typescript
import { ENV } from '@/config/env';
import { logger } from '@/lib/logger';
import { handleApiRequest } from '@/lib/api-error-handler';
import type { PropertyDetails } from '@/types/property.types';
import { PropertyDetailsSchema } from '@/schemas/property.schema';
```

### Common Patterns

**API Fetch:**
```typescript
import { handleApiRequest } from '@/lib/api-error-handler';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';

const data = await handleApiRequest<PropertyDetails[]>(
  () => fetch(getApiUrl(API_ENDPOINTS.PROPERTIES)),
  'Fetching properties'
);
```

**Error Handling:**
```typescript
import { logger } from '@/lib/logger';

try {
  // operation
} catch (error) {
  logger.error('Operation failed', error as Error, { context: 'value' });
  throw error;
}
```

**Component Props:**
```typescript
interface ComponentProps {
  /** Required prop */
  title: string;
  /** Optional prop with default */
  variant?: 'primary' | 'secondary';
  /** Callback */
  onAction: () => void;
}

export const Component: FC<ComponentProps> = ({
  title,
  variant = 'primary',
  onAction
}) => {
  // implementation
};
```

---

**Last Updated**: February 23, 2026
