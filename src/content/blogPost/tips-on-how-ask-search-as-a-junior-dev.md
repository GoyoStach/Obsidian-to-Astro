---
isExposed: true
description: Tips on how to request correctly for help.
title: Tips on how ask & search as a junior dev
heroImage: ../../Images/Tips_on_how_ask_&_search_as_a_junior_dev_hero.jpeg
date: '2026-02-14'
tags:
  - code
  - learning
---
# Tips on how ask & search as a junior dev
Created : 📅Wednesday 28th May 2025 
Modified: 📅Wednesday 28th May 2025 11:04 

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
In your programming journey you might stumble on new or unfamiliar subject and it is perfectly normal. In order to tackle those, you should learn first how to describe your issue and how to ask for help or search for the correct answer online.

Here are a few things to keep in mind :

## [Not Hello](https://nohello.net/en/)

Never Send a single Hello, Hi, hey, ... It's just that simple. For more details check the link in the title above.
## [Dont ask to ask, just ask](https://dontasktoask.com/)

When starting in a company people get sometimes shy and feel the need to ask for some (unnecessary) confirmation. Here is something that happen a lot :
```
<n00b> Hey goyo do you know javascript ?
<goyo> Seen  
```
This interaction is useless and often lead to no answer. Multiples reason could explain this :
- The experienced dev might believe he is not experienced enough to answer. *As he should because he cant know every answer of an entire programming language.)*
- You can't even formulate your real need
- Seems you dont want to waste your time but want time from others
- Overall just lazy and not appropriate

**What you should do**:
```
<n00b> Hey goyo I have some issue on using some props 
in my react component. Here is my code and 
I cant seem to understand why it doesn't work
<goyo> No problem, i'll check it in between meeting and will get back to you before tomorrow morning.  
```
Many benefits :
- Gets the attention of the experienced dev on the subject
- Is not daunting, the dev can estimate how much time it will take for him to help you
- Makes you improve in your way of communicating issue
- Respectful of the time of the dev
- Can directly redirect you if not able or does not have time to help
- While formulating your question correctly you might find the answer alone !

## [XY problem](https://xyproblem.info/) 
When searching on a problem you will sometimes believe that getting help to solve a small part will unblock you. 
So rather than asking help for the final problem you will ask for a rather smaller task. However it will not be the optimal way to solve your bigger problem leading in having to ask for help twice. 
Here is a great example also used in the website linked above :
```
<n00b> How can I echo the last three characters in a filename?  
<goyo> If they're in a variable: echo ${foo: -3}  
<goyo> Why 3 characters? What do you REALLY want?  
<goyo> Do you want the extension?  
<n00b> Yes.  
<goyo> There's no guarantee that every filename will have a three-letter extension,  
<goyo> so blindly grabbing three characters does not solve the problem.  
<goyo> echo ${foo##*.}
```

Instead of directly what the beginner wanted here, he hacked his way into creating another problem.
**What you should do**:
```
<n00b> How can I echo the extension of a file?.  
<goyo> echo ${foo##*.}
```
It saves muuuuuuuuuch time & frustration on both ends 👍

## Going Further

You can read those articles if you find the subject interesting :
- [Asking Smart Questions](http://catb.org/~esr/faqs/smart-questions.html)
- [How to ask](https://stackoverflow.com/help/how-to-ask)
#### References
Tags : #Code #Learning 



