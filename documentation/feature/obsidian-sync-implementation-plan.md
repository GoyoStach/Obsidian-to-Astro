# Obsidian to Astro Sync Utility - Implementation Plan

**Date:** 2026-02-13  
**Status:** In Development  
**Language:** TypeScript  
**Type:** CLI Tool (Local Use Only)

---

## Overview

### Purpose

A TypeScript CLI utility to synchronize Obsidian vault markdown files with the Astro blog project, performing necessary transformations for web compatibility.

### Key Features

- ✅ Scan Obsidian vault for files marked `isExposed: true`
- ✅ Copy and transform markdown content
- ✅ Convert Obsidian-specific syntax to standard markdown
- ✅ Extract and copy local images
- ✅ Generate missing frontmatter fields
- ✅ Purge and replace on each run (no incremental)
- ✅ User confirmation before processing
- ✅ Detailed progress reporting

---

## Technical Architecture

### Core Components

```
scripts/obsidian-sync/
├── src/
│   ├── cli/
│   │   ├── index.ts              # CLI entry point
│   │   └── commands/
│   │       ├── sync.ts           # Sync command
│   │       └── clean.ts          # Clean command
│   ├── lib/
│   │   ├── discovery.ts          # File scanning & filtering
│   │   ├── parser.ts             # Frontmatter & markdown parsing
│   │   ├── transformer.ts        # Link & content transformation
│   │   ├── image-processor.ts    # Image extraction & copying
│   │   ├── frontmatter.ts        # Frontmatter generation
│   │   └── file-system.ts        # File operations
│   ├── utils/
│   │   ├── logger.ts             # Console output
│   │   ├── prompt.ts             # User input
│   │   ├── env.ts                # Environment variables
│   │   └── slug.ts               # Slug generation
│   └── types/
│       ├── obsidian.ts           # Obsidian types
│       ├── frontmatter.ts        # Frontmatter schema
│       └── config.ts             # Configuration types
├── tsconfig.json
└── package.json
```

---

## Processing Pipeline

### High-Level Flow

```
1. Discovery Phase
   → Load .env.local (OBSIDIAN_PATH, PROJECT_PATH)
   → Scan recursively for .md files
   → Parse frontmatter, filter by isExposed: true
   → Count files, show to user
   → Ask for confirmation

2. Purge Phase
   → Delete all files in src/content/blogPost/*
   → Delete all files in src/Images/*
   → Preserve .gitkeep files

3. Transform Phase (for each file)
   → Parse frontmatter & content
   → Transform internal links [[page]] → [page](/page)
   → Extract images from content
   → Copy images to src/Images/ (flatten, deduplicate)
   → Update image paths in content
   → Generate missing frontmatter:
      • title: from # Heading or filename
      • description: "Description of [title]"
      • date: from file mtime (YYYY-MM-DD)
      • tags: merge existing + extracted #hashtags
      • heroImage: default value if missing
   → Write to src/content/blogPost/[slug].md

4. Report Phase
   → Display statistics
   → Files processed, images copied, warnings
```

---

## Transformation Rules

### Rule 1: Internal Links

**Input:** `[[page]]` or `[[page|Display Text]]`  
**Output:** `[page](/page)` or `[Display Text](/page)`

- Strip .md extensions
- Convert to slug format
- Preserve display text if provided

### Rule 2: Image References

**Input:** `![[image.png]]` or `![alt](path/to/image.png)`  
**Output:** `![image](../../Images/image.png)` or `![alt](../../Images/image.png)`

- Flatten all paths to single Images/ directory
- Handle duplicate names: `image.png` → `image-2.png`
- Copy physical files from vault to project

### Rule 3: Frontmatter Enhancement

**Generated if missing:**

```yaml
title: 'From # Heading or filename'
description: 'Description of [title]'
date: '2026-02-13' # File mtime
tags: [...existing, ...extracted-hashtags]
heroImage: '../../Images/astro_banner.png'
```

**Always preserved:**

- All existing frontmatter fields
- isExposed flag
- Custom properties

### Rule 4: Slug Generation

**Rules:**

- Lowercase
- Spaces → hyphens
- Remove special characters
- Preserve readability

**Examples:**

- "My Blog Post" → "my-blog-post"
- "React.js Tips" → "reactjs-tips"

---

## Dependencies

```json
{
  "dependencies": {
    "commander": "^12.0.0", // CLI framework
    "fs-extra": "^11.2.0", // File operations
    "glob": "^10.3.10", // File pattern matching
    "gray-matter": "^4.0.3", // Frontmatter parsing
    "chalk": "^5.3.0", // Colored output
    "ora": "^8.0.1", // Progress spinners
    "prompts": "^2.4.2", // User prompts
    "dotenv": "^16.4.5" // .env loading
  },
  "devDependencies": {
    "@types/fs-extra": "^11.0.4",
    "@types/prompts": "^2.4.9",
    "tsx": "^4.7.1" // Run TypeScript directly
  }
}
```

---

## Implementation Phases

### Phase 1: Project Setup ⏳

**Time:** 30 minutes  
**Status:** Not Started

**Tasks:**

- [ ] Create scripts/obsidian-sync/ directory
- [ ] Set up package.json with dependencies
- [ ] Create tsconfig.json for Node.js
- [ ] Create .env.local template
- [ ] Add npm scripts to root package.json
- [ ] Create basic CLI entry point

### Phase 2: File Discovery ⏳

**Time:** 1 hour  
**Status:** Not Started

**Tasks:**

- [ ] Implement env.ts for .env.local loading
- [ ] Create recursive directory scanner
- [ ] Parse frontmatter from .md files
- [ ] Filter by isExposed: true
- [ ] Count and display results
- [ ] Implement user confirmation prompt

### Phase 3: Purge Functionality ⏳

**Time:** 45 minutes  
**Status:** Not Started

**Tasks:**

- [ ] Implement safe deletion for blogPost/
- [ ] Implement safe deletion for Images/
- [ ] Preserve .gitkeep files
- [ ] Add path validation (safety checks)
- [ ] Create clean command with double confirm

### Phase 4: Content Transformation ⏳

**Time:** 2 hours  
**Status:** Not Started

**Tasks:**

- [ ] Implement wiki link detection & conversion
- [ ] Implement image extraction from content
- [ ] Implement image copying with deduplication
- [ ] Update image paths in markdown
- [ ] Generate missing frontmatter fields
- [ ] Extract #tags from content
- [ ] Implement slug generation

### Phase 5: File Writing & Progress ⏳

**Time:** 1 hour  
**Status:** Not Started

**Tasks:**

- [ ] Generate slug-based filenames
- [ ] Write transformed markdown
- [ ] Show progress bar during processing
- [ ] Display per-file statistics
- [ ] Create summary report

### Phase 6: Error Handling ⏳

**Time:** 1 hour  
**Status:** Not Started

**Tasks:**

- [ ] Validate environment variables
- [ ] Check paths exist and are accessible
- [ ] Stop on critical errors
- [ ] Display helpful error messages
- [ ] Handle edge cases gracefully

### Phase 7: Testing & Refinement ⏳

**Time:** 1 hour  
**Status:** Not Started

**Tasks:**

- [ ] Test with sample Obsidian files
- [ ] Verify transformations correct
- [ ] Test Astro build after sync
- [ ] Verify images display
- [ ] Test edge cases
- [ ] Update documentation

---

## CLI Interface

### Commands

```bash
# Sync Obsidian content
npm run sync

# Clean all content (double confirm)
npm run sync:clean

# Show help
npm run sync -- --help
```

### Expected Output

```
╔════════════════════════════════════════════════╗
║      Obsidian → Astro Sync Utility v1.0       ║
╚════════════════════════════════════════════════╝

📁 Scanning vault: /path/to/vault

✓ Found 15 files marked for exposure
? Continue? (Y/n) › y

🗑️  Purging old content...
  → Deleted 12 posts, 48 images

⚙️  Processing... [████████████] 15/15

✓ Sync complete!
┌────────────────────────────┐
│ Files processed:      15   │
│ Images copied:        73   │
│ Images deduplicated:   3   │
│ Tags extracted:       45   │
│ Time:               2.3s   │
└────────────────────────────┘
```

---

## Environment Configuration

### .env.local

```bash
# Absolute path to Obsidian vault
OBSIDIAN_PATH=/path/to/vault

# Relative path to blog posts (from project root)
PROJECT_PATH=src/content/blogPost

# Relative path to images (from project root)
IMAGE_PATH=src/Images
```

---

## Open Questions & Decisions

### Slug Collisions

**Decision:** Add numeric suffix (my-post-1.md)

### Date Format

**Decision:** ISO format YYYY-MM-DD

### Hashtag Handling

**Decision:** Leave in content after extracting to frontmatter

### Progress Verbosity

**Decision:** Show progress bar + file count, not individual files

### Image Alt Text

**Decision:** Use filename as alt text if missing

### TypeScript Config

**Decision:** Separate tsconfig.json targeting Node.js

---

## Risk Management

### High Priority Safeguards

- ✅ User confirmation before purge
- ✅ Preserve .gitkeep files
- ✅ Stop on errors (no partial state)
- ✅ Path validation (never delete outside targets)
- ✅ Image deduplication (auto-rename conflicts)

### Data Loss Prevention

- Source of truth remains in Obsidian vault
- Git history preserves previous syncs
- Clear confirmation prompts
- No backup needed (can re-run anytime)

---

## Success Criteria

### Definition of Done

- ✅ All functional requirements implemented
- ✅ Astro builds successfully after sync
- ✅ Images display correctly
- ✅ Internal links work properly
- ✅ No data loss through testing
- ✅ Clear error messages
- ✅ Professional CLI output
- ✅ Documentation complete

---

## Testing Checklist

### Core Functionality

- [ ] Basic sync flow (5 files)
- [ ] Image handling (nested, duplicates)
- [ ] Link conversion (simple, display text)
- [ ] Frontmatter generation
- [ ] Clean command

### Edge Cases

- [ ] Special characters in filenames
- [ ] Very long filenames
- [ ] Unicode in content
- [ ] Empty files
- [ ] Deeply nested directories

### Error Handling

- [ ] Missing .env.local
- [ ] Invalid paths
- [ ] No exposed files
- [ ] Malformed frontmatter
- [ ] Permission errors

---

## Timeline

**Estimated:** 6-8 hours total

- Phase 1: Setup - 30 min
- Phase 2: Discovery - 1 hour
- Phase 3: Purge - 45 min
- Phase 4: Transform - 2 hours
- Phase 5: Progress - 1 hour
- Phase 6: Errors - 1 hour
- Phase 7: Testing - 1 hour

**Target Completion:** Within 2-3 development sessions

---

## Current Status

**Phase:** Phase 1 - Project Setup  
**Progress:** 0%  
**Blockers:** None  
**Next Steps:** Create directory structure and install dependencies

---

## Notes

- This is a local-only tool, no deployment needed
- Runs manually on-demand, no watch mode
- Full purge & replace on each run
- Source of truth always in Obsidian vault
- No incremental sync needed
