# Debugging slow `npm run dev`

```bash
rm -rf .next  # clear cache
rm -rf node_modules package-lock.json # clear node_modules
npm install
```

# Deleting a branch

- Local: `git branch -d <branchname>`
- Remote: `git push -d <remote_name> <branchname>`

It's likely that `<remote_name>` is `origin`.


