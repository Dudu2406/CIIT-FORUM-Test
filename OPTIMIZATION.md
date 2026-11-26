# Optimization notes

This branch contains browser-only prototype improvements for CIIT Forum.

## Planned/runtime improvements

- Add local-storage schema validation and versioning.
- Compress uploaded JPG, PNG, and WebP images before storing data URLs.
- Keep the existing plain HTML/CSS/JavaScript architecture for a minimal setup.
- Preserve the existing demo authentication behavior; production authentication requires a backend.

## Development checks

Because this repository has no build step, open `index.html` through a local static server and verify:

1. Demo login and account creation.
2. Profile editing and image uploads.
3. Post creation, likes, comments, and filtering.
4. Desktop and mobile navigation.
5. Browser storage behavior after a page reload.
