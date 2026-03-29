# InContext App - Source Structure

This directory contains the organized source code for the InContext React Native app.

## Directory Structure

```
src/
├── components/     # Reusable UI components
├── constants/      # App-wide constants
├── screens/        # Screen components
├── styles/         # StyleSheet definitions
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Main export file
```

## Best Practices

### Components
- Keep components small and focused
- Use TypeScript interfaces for props
- Export components individually for tree-shaking

### Styles
- Separate styles from components
- Use descriptive names for style objects
- Group related styles together

### Types
- Define types in separate files by domain
- Use descriptive names and proper TypeScript conventions
- Export types for reuse across the app

### Utils
- Keep utility functions pure and testable
- Group related functions in the same file
- Use descriptive names and add JSDoc comments

### Constants
- Define app-wide constants in separate files
- Use `as const` for type safety
- Group constants by domain (API, UI, etc.)

## Import Examples

```typescript
// Import from index
import { ChatMessage, Message, chatStyles } from '../src';

// Import specific items
import type { ChatScreenProps } from '../src/types/navigation';
import { ChatInput } from '../src/components/ChatInput';
``` 