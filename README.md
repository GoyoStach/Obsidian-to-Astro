# Zettlekasten to Astro

## 🧾Context

This project have the goal of exposing my obsidian notes to the web. The idea of developping such a tool came to me when i saw a video of [Takuya Matsuyama](https://github.com/craftzdog) :

[![# How to create a 'What I Use' blog with Astro and Tailwind CSS](https://img.youtube.com/vi/3_JE76PKBWE/maxresdefault.jpg)](https://www.youtube.com/watch?v=3_JE76PKBWE)

## 📚Stack

- 🚀[Astro](https://astro.build/) - Astro is an **all-in-one** **web framework** for building **fast,** **content-focused** websites.
- ⚛[React](https://beta.reactjs.org/) - A JavaScript library for building user interfaces
- ⌨[Tailwind](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.

## 🚀Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
│    	└── posts/Exposed Notes
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

