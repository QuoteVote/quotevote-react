# Import Aliases Guide

Your project now has import aliases configured to make imports cleaner and more maintainable. Instead of using relative paths like `../../components/...`, you can use these aliases.

## Available Aliases

### Main Alias
- `@/*` - Points to `src/*` (recommended for most imports)

### Specific Directory Aliases
- `components/*` - Points to `src/components/*`
- `views/*` - Points to `src/views/*`
- `layouts/*` - Points to `src/layouts/*`
- `mui-pro/*` - Points to `src/mui-pro/*`
- `assets/*` - Points to `src/assets/*`
- `utils/*` - Points to `src/utils/*`
- `store/*` - Points to `src/store/*`
- `config/*` - Points to `src/config/*`
- `hoc/*` - Points to `src/hoc/*`
- `themes/*` - Points to `src/themes/*`

**Note**: GraphQL imports should use `@/graphql/*` to avoid conflicts with the `graphql` npm package.

## Usage Examples

### Before (Relative Imports)
```javascript
import Activity from '../../components/Activity/Activity'
import Button from '../../mui-pro/CustomButtons/Button'
import { GET_POSTS } from '../../graphql/query'
import mainTheme from '../../themes/MainTheme'
```

### After (Using Aliases)
```javascript
// Using the main @ alias (recommended)
import Activity from '@/components/Activity/Activity'
import Button from '@/mui-pro/CustomButtons/Button'
import { GET_POSTS } from '@/graphql/query'
import mainTheme from '@/themes/MainTheme'

// Or using specific directory aliases
import Activity from 'components/Activity/Activity'
import Button from 'mui-pro/CustomButtons/Button'
import mainTheme from 'themes/MainTheme'
```

## Benefits

1. **Cleaner imports**: No more counting `../` levels
2. **Easier refactoring**: Move files without breaking imports
3. **Better readability**: Clear indication of what you're importing
4. **IDE support**: Better autocomplete and navigation

## Migration Strategy

You can gradually migrate your existing relative imports to use these aliases. The configuration supports both old and new import styles, so you can update files one at a time.

### Recommended Migration Order:
1. Start with the `@/*` alias for most imports
2. Use specific aliases for frequently imported directories
3. Update imports when you're already working on a file

## IDE Support

- **VS Code**: Should work automatically with the `jsconfig.json`
- **WebStorm**: Should recognize the path mappings
- **Other editors**: May need to restart after configuration changes

## Configuration Files

The aliases are configured in:
- `vite.config.js` - For build-time resolution
- `jsconfig.json` - For IDE support and TypeScript-like features 