# Obsidian to Astro

© 2021-2026 Guillaume Excoffier. All rights reserved.

A powerful sync tool that transforms your Obsidian notes into a beautiful Astro blog with automated image processing and link conversion.

## ✨ Features

- 🔄 **Automated Sync** - One-command sync from Obsidian vault to Astro project
- 🖼️ **Smart Image Handling** - Automatic hero image and content image processing
- 🔗 **Link Transformation** - Convert Obsidian wiki links to proper URLs
- 🏷️ **Tag Extraction** - Auto-extract hashtags from content
- 🎨 **Image Optimization** - Built-in Astro image optimization
- 🗑️ **Safe Purge** - Clean old content while preserving important assets
- 📦 **Content Collections** - Type-safe frontmatter with Astro content collections
- 🎭 **View Transitions** - Smooth page transitions for better UX

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An Obsidian vault with markdown notes
- Git (optional, for deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/GoyoStach/Obsidian-to-Astro.git
   cd Obsidian-to-Astro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your paths:

   ```env
   # Absolute path to your Obsidian vault
   OBSIDIAN_PATH=/home/goyo/Documents/Obsidian

   # Relative path to blog posts (from project root)
   PROJECT_PATH=src/content/blogPost

   # Relative path to images (from project root)
   IMAGE_PATH=src/Images
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🧾 About

This project transforms Obsidian notes into a production-ready blog. Inspired by [Takuya Matsuyama](https://github.com/craftzdog)'s workflow:

[![# How to create a 'What I Use' blog with Astro and Tailwind CSS](https://img.youtube.com/vi/3_JE76PKBWE/maxresdefault.jpg)](https://www.youtube.com/watch?v=3_JE76PKBWE)

**Current Version:** Astro 5.x with latest features:

- Content Collections for type-safe frontmatter
- Native image optimization
- View transitions for smooth navigation

## 📚 Tech Stack

- 🚀 **[Astro 5.x](https://astro.build/)** - All-in-one web framework for fast, content-focused websites
- ⚛️ **[React 18](https://react.dev/)** - UI component library for interactive elements
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- 📝 **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parser
- 🖼️ **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

## 📁 Project Structure

```
Obsidian-to-Astro/
├── scripts/
│   └── obsidian-sync/        # Sync CLI tool
│       └── src/
│           ├── cli/           # Command-line interface
│           ├── lib/           # Core processing logic
│           │   ├── file-system.ts
│           │   ├── frontmatter.ts
│           │   ├── image-processor.ts
│           │   ├── processor.ts
│           │   └── transformer.ts
│           └── utils/         # Helper functions
├── src/
│   ├── Images/                # Processed images from Obsidian
│   │   ├── preserved/         # Protected from purge
│   │   │   └── astro_banner.png
│   │   ├── hero.png
│   │   ├── image1.png
│   │   └── .gitkeep
│   ├── components/            # React/Astro components
│   ├── layouts/               # Page layouts
│   ├── pages/                 # Route pages
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── content/
│       └── blogPost/          # Synced markdown files
│           ├── advanced-git.md
│           └── .gitkeep
├── .env.local                 # Environment configuration
├── astro.config.mjs          # Astro configuration
└── package.json
```

### Key Directories

- **`src/content/blogPost/`** - Contains all synced blog posts from Obsidian
- **`src/Images/`** - Stores all images with automatic optimization
- **`src/Images/preserved/`** - Protected folder for permanent assets (not deleted on purge)
- **`scripts/obsidian-sync/`** - Automated sync tool for Obsidian → Astro

## 🧞 Commands

All commands are run from the root of the project:

| Command              | Action                                       |
| :------------------- | :------------------------------------------- |
| `npm install`        | Install dependencies                         |
| `npm run dev`        | Start dev server at `localhost:4321`         |
| `npm run build`      | Build production site to `./dist/`           |
| `npm run preview`    | Preview built site locally                   |
| `npm run sync`       | Sync Obsidian notes to Astro                 |
| `npm run sync:clean` | Clean all synced content (with confirmation) |
| `npm run lint`       | Run ESLint                                   |
| `npm run lint:fix`   | Fix ESLint errors automatically              |
| `npm run format`     | Format code with Prettier                    |

## 🚀 Deployment

### Production Build

Build the site for production:

```bash
npm run build
```

This generates a static site in `./dist/` that can be deployed anywhere.

### Automated Deployment

This blog uses automated deployment with Coolify on a VPS:

1. **Sync** your Obsidian notes:

   ```bash
   npm run sync
   ```

2. **Commit** the changes:

   ```bash
   git add .
   git commit -m "Add new blog post"
   git push origin main
   ```

3. **Deploy** - The CI/CD pipeline automatically builds and deploys

**Live Site:** [https://blog.goyostash.com/](https://blog.goyostash.com/)

### Manual Deployment

You can deploy to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Push to `gh-pages` branch
- **Any VPS**: Copy `./dist/` to your web server

## 🛠️ How It Works

### Sync Process

When you run `npm run sync`, the tool:

1. **Discovers** markdown files in your Obsidian vault
2. **Filters** for files with `isExposed: true` in frontmatter
3. **Purges** old content from `src/content/blogPost/` and `src/Images/` (except `preserved/`)
4. **Processes** each file:
   - Transforms wiki links: `[[Note]]` → `[Note](/note)`
   - Extracts hashtags: `#code` → added to tags array
   - Resolves hero images from vault
   - Copies hero images to `src/Images/`
   - Processes content images
   - Updates image references
   - Generates missing frontmatter fields
5. **Writes** processed files to `src/content/blogPost/`
6. **Reports** statistics (files processed, images copied, links converted)

### Path Resolution

The tool intelligently resolves image paths:

```
Obsidian: 9999 Images/Advanced_Git/hero.jpg
          ↓
Astro:    src/Images/Advanced_Git_hero.jpg
          ↓
Frontmatter: ../../Images/Advanced_Git_hero.jpg
```

It handles:

- Numbered folders (e.g., `9999 Images/`)
- Nested folder structures
- Common attachment folders (`attachments/`, `Images/`, etc.)
- Relative and absolute paths
- URL encoding (spaces, special characters)

## 📋 Best Practices

### Obsidian Organization

- ✅ Use `isExposed: true` only for finished posts
- ✅ Keep images in dedicated folders per topic
- ✅ Use descriptive filenames (becomes the URL slug)
- ✅ Add meaningful tags and descriptions
- ✅ Use wiki links for internal references

### Image Management

- ✅ Store permanent assets in `src/Images/preserved/`
- ✅ Use hero images for better visual appeal
- ✅ Optimize large images before adding to vault
- ⚠️ Avoid special characters in filenames (`&`, `\`, etc.)
- ⚠️ Use underscores `_` instead of spaces in folder names

### Content Writing

- ✅ Use H1 (`#`) for the main title
- ✅ Add hashtags for automatic tag extraction
- ✅ Link related posts with wiki links
- ✅ Test locally with `npm run dev` before deploying

## 🐛 Troubleshooting

### Images not showing up

- Check that the image path in Obsidian is correct
- Verify the image exists in your vault
- Look for warnings in the sync output
- Check `src/Images/` for copied files

### Links not working

- Ensure wiki links use the note filename: `[[Filename]]`
- Avoid using full paths in wiki links
- The tool extracts only the filename for the URL

### Sync not finding notes

- Verify `OBSIDIAN_PATH` in `.env.local` is correct
- Check that notes have `isExposed: true` in frontmatter
- Run sync with verbose output to see discovered files

### Build errors

- Run `npm run lint` to check for code issues
- Verify all image paths in frontmatter are valid
- Check that content collections schema is satisfied

## 📄 License

© 2021-2026 Guillaume Excoffier. All rights reserved.

## 🙏 Credits

- Inspired by [Takuya Matsuyama](https://github.com/craftzdog)'s workflow
- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📝 Obsidian Setup

### Vault Structure

Your Obsidian vault can have any structure. The sync tool will automatically discover and process marked files:

```
MyObsidianVault/
├── .obsidian/
├── 200 Informatique/
│   └── 210 Web Dev/
│       ├── Advanced Git.md          # Your blog post
│       └── Multiple git account.md
├── 9999 Images/                     # Optional: centralized images
│   ├── Advanced_Git/
│   │   └── Advanced_Git_hero.jpg
│   └── Multiple_git_account/
│       └── hero.png
└── 800 Miscellaneous/
    └── Another post.md
```

### Frontmatter Configuration

To expose a note as a blog post, add frontmatter with `isExposed: true`:

```yaml
---
title: My Awesome Post
description: A brief description of the post
isExposed: true
date: '2026-02-14'
tags:
  - code
  - tutorial
heroImage: 9999 Images/My_Post/hero.jpg
---
# My Awesome Post

Your content here...
```

### Frontmatter Fields

| Field         | Required | Description                                                     | Example                                |
| :------------ | :------- | :-------------------------------------------------------------- | :------------------------------------- |
| `isExposed`   | ✅ Yes   | Must be `true` to sync this note                                | `isExposed: true`                      |
| `title`       | ❌ No    | Post title (auto-generated from H1 or filename if not provided) | `title: Advanced Git`                  |
| `description` | ❌ No    | Post description (auto-generated if not provided)               | `description: Learn advanced git`      |
| `date`        | ❌ No    | Publication date (uses file modification date if not provided)  | `date: '2026-02-14'`                   |
| `tags`        | ❌ No    | Array of tags (hashtags from content are auto-extracted)        | `tags: [code, git]`                    |
| `heroImage`   | ❌ No    | Path to hero image in Obsidian vault (uses default if omitted)  | `heroImage: 9999 Images/Post/hero.jpg` |

### Hero Image Paths

The sync tool supports multiple hero image path formats:

```yaml
# Obsidian centralized images folder
heroImage: 9999 Images/Advanced_Git/Advanced_Git_hero.jpg

# Relative to note location
heroImage: attachments/hero.png

# Subfolder structure
heroImage: Images/My_Topic/banner.jpg
```

The tool will:

1. Resolve the image path from your Obsidian vault
2. Copy it to `src/Images/` in the Astro project
3. Update the frontmatter with the correct relative path: `../../Images/hero.jpg`

### Image References in Content

Use standard Obsidian syntax for images:

```markdown
# Obsidian wiki links (recommended)

![[image.png]]
![[folder/image.png]]

# Standard markdown

![Alt text](path/to/image.png)
```

The sync tool automatically:

- Resolves image paths from your vault
- Copies images to `src/Images/`
- Updates image references to work with Astro

### Internal Links

Link to other notes using Obsidian wiki links:

```markdown
# Simple link

[[Other Note]]

# Link with custom text

[[200 Informatique/210 Web Dev/Advanced Git|Git Tutorial]]

# Folder paths are automatically handled

[[Folder/Subfolder/My Note]]
```

The sync tool converts these to proper URLs:

- `[[Advanced Git]]` → `[Advanced Git](/advanced-git)`
- `[[Folder/My Note|Custom Text]]` → `[Custom Text](/my-note)`

### Creating a New Post

1. **Create a markdown file** anywhere in your Obsidian vault

2. **Add frontmatter** with `isExposed: true`:

   ```yaml
   ---
   isExposed: true
   title: My New Post
   description: This is my new blog post
   tags: [tutorial, code]
   heroImage: 9999 Images/My_New_Post/hero.jpg
   ---
   ```

3. **Write your content** using Obsidian features:
   - Wiki links for internal references
   - `![[image]]` for images
   - `#hashtags` for additional tags
   - Standard markdown formatting

4. **Run the sync command**:
   ```bash
   npm run sync
   ```

The tool will:

- ✅ Copy your markdown file to `src/content/blogPost/`
- ✅ Process and copy all images
- ✅ Convert wiki links to web-compatible URLs
- ✅ Extract hashtags and merge with frontmatter tags
- ✅ Generate missing frontmatter fields

### Sync Workflow

```bash
# 1. Sync from Obsidian to Astro
npm run sync

# 2. Preview changes locally
npm run dev

# 3. Build for production
npm run build

# 4. (Optional) Clean all synced content
npm run sync:clean
```

### Protected Images

Images in `src/Images/preserved/` are never deleted during sync cleanup. Use this folder for:

- Default hero images
- Site logos
- Reusable assets

Example:

```yaml
heroImage: ../../Images/preserved/astro_banner.png
```
