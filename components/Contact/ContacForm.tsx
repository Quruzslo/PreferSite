"use client";
import { useState } from "react";
import validateContactForm, { ContactFormErrors } from "./validate";
import { BiMailSend } from "react-icons/bi";

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
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
        setIsExiting(true);

        setTimeout(() => {
          setIsSuccess(true);
          setIsExiting(false);
          form.reset();
        }, 600);
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

  if (isSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-green-50/50 rounded-2xl border border-green-200 gap-6 animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold">
          ✓
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-dark-color">
            Köszönöm az üzeneted!
          </h3>
          <p className="text-neutral-600 max-w-md">
            Az üzeneted sikeresen megérkezett. Hamarosan felveszem veled a
            kapcsolatot!
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-2 px-6 py-2.5 bg-dark-green text-white rounded-lg font-medium hover:scale-105 transition-all cursor-pointer"
        >
          Új üzenet küldése
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-[35px] p-[15px] rounded-2xl overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[35px] w-full h-full justify-between"
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

        {/* Input mezők */}
        <div className="flex flex-col gap-[35px] w-full">
          {inputFields.map((field) => {
            const isTextarea = field.type === "textarea";
            const hasError = !!errors[field.name];

            return (
              <div
                key={field.name}
                className={`w-full relative flex flex-col form-fields-wrapper ${
                  isExiting ? "active" : "inactive"
                }`}
              >
                {isTextarea ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder=" "
                    required={field.required}
                    rows={4}
                    className={`peer input-field w-full bg-transparent outline-none py-[5px] text-dark-color border-b-2 resize-none ${
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
                    className={`peer input-field w-full bg-transparent outline-none py-[5px] text-dark-color border-b-2 ${
                      hasError ? "border-red-500" : "border-neutral-300"
                    }`}
                  />
                )}

                <label
                  htmlFor={field.name}
                  className="absolute left-[0px] top-[50%] -translate-y-[50%] text-base transition-all duration-300 pointer-events-none text-dark-color
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
        </div>

        <div
          className={`flex flex-col gap-6 form-fields-wrapper ${
            isExiting ? "active" : "inactive"
          }`}
        >
          {/* Adatkezelési nyilatkozat */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-dark-color cursor-pointer w-max">
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

          <button
            type="submit"
            disabled={isSubmitting || isExiting}
            className="group relative flex items-center justify-center gap-2 px-6 py-2 bg-dark-green text-white rounded-full font-medium hover:bg-dark-green hover:scale-[1.05] transition-all duration-300 self-start disabled:opacity-50 cursor-pointer overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <span>Küldés...</span>

                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <span>Elküldés</span>

                <BiMailSend className="text-xl transition-all duration-300 transform translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 -mr-6 group-hover:mr-0" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
