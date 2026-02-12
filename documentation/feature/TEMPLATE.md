# Feature Name

**Created:** YYYY-MM-DD  
**Session:** session-XXX  
**Status:** Active | Deprecated | Modified

## Overview

Brief description of what this feature does and why it exists.

## Architecture

High-level architecture explanation:

- Components involved
- Data flow
- Integration points
- Dependencies

## Implementation Details

### Files Modified/Created

List of files with brief explanation of changes:

- `src/components/NewComponent.astro` - Purpose and functionality
- `src/pages/new-route.astro` - Route handler for feature
- `src/utils/helper.ts` - Utility functions

### Key Components

#### Component Name

**File:** `src/components/ComponentName.astro`  
**Purpose:** What this component does

**Props:**

```typescript
interface Props {
  prop1: string
  prop2?: number
}
```

**Usage:**

```astro
<ComponentName prop1="value" />
```

### Data Structures

```typescript
interface DataStructure {
  field1: string
  field2: number
}
```

### API/Functions

#### Function Name

**File:** `src/utils/functions.ts`  
**Purpose:** What this function does

**Signature:**

```typescript
function functionName(param: Type): ReturnType
```

**Example:**

```typescript
const result = functionName('example')
```

## Configuration

Any configuration changes required:

- Environment variables
- Config file updates
- Build script changes

## Dependencies

New dependencies added:

```json
{
  "dependency-name": "^version"
}
```

## Usage Examples

### Example 1: Basic Usage

```astro
---
import Feature from '../components/Feature.astro'
---
<Feature />
```

### Example 2: Advanced Usage

```typescript
// More complex usage example
```

## Testing

How to test this feature:

1. Step one
2. Step two
3. Expected result

## Known Limitations

- Limitation 1
- Limitation 2

## Future Improvements

Potential enhancements:

- Enhancement idea 1
- Enhancement idea 2

## Related Features

Links to related feature documentation:

- [Related Feature 1](./related-feature.md)
- [Related Feature 2](./another-feature.md)
