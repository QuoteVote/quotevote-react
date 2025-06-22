# Vite Migration Guide

This project has been successfully migrated from Create React App (CRA) to Vite! Here's what has been done and what you need to do next.

## What's Been Completed ✅

1. **Vite Configuration**: Created `vite.config.js` with proper React plugin and SVG handling
2. **Entry Point**: Moved from `src/index.js` to `src/main.jsx` (Vite convention)
3. **HTML Template**: Updated `index.html` in root directory (Vite requirement)
4. **Package.json**: Updated scripts and added Vite dependencies
5. **Testing Setup**: Created `vitest.config.js` for Vitest (Vite's testing framework)
6. **Asset Handling**: Moved static assets from `public/` to root directory
7. **Environment Variables**: Configured Vite to handle `REACT_APP_` prefixed variables
8. **Dependencies**: Installed all necessary Vite packages
9. **Import Resolution**: Added proper alias configuration for all source directories
10. **JSX File Renaming**: Renamed all `.js` files containing JSX to `.jsx` extension

## Key Changes Made

### Scripts Updated
- `npm start` → `npm run dev` (Vite dev server)
- `npm run build` → Vite build
- `npm test` → Vitest (instead of Jest)

### File Structure Changes
- `src/index.js` → `src/main.jsx`
- `public/index.html` → `index.html` (root directory)
- Static assets moved from `public/` to root directory
- **JSX Files**: All `.js` files containing JSX renamed to `.jsx`

### Configuration Files
- `vite.config.js` - Main Vite configuration with proper aliases
- `vitest.config.js` - Testing configuration
- `jsconfig.json` - Updated with proper path mappings
- Removed `config-overrides.js` (CRA-specific)

### Import Resolution
Added aliases in `vite.config.js` for:
- `layouts` → `src/layouts`
- `components` → `src/components`
- `config` → `src/config`
- `store` → `src/store`
- `assets` → `src/assets`
- `utils` → `src/utils`
- `views` → `src/views`
- `mui-pro` → `src/mui-pro`

## Next Steps Required 🔧

### 1. Environment Variables
Create a `.env` file in the root directory with your environment variables:
```bash
REACT_APP_SERVER=http://localhost:5000
REACT_APP_SERVER_WS=ws://localhost:5000
REACT_APP_DOMAIN=localhost:3000
```

### 2. Test the Migration
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### 3. Update Import Statements (if needed)
Some imports might need updating due to the new module resolution. Check for:
- Absolute imports using `@/` (now configured in Vite)
- SVG imports (now handled by vite-plugin-svgr)
- **JSX imports**: Files renamed to `.jsx` may need import path updates

### 4. Update CI/CD (if applicable)
Update your deployment scripts to use Vite commands instead of CRA commands.

## Benefits of Vite Migration 🚀

1. **Faster Development**: Hot Module Replacement (HMR) is significantly faster
2. **Faster Builds**: Vite uses esbuild for development and Rollup for production
3. **Better DX**: Improved error messages and faster startup times
4. **Modern Tooling**: Built on modern web standards
5. **Smaller Bundle**: Better tree-shaking and optimization

## Troubleshooting

### Common Issues

1. **Module Resolution**: If you encounter import errors, check the `resolve.alias` in `vite.config.js`
2. **Environment Variables**: Make sure your `.env` file is in the root directory
3. **SVG Imports**: SVG files are now handled by vite-plugin-svgr
4. **Testing**: Vitest is used instead of Jest, but the API is very similar
5. **JSX Files**: All files containing JSX should have `.jsx` extension

### Performance Improvements

- Development server starts much faster
- Hot reload is nearly instant
- Build times are significantly reduced
- Bundle size is typically smaller

## Rollback Plan

If you need to rollback to CRA:
1. Restore `config-overrides.js`
2. Move `index.html` back to `public/`
3. Rename `src/main.jsx` back to `src/index.js`
4. Update package.json scripts to use react-scripts
5. Remove Vite dependencies
6. Rename `.jsx` files back to `.js` (if needed)

## Support

For Vite-specific issues, check the [Vite documentation](https://vitejs.dev/).
For Vitest issues, check the [Vitest documentation](https://vitest.dev/). 