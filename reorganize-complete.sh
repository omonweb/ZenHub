#!/bin/bash

# Move all directories from zentask to root
echo "Starting project reorganization..."

# Move directories
mv zentask/app . 2>/dev/null
mv zentask/components . 2>/dev/null
mv zentask/convex . 2>/dev/null
mv zentask/hooks . 2>/dev/null
mv zentask/lib . 2>/dev/null
mv zentask/public . 2>/dev/null

# Move configuration files
mv zentask/next.config.ts . 2>/dev/null
mv zentask/tsconfig.json . 2>/dev/null
mv zentask/tailwind.config.ts . 2>/dev/null
mv zentask/postcss.config.mjs . 2>/dev/null
mv zentask/components.json . 2>/dev/null
mv zentask/eslint.config.mjs . 2>/dev/null

# Remove the empty zentask directory
rm -rf zentask

# Remove old root files if they exist
rm -f README.md (if different from zentask/README.md)
rm -f reorganize.js

echo "Project reorganization complete!"
echo "All files have been moved to the root directory."
