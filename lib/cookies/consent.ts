export type Consent = "accepted" | "rejected" | null;

const EVENT = "cookie-consent-change";

export function getConsent(): Consent {
  const match = document.cookie.match(
    /(?:^|; )cookie-consent=(accepted|rejected)/,
  );
  return (match?.[1] as Consent) ?? null;
}

export function setConsent(value: "accepted" | "rejected") {
  document.cookie = `cookie-consent=${value}; max-age=31536000; path=/; SameSite=Lax`;
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}
