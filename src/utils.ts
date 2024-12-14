function hexToRgbChannels(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
  }
  
  function rgbToRgbChannels(rgb: string) {
    const result = rgb.match(/\d+/g);
    return result ? result.slice(0, 3).join(' ') : null;
  }
  
  export function varAlpha(color: string, opacity = 1) {
    if (color.startsWith('#')) {
      color = hexToRgbChannels(color);
    } else if (color.startsWith('rgb')) {
      const rgbChannels = rgbToRgbChannels(color);
      if (rgbChannels === null) {
        throw new Error(`[Alpha]: Invalid RGB color format "${color}".`);
      }
      color = rgbChannels;
    }
    if (!color.startsWith('var(--palette-common-') && !color.match(/^\d+ \d+ \d+$/)) {
      throw new Error(
        `[Alpha]: Unsupported color format "${color}".
         Supported formats are:
         - RGB channels: "0 184 217".
         - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
         Unsupported formats are:
         - Hex: "#00B8D9".
         - RGB: "rgb(0, 184, 217)".
         - RGBA: "rgba(0, 184, 217, 1)".
         `
      );
    }
    return `rgba(${color} / ${opacity})`;
  }