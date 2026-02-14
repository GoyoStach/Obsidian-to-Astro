---
isExposed: true
description: >-
  How to setup and use correctly Eslint & Prettier for a node JS or TS
  application.
title: Eslint & Prettier
heroImage: ../../Images/EslintPrettier_hero.png
date: '2026-02-14'
tags:
  - code
  - learning
  - ts
---
# Eslint & Prettier
Created : 📅Wednesday 28th May 2025 
Modified: 📅Wednesday 28th May 2025 11:33 

```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 2 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
include: 
exclude: 
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```

## Introduction

One of the most efficient way to progress as a developer is to participate in code review. To do so we usually use a code history tool such as git. You would see all the changes made by other people compared to your version of the code. Even the slightest changes such as adding a blank line or a space after a bracket. 

The goal behind Prettier and Eslint is to be able to provide rules and recommendation in order to have the code formatted the same way across the team. Prettier is not limited to langage, however Eslint is mostly used with **Javascript and Typescript**. For the rest of the article we will stick to those languages mainly.

## Requirement

Here is the setup that we will go for in our example :

- 💻 IDE : Visual Studio Code
	- Eslint extension
	- Prettier extension
- 🚀Generic Typescript project ( Vite , NextJS, ... )	



## VS Code

You will need to first install both related extension :

| Description         | Image                                         |
| ------------------- | --------------------------------------------- |
| Eslint. | ![Eslint](../../Images/eslint_extension.png) |
| Prettier. | ![Eslint](../../Images/prettier_extension.png) |


Once those both extension are installed, you can change the settings so that Eslint will auto fix your formatting errors if it can on save.

Settings > search bar > "format"
![format](../../Images/default_format.png)

VS Code is now ready to handle your project specific configuration ! 


## Eslint 

Let's say that you initialized your node project or you already have one. In order to install Eslint, you should type :

```bash
npm install -D eslint
```

I would advise to keep this dependency to dev with the `-D` but it is not mandatory.
Then create a file called `.eslintrc.json` and keep it empty for now.

## Prettier

Add prettier to the project by doing :
```bash
npm install -D prettier
```

Then create a `.prettierrc` file at the root of the project.
Here is an example of a config i often use :
```js
{
    "arrowParens": "avoid",
    "singleQuote": true,
    "bracketSpacing": true,
    "endOfLine": "auto",
    "semi": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "singleAttributePerLine": true
 }
```

## Linking Both

You could use it that way however it would not be automated. In order to keep things tidy, we well link prettier to our Eslint so that only Eslint pilots the auto formatting.

```bash
npm install -D eslint-config-prettier eslint-plugin-prettier
```

We are installing those two libraries in order to have indicator on the editor and fix it. Here is a great breakdown of the utility of those package and their differences :

![PrettierLink](../../Images/prettier-link.png)

You then will need to add some lines to your `.eslintrc.json`

```json
{
"plugins": ["prettier"],
"extends": ["prettier"],
"rules": {
    "prettier/prettier":"error"
    }
}
```
## Going Further

You might have seen in my `.prettierrc` example that I decided to use `"endOfLine": "auto"` in order to have your project on every platform ( Unix, Windows). However it is a rather good practice to use a `.gitattributes` file to only push one type of endOfLine on your remote repository. Here is how you could do so :

```.gitattributes
*.ts    eol=lf
*.tsx   eol=lf
*.json  eol=lf
```

Also if you wish to apply linting on every commit or push, [husky](https://github.com/typicode/husky) could be a great solution !
## References
https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint
https://nextjs.org/docs/pages/building-your-application/configuring/eslint
Tags : #Code #Learning #TS 



