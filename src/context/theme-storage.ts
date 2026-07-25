export const THEME_STORAGE_KEY = "theme";

export const DARK_CLASS = "dark";

export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("${DARK_CLASS}",d);}catch(e){}})();`;
