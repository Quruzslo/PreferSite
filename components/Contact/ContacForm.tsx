"use client";
import { useState } from "react";
import validateContactForm, { ContactFormErrors } from "./validate";

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputFields = [
    { name: "name", type: "text", label: "Teljes neved", required: true },
    { name: "email", type: "email", label: "E-mail címed", required: true },
    { name: "tel", type: "tel", label: "Telefonszámod", required: true },
    { name: "subject", type: "text", label: "Üzeneted témája", required: true },
    {
      name: "message",
      type: "textarea",
      label: "Miben segíthetek?",
      required: true,
    },
  ];

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
    setIsSubmitting(true);
    setIsSuccess(false);

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
        setIsSuccess(true);
        form.reset();
      } else {
        alert("Hiba történt az üzenet küldése során.");
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      alert("Hálózati hiba történt, próbáld újra később!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col mt-[35px] gap-[35px] px-[15px] py-[30px] rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[35px]"
        noValidate
      >
        {/* Honeypot mező */}
        <input
          type="text"
          name="fax_number"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {inputFields.map((field) => {
          const isTextarea = field.type === "textarea";
          const hasError = !!errors[field.name];

          return (
            <div key={field.name} className="w-full relative flex flex-col">
              {isTextarea ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder=" "
                  required={field.required}
                  rows={4}
                  className={`peer input-field w-full bg-transparent outline-none py-[5px] text-white border-b-2 resize-none ${
                    hasError ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder=" "
                  required={field.required}
                  className={`peer input-field w-full h-full bg-transparent outline-none py-[5px] text-white border-b-2 ${
                    hasError ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              )}

              <label
                htmlFor={field.name}
                className="absolute left-[0px] top-[50%] -translate-y-[50%] text-base transition-all duration-300 pointer-events-none text-neutral-300
                  peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-red-400
                  peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-green"
              >
                {field.label}
              </label>

              {hasError && (
                <span className="text-red-700 text-xs mt-1 absolute -bottom-5">
                  {errors[field.name] as string}
                </span>
              )}
            </div>
          );
        })}

        {/* Adatkezelési nyilatkozat */}
        <div className="flex flex-col gap-1 mt-4">
          <label className="flex items-center gap-2 text-dark-green/70 text-sm cursor-pointer w-max">
            <input
              type="checkbox"
              name="adatkezeles"
              className="accent-green w-4 h-4"
            />
            Elfogadom az adatkezelési tájékoztatót.
          </label>
          {errors.adatkezeles && (
            <span className="text-red-500 text-xs">
              {errors.adatkezeles as string}
            </span>
          )}
        </div>

        {isSuccess && (
          <p className="text-green-600 font-medium text-sm">
            Köszönöm! Az üzeneted sikeresen elküldve.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-2 bg-dark-green text-dark-color rounded font-medium hover:bg-dark-green hover:text-white transition-colors self-start duration-300 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Küldés..." : "Elküldés"}
        </button>
      </form>
    </div>
  );
}
