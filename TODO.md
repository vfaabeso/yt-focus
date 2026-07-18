# REPORT

Note: The comments appear as I progress through the app.

- It takes too long to load the page.
- There is a Next.js issue. However, the website keeps running. Here is the log:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:
- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

See more info here: https://nextjs.org/docs/messages/react-hydration-error
```

The code highlighted is the following:

```
data-new-gr-c-s-check-loaded="14.1311.0"
data-gr-ext-installed=""
```

It is located at `app/layout.tsx (30:7) @ RootLayout`:

```
<body className="min-h-full flex flex-col">{children}</body>
```

- Some of the text look robotic. Here are concrete examples, and some comments:

1. "SHIELD STATUS: 🛡️ ACTIVE" - This seems to be redundant. I suggest removing it.
2. "Deactivate Filters (Warning: Requires 3-Minute Kinesthetic Calibration)" - "Deactivate Filters" will suffice
3. "Topic to master..." - can be simplified to "Search"
4. "Fetch Clean Feed" - can be a search icon
5. "Confirm Restriction Engagement
Removing this keyword requires passing a 3-minute dynamic physiological cage. Are you absolutely certain?" - can be simplified to "Confirm Restriction" as bold title.
6. "Yes, Lock It In" - can be just "Confirm"

- Some videos with the banned keywords still appear, ex. "prank". But it's limited to few videos.

- We should see which keywords and categories are banned.

- On banning keywords and categories, permanently banned keywords and categories shouldn't be able to be deactivated.

- There should be an outline to the "Register Filter" button.

- It would be nice if we can somehow remove the "Watch on Youtube" button in thumbnails to not tempt users.

- We shouldn't be able to submit the same keyword filter.

- It would be nice if we remove thumbnails, just the title and description. I believe it's because thumbnails can render as clickbait.

- In the filter removal challenge, the box moves way too fast, making it impossible to follow.

- The algorithm falsely flags that the user is using a script. There is something wrong with script detection code. It fails due to the first moments of the user trying to follow the box, which may result in speed of zero.
