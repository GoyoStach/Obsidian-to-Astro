## Obsidian to astro.

## GOAL

The goal is to parse a folder in search of .md files that would be added to a specific folder of the project. We would do a number of operation on those files in order to convert them to usable in the web.

## Core functionnality

### STEP 1

In a specified folder ( determined by an environnement variable called OBSIDIAN_PATH) we would search for a specific value in the frontmatter in order to see if we should expose this file :
isExposed: true.

We would then count the number of files concerned by this boolean. Make ,sure to go trhough all children folder.

Asks for confirmation to the user if it is correct and if it should proceed.

### STEP 2

The goal is to copy those files in the project folder based on environnement variable ( PROJECT_PATH ). the default value should be src/content/blogPost ( relative path).

### STEP 3 : content manipulation

- Obsidian uses a format for internal hyperlink with [[name_of_file]]. We would want to convert those path to usable ones in the context of the website. Those link should only reflect internal links between pages of the website.
- Add to the frontmatter of the file a heroImage property if none are provided with heroImage: '../../Images/astro_banner.png'. as default value.
  title should be the TITLE if not provided and description should be : "description of TITLE ( TITLE being the title of the page, you can find it with only one # )
- Parse in search of LOCAL images in the content of the markdown and copy them in the src/Images folder.
