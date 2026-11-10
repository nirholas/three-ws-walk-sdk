---
name: add-walking-companion
description: Add an animated 3D avatar that walks and talks over a web page using @three-ws/walk (Three.js). Use when a site should show a corner companion, an avatar picker, a full-page walking playground, or deliver a message through an avatar.
---

# Add a walking companion with @three-ws/walk

A browser library: a corner companion that follows the cursor, detaches into a full-page playground when clicked, and lets the visitor pick an avatar. Importing has no side effects until `enable()` or `bootstrap()` runs.

## Install

```bash
npm install @three-ws/walk three
```

`three` (>= 0.150) is a peer dependency. The library needs two asset sets served from your origin or a CDN: the avatar GLBs the roster references, and the shared animation manifest plus clips. To use the three.ws CDN (CORS is open) pass `assetBase: 'https://three.ws'` and `manifestUrl: 'https://three.ws/animations/manifest.json'`.

## Minimal integration

```js
import { createWalkCompanion } from '@three-ws/walk';

const walk = createWalkCompanion({
  assetBase: 'https://three.ws',
  manifestUrl: 'https://three.ws/animations/manifest.json',
  defaultAvatarId: 'fox',
});
walk.bootstrap();   // app-style auto-mount, honors ?walk= deep links
```

Or drive it by hand: `walk.enable()`, `walk.disable()`, `walk.toggle()`, `walk.isEnabled()`, `walk.setAvatar(idOrEntry)`, `walk.openPicker()`.

## Options (createWalkCompanion)

`avatars` (roster, default `WALK_AVATARS`), `defaultAvatarId` (default `'robot'`), `assetBase`, `apiBase`, `manifestUrl` (default `/animations/manifest.json`), `excludedRoutes`, `enablePicker`, `lookAt`, `greeting` (`(path) => string | null`), `docsUrl`, `storagePrefix` (default `'walk'`).

A custom roster entry: `{ id, name, category, asset, source: 'static', rig: 'embedded' | 'shared', accent, emotes? }`. Use `rig: 'shared'` for humanoids with no locomotion clips, since it retargets the shared clip library onto them. Use `makeApiAvatarEntry(id)` for `/api/avatars/<id>/glb` proxies.

## Delivering a message in person

```js
const delivered = await walk.announce('Your model finished rendering', {
  tone: 'alert', emote: 'dance', hold: 7000,
  actions: [{ label: 'Open', href: '/creations' }],
});
if (!delivered) showYourOwnToast();   // no WebGL, an iframe or an excluded route
```

`announce` options: `hold`, `tone` (`'alert'` or `'neutral'`), `emote`, `actions` (up to two), `avatar` (a roster id or `makeGuestAvatarEntry(glbUrl, { name })`). The text is rendered as text, never HTML. It returns `false` when no avatar could be shown.

## Playground

```js
import { launchPlayground } from '@three-ws/walk';
launchPlayground({ mode: 'platformer', checkpoints: [{ el: hero }, { el: faq }],
  onReach: (i, resume) => narrate(i).then(resume), onComplete: () => {} });
```

`mode` is `'stroll'` or `'platformer'`. Also exported: `exitPlayground`, `switchPlaygroundMode`, `getPlaygroundMode`, `createAvatarPicker`, `getAvatar`, `listCategories`.

## Verify

Run the dev server, open the page in a WebGL-capable browser, confirm the companion mounts and the GLB and manifest requests return 200 in the network tab.
