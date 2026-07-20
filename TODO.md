# REPORT

- Some of the text look robotic. Here are concrete examples, and some comments:

1. "SHIELD STATUS: 🛡️ ACTIVE" - This seems to be redundant. I suggest removing it.
2. "Deactivate Filters (Warning: Requires 3-Minute Kinesthetic Calibration)" - "Deactivate Filters" will suffice
3. "Topic to master..." - can be simplified to "Search"
4. "Fetch Clean Feed" - can be a search icon
5. "Confirm Restriction Engagement
Removing this keyword requires passing a 3-minute dynamic physiological cage. Are you absolutely certain?" - can be simplified to "Confirm Restriction" as bold title.
6. "Yes, Lock It In" - can be just "Confirm"

- It would be nice if we can somehow remove the "Watch on Youtube" button in thumbnails to not tempt users.

- It would be nice if we remove thumbnails, just the title and description. I believe it's because thumbnails can render as clickbait.

- Some ideas and concerns regarding banned keywords:
	- it would be nice if there are banned keywords in other languages
	- banning specific channels, that might be done with our existing filters
	- are our keywords too strict? what if users want to research about anime?

- It would be nice to have a mouse bot to test if our anti-cheating system works.

- It's odd that the button says "Deactivate Filters". My intent was to do the challenge PER banned keyword. Does the code work that way? Can you explain with code snippets as references how the deactivation works? Once the challenge is completed, are all filters lifted?

- Type errors in `page.tsx`, but even with these errors, the code still runs.

- We need a good title and icon for our site.

- In case I passed the unlocking mechanism (following the box), the filters don't get relaxed. For example, in case I type "roblox", no videos appear even if the filters should be lifted.

- In some cases, the algorithm falsely flags that the cursor uses a script to follow the box. 

- Organize the restriction list in the UI.

- The 'show/hide restrictions' button should be clickable throughout the entire box.

- Buttons should highlight when clicked

# DEBATABLE

- On banning keywords and categories, permanently banned keywords and categories shouldn't be able to be deactivated.