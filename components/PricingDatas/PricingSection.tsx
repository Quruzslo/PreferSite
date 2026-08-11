"use client";

import pricingData from "./pricing";
import { FiCheckCircle } from "react-icons/fi";
import { MdArrowForward, MdArrowOutward } from "react-icons/md";

export default function PricingSection() {
  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[50px]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Csomagok és Árazás
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Válaszd ki a céljaidnak leginkább megfelelő digitális megoldást.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {pricingData.map((plan: any) => (
          <div
            key={plan.id}
            className={`relative group flex flex-col justify-between p-8 bg-white rounded-md border overflow-hidden ${
              plan.popular
                ? "border-green shadow-xl ring-2 ring-green/20"
                : "border-dark-color/20 shadow-sm hover:shadow-md"
            } transition-all duration-300`}
          >
            {/* Díszítő háttér elem */}
            <div
              className="bg-green/10 z-0  group-hover:bg-green/20 absolute bottom-0 left-0  h-3/4 w-full rounded-3xl transition duration-500 translate-y-[50%] group-hover:translate-y-[20%]"
              style={{ transform: "skew(0, 10deg)" }}
            ></div>

            {plan.popular && (
              <span className="absolute top-[5px] left-[5px] bg-green text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                Legnépszerűbb
              </span>
            )}

            <div className="!z-2 mt-[15px]">
              {/* Fejléc */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
                {plan.description}
              </p>

              {/* Ár */}
              <div className="my-4 pb-4 border-b border-gray-400">
                <span className="text-3xl font-extrabold text-dark-color">
                  {plan.price}
                </span>
              </div>

              {/* Mire jó blokk */}
              <div className="bg-gray-50 p-3.5 rounded-xl mb-6 border border-gray-400">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mikor válaszd ezt?
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {plan.useCase}
                </p>
              </div>

              {/* Funkciók felsorolása */}
              <div className="space-y-3 mb-8">
                {plan.attributes.map((attr: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <FiCheckCircle className="w-5 h-5 text-green shrink-0 mt-0.5" />
                    <span>{attr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gomb */}
            <button
              className={`group z-2 flex w-fit flex-row items-center justify-center gap-3 rounded-full py-3 px-6 font-bold transition-all duration-300 ${
                plan.popular
                  ? "bg-green text-white shadow-md hover:shadow-lg"
                  : "bg-dark-color text-white"
              }`}
            >
              <span>Ajánlatot kérek</span>
              <div className="flex items-center justify-center w-0 opacity-0 -translate-x-2 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                <MdArrowForward
                  size={24}
                  className="text-white rounded-full p-1 shrink-0"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
