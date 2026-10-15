(() => {
  const notice = document.querySelector("#cookie-notice");
  if (!notice) return;

  const storageKey = "puru-cookie-notice-v1";
  const dismissButton = notice.querySelector("[data-cookie-notice-dismiss]");
  const openButtons = document.querySelectorAll("[data-cookie-notice-open]");

  try {
    notice.hidden = window.localStorage.getItem(storageKey) === "acknowledged";
  } catch {
    notice.hidden = false;
  }

  dismissButton?.addEventListener("click", () => {
    try {
      window.localStorage.setItem(storageKey, "acknowledged");
    } catch {
      // Keep the notice usable when browser storage is unavailable.
    }
    notice.hidden = true;
  });

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      notice.hidden = false;
      dismissButton?.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !notice.hidden) notice.hidden = true;
  });
})();
