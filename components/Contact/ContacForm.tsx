"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import validateContactForm, { ContactFormErrors } from "./validate";
import { TransitionLink } from "@/lib/site/transition";

const inputFields = [
  { name: "name", type: "text", label: "Teljes neved", autoComplete: "name" },
  { name: "email", type: "email", label: "E-mail címed", autoComplete: "email" },
  { name: "tel", type: "tel", label: "Telefonszámod", autoComplete: "tel" },
  { name: "subject", type: "text", label: "Üzeneted témája", autoComplete: "off" },
  { name: "message", type: "textarea", label: "Miben segíthetek?", autoComplete: "off" },
];

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validateContactForm(data);

    if (validationErrors._bot) {
      console.warn("Bot gyanú, megszakítás.");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSendError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/formSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        form.reset();
        setIsSuccess(true);
      } else {
        setSendError(
          "Az üzenet nem ment el. Próbáld újra, vagy írj közvetlenül a sziligalaron@gmail.com címre.",
        );
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      setSendError(
        "Nincs kapcsolat a szerverrel. Ellenőrizd az internetkapcsolatot, és küldd el újra.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSuccess ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6 rounded-[6px] bg-ink p-8 text-paper md:p-12"
        >
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-full bg-green text-2xl text-ink"
          >
            ✓
          </span>
          <h2 className="type-h3">Megkaptam az üzeneted</h2>
          <p className="max-w-[40ch] text-stone-light">
            Hamarosan felveszem veled a kapcsolatot a megadott e-mail címen vagy
            telefonszámon.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="rounded-[4px] bg-paper px-4 py-2 font-medium text-ink transition-colors hover:bg-white"
          >
            Új üzenet írása
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-9"
        >
          {/* Honeypot mező */}
          <input
            type="text"
            name="fax_number"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          {inputFields.map((field) => {
            const error = errors[field.name] as string | undefined;
            const errorId = `${field.name}-error`;
            const fieldClass = `peer w-full resize-none border-b bg-transparent pb-2 pt-1 text-lg outline-none transition-colors placeholder:text-transparent focus:border-ink ${
              error ? "border-red-700" : "border-ink/30"
            }`;

            return (
              <div key={field.name} className="relative flex flex-col pt-5">
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder=" "
                    rows={4}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClass}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder=" "
                    autoComplete={field.autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClass}
                  />
                )}
                <label
                  htmlFor={field.name}
                  className="pointer-events-none absolute left-0 top-6 text-lg text-stone transition-all duration-300 ease-out-expo peer-focus:top-0 peer-focus:text-sm peer-focus:text-ink peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm"
                >
                  {field.label}
                </label>
                {error && (
                  <span id={errorId} className="mt-2 text-sm text-red-700">
                    {error}
                  </span>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-2">
            <label className="flex w-fit items-start gap-3">
              <input
                type="checkbox"
                name="adatkezeles"
                className="mt-1 size-4 accent-ink"
                aria-invalid={!!errors.adatkezeles}
              />
              <span>
                Elfogadom az{" "}
                <TransitionLink
                  href="/adatkezeles"
                  className="underline underline-offset-4"
                >
                  adatkezelési tájékoztatót
                </TransitionLink>
                .
              </span>
            </label>
            {errors.adatkezeles && (
              <span className="text-sm text-red-700">
                {errors.adatkezeles as string}
              </span>
            )}
          </div>

          {sendError && (
            <p role="alert" className="rounded-[4px] bg-red-700/10 p-4 text-red-800">
              {sendError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-fit items-center gap-3 rounded-[4px] bg-ink px-5 py-2.5 text-lg font-medium text-paper transition-colors hover:bg-ink-card disabled:opacity-60"
          >
            {isSubmitting ? "Küldés folyamatban…" : "Üzenet elküldése"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
