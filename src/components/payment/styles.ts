const lightStyles = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  muted: "#737373", // renamed from muted-foreground
  destructive: "#dc2626",
  border: "#bfbfbf",
  ring: "#0a0a0a",
}

const darkStyles = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a3a3a3", // renamed from muted-foreground
  destructive: "#ef4444",
  border: "#484848",
  ring: "#d4d4d4",
}

export const style = (theme: string) => {
  const currentStyle = theme === "dark" ? darkStyles : lightStyles

  return {
    input: {
      color: currentStyle.foreground,
      backgroundColor: currentStyle.background,
      fontSize: "14px",
      // fontFamily: "IBM Plex Sans, sans-serif",
    },
    "input::placeholder": {
      color: currentStyle.muted,
    },
    "input.is-error": {
      color: currentStyle.destructive,
    },
    ".input-container": {
      borderColor: currentStyle.border,
      borderRadius: "0px",
    },
    ".input-container.is-focus": {
      borderColor: currentStyle.ring,
    },
    ".input-container.is-error": {
      borderColor: "#ff1600",
    },
    ".message-text": {
      color: currentStyle.muted,
    },
    ".message-icon": {
      color: currentStyle.muted,
    },
    ".message-text.is-error": {
      color: currentStyle.destructive,
    },
    ".message-icon.is-error": {
      color: currentStyle.destructive,
    },
  }
}
