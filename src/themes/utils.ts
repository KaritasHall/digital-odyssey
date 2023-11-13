import { themes } from "./index";

export type ThemeName =
  | "base"
  | "forest"
  | "mansion"
  | "castle"
  | "cave"
  | "rosegarden";

export interface ITheme {
  [key: string]: string;
}

export type IThemes = Record<ThemeName, ITheme>;

export interface IMappedTheme {
  [key: string]: string | null;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
  return {
    "--color-storyteller": variables.storyteller || "",
    "--color-player": variables.player || "",
    "--color-background": variables.background || "",
  };
};

export const applyTheme = (theme: ThemeName): void => {
  const themeObject: IMappedTheme = mapTheme(themes[theme]);

  // check if client side, if not return
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    if (property === "name") {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};
