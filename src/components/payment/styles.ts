const lightStyles = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  "muted-foreground": "#737373",
  "destructive-foreground": "#fafafa",
  border: "#bfbfbf",
  ring: "#0a0a0a",
}

const darkStyles = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  "muted-foreground": "#a3a3a3",
  "destructive-foreground": "#fafafa",
  border: "#484848",
  ring: "#d4d4d4",
}

export const style = (theme: string) => {
  const currentStyle = theme === "dark" ? darkStyles : lightStyles

  return {
    input: {
      backgroundColor: currentStyle.background,
      color: currentStyle.foreground,
      fontSize: "14px",
      // fontFamily: "IBM Plex Sans, sans-serif",
    },
    "input::placeholder": {
      color: currentStyle["muted-foreground"],
    },
    "input.is-error": {
      color: currentStyle["destructive-foreground"],
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
      color: currentStyle["muted-foreground"],
    },
    ".message-icon": {
      color: currentStyle["muted-foreground"],
    },
    ".message-text.is-error": {
      color: currentStyle["destructive-foreground"],
    },
    ".message-icon.is-error": {
      color: currentStyle["destructive-foreground"],
    },
  }
}
