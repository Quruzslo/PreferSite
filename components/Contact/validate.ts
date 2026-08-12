export interface ContactFormErrors {
  name?: string;
  email?: string;
  tel?: string;
  subject?: string;
  message?: string;
  adatkezeles?: string;
  _bot?: boolean;
  [key: string]: string | boolean | undefined;
}

export default function validateContactForm(
  formData: Record<string, any>,
): ContactFormErrors {
  const currentErrors: ContactFormErrors = {};

  // Név ellenőrzése
  if (!formData.name || !formData.name.trim()) {
    currentErrors.name = "A név kitöltése kötelező!";
  } else if (formData.name.trim().length < 5) {
    currentErrors.name = "A név legalább 5 karakter hosszú legyen!";
  }

  // E-mail ellenőrzése
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    currentErrors.email = "Az e-mail cím kitöltése kötelező!";
  } else if (!emailRegex.test(formData.email)) {
    currentErrors.email = "Kérlek, érvényes e-mail címet adj meg!";
  }

  // Telefonszám ellenőrzése
  const phoneRegex = /^[0-9\s\-+]{7,15}$/;
  if (!formData.tel) {
    currentErrors.tel = "A telefonszám kitöltése kötelező!";
  } else if (!phoneRegex.test(formData.tel)) {
    currentErrors.tel = "Nem megfelelő telefonszám formátum!";
  }

  // Tárgy ellenőrzése
  if (!formData.subject || !formData.subject.trim()) {
    currentErrors.subject = "A tárgy mező kitöltése kötelező!";
  }

  // Üzenet ellenőrzése
  if (!formData.message || !formData.message.trim()) {
    currentErrors.message = "Az üzenet mező kitöltése kötelező!";
  } else if (formData.message.trim().length < 10) {
    currentErrors.message =
      "Kérlek, fejtsd ki bővebben az üzenetet (min. 10 karakter)!";
  } else if (formData.message.trim().length > 250) {
    currentErrors.message = "Túl hosszú az üzeneted!";
  }

  // Adatkezelési nyilatkozat ellenőrzése
  if (formData.adatkezeles !== "on" && !formData.adatkezeles) {
    currentErrors.adatkezeles =
      "Az adatkezelési tájékoztató elfogadása kötelező!";
  }

  // Honeypot a robotok ellen
  if (formData.fax_number && formData.fax_number.trim() !== "") {
    return { _bot: true };
  }

  return currentErrors;
}
