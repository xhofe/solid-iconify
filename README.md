<p>
  <img width="100%" src="https://assets.solidjs.com/banner?project=solid-iconify" alt="solid-named-router">
</p>

# solid-iconify

☘ A solidjs component of progress bar, the custom colors are supported. Inspired by [vue3-progress](https://github.com/tangyouge/vue3-progress) but for [Solidjs](https://solidjs.com).

[![release](https://github.com/Xhofe/solid-iconify/actions/workflows/release.yml/badge.svg)](https://github.com/Xhofe/solid-iconify/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/dm/solid-iconify.svg)](https://www.npmjs.com/package/solid-iconify)
[![npm](https://img.shields.io/npm/v/solid-iconify.svg)](https://www.npmjs.com/package/solid-iconify)
[![license](https://img.shields.io/github/license/Xhofe/solid-iconify.svg)](https://github.com/Xhofe/solid-iconify/blob/main/LICENSE)
[![sponsor](https://img.shields.io/badge/%24-sponsor-F87171.svg)](https://sp.nn.ci/)

## Installation

```bash
pnpm add solid-iconify
```

## Demo

<https://xhofe.github.io/solid-iconify/>

## Usage

```tsx
import { Component } from "solid-iconify";

const App = () => {
  const [shown, setShown] = createSignal(true);
  return (
    <div>
      <Component />
    </div>
  );
};
export default App;
```
