<p>
  <img width="100%" src="https://assets.solidjs.com/banner?project=solid-iconify" alt="solid-iconify">
</p>

# solid-iconify

😈 A icon component set for SolidJS using Iconify.

[![release](https://github.com/Xhofe/solid-iconify/actions/workflows/release.yml/badge.svg)](https://github.com/Xhofe/solid-iconify/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/dm/solid-iconify.svg)](https://www.npmjs.com/package/solid-iconify)
[![npm](https://img.shields.io/npm/v/solid-iconify.svg)](https://www.npmjs.com/package/solid-iconify)
[![license](https://img.shields.io/github/license/Xhofe/solid-iconify.svg)](https://github.com/Xhofe/solid-iconify/blob/main/LICENSE)
[![sponsor](https://img.shields.io/badge/%24-sponsor-F87171.svg)](https://sp.nn.ci/)

## ✨ Features

- [100+ Icon packs](https://iconify.design/) totally ready to use.
- Tree shakeable: What you take is what you get.
- [Customizable](#%EF%B8%8F-configuration) - receive props to extend their usefulness.
- [Reactivity](https://www.youtube.com/watch?v=J70HXl1KhWE), take advantage of SolidJS to react to changes in props.
- [Just import and declare](#usage) in your JSX to work out-the-box
- First class TypeScript support

## 📦 Installation

```bash
pnpm add solid-iconify
```

## 📝 Documentation

<https://xhofe.github.io/solid-iconify/>

## 💻 Usage

```tsx
import { Twemoji1stPlaceMedal } from "solid-iconify/twemoji"

const App = () => {
  return (
    <div>
      <Twemoji1stPlaceMedal size={100} />
    </div>
  );
};
export default App;
```

## 🫡 Related projects
- [iconify](https://github.com/iconify/iconify)
- [solid-icons](https://github.com/x64Bits/solid-icons)

## 📝 License

MIT

- Icons are taken from the other projects so please check each project licences accordingly.