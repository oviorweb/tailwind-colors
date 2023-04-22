# @oviorweb/tailwind-colors

Tailwind Colors is a highly customizable plugin for Tailwind CSS that allows you to create multiple themes with different colors and easily switch between them. It provides a simple way to extend or override the default color schemes of Tailwind CSS.

## Installation

Install the plugin from npm:

```sh
npm install @oviorweb/tailwind-colors
```

Then add the preset to your `tailwind.config.js` file:

```ts
import TailwindColors, { reverseShades } from "@oviorweb/tailwind-colors";
import colors from "tailwindcss/colors";

const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number]; // Can use wherever you want

// tailwind.config.ts
export default {
  presets: [
    TailwindColors({
      defaultColorsTheme: "light",
      themes,
      extend: false,
      colors: {
        light: {
          primary: colors.purple,
          secondary: colors.pink,
          contrast: colors.slate,
          error: colors.red,
          warning: colors.yellow,
          success: colors.green,
          bg: "#ffffff",
        },
        dark: {
          primary: reverseShades(colors.purple),
          secondary: reverseShades(colors.pink),
          contrast: reverseShades(colors.zinc),
          error: reverseShades(colors.red),
          warning: reverseShades(colors.yellow),
          success: reverseShades(colors.green),
          bg: colors.zinc[950],
        },
        black: "#000000",
        white: "#ffffff",
      },
    }),
    // ...
  ],
  theme: {
    // ...
  },
};
```

In this example, we've defined two themes, `light` and `dark`, each with their own set of colors.

## Configuration

- `defaultColorsTheme`: The default theme to be used when no theme is specified. It should be one of the keys in the `themes` array.
- `themes`: An array of theme names. Each theme must have a corresponding key in the `colors` object.
- `colors`: An object containing color definitions for each theme. Each theme should have a corresponding key in the `themes` array.
- `extend`: (optional) A boolean value that determines whether the colors should extend or override the default colors of Tailwind CSS. By default, it is set to `true`.

## Example configuration

```ts
TailwindColors({
  defaultColorsTheme: "light",
  themes: ["light", "dark", "halloween"] as const,
  colors: {
    light: {
      /* theme colors */
    },
    dark: {
      /* theme colors */
    },
    halloween: {
      /* theme colors */
    },
  },
  extend: false,
});
```

## Usage

By default, it will have the theme you specified in the configuration. If you want to change the theme, you can use the `data-theme` attribute on the `html` element.

```html
<html data-theme="halloween">
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

## Variants

Tailwind Colors also supports generating variants for each theme, allowing you to apply different styles based on the active theme. This is particularly useful when you want to adapt your design for multiple color schemes.

```html
<div class="bg-primary-500 halloween:bg-[#eb6123]">
  <!-- This will have the bg-primary-500 of each theme, but on the Halloween theme, it will have this special color -->
</div>
```

By using variants by theme, you can create adaptive designs that respond to different color schemes, providing a seamless experience for your users.
Each theme will have its own set of variants, which can be used to apply different styles based on the active theme.

## License

MIT License

<hr />

By using the Tailwind Colors plugin, you can easily create and manage multiple color themes for your Tailwind CSS projects. Enjoy customizing your themes!
