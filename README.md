# Four Poses

A free retro photobooth for your phone. It takes a 4-shot strip or a 2×2 grid, which you can style with templates, filters, text and borders. You can save or share the result, and post the design (never the photos) to the remix feed.

It's a plain HTML/CSS/JS web app with no build step and no sign-in. Photos never leave the phone. It installs to the home screen as a PWA.

## Run it on your phone
The camera only works over **https**, so the app has to be hosted. Any static host works:
- **Netlify Drop:** go to app.netlify.com/drop and drag this folder onto the page.
- **GitHub Pages:** push this folder to a public repo, then go to Settings → Pages → Deploy from branch `main` / root.

## Files
- `index.html`: the screens (camera, review, edit, feed, look) and the bottom sheets
- `styles.css`: light theme (A · Cream Booth) and dark theme (G · Black Cherry)
- `js/render.js`: strip rendering, templates, filters, borders, fonts
- `js/app.js`: camera, capture flow, editor, feed, posting, settings
- `sw.js`, `manifest.webmanifest`, `icons/`, `fonts/`: offline support and installing to the home screen
