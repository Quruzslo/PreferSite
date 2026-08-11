"use client";

import pricingData from "./pricing";
import { FiCheckCircle } from "react-icons/fi";
import { MdArrowForward, MdArrowOutward } from "react-icons/md";

export default function PricingSection() {
  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[50px]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Csomagok és árazás
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Válaszd ki a céljaidnak leginkább megfelelő digitális megoldást.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 items-stretch">
        {pricingData.map((plan: any) => (
          <div
            key={plan.id}
            className={`relative group flex flex-col justify-between p-[10px] gap-[20px] md:p-8 rounded-md shadow-md overflow-hidden zoldhatteres  ${
              plan.popular || plan.mostPopular
                ? "border-green shadow-xl ring-2 ring-green/20"
                : ""
            } transition-all duration-300`}
          >
            {/* háttér elem 1 */}
            <div
              className="bg-green/30 z-0 absolute bottom-0 left-0 h-3/4 w-full rounded-3xl transition duration-500 translate-y-[50%]
    group-hover:bg-green/60 group-hover:translate-y-[20%]
    group-active:bg-green/60 group-active:translate-y-[20%]
    group-focus:bg-green/60 group-focus:translate-y-[20%]"
              style={{ transform: "skew(0, 10deg)" }}
            ></div>

            {/* háttér elem 1 */}
            <div className="bg-white/70 z-1 absolute bottom-0 left-0  h-full w-full "></div>

            {plan.mostPopular && (
              <span className="absolute z-2 top-[5px] left-[5px] bg-green text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                Legnépszerűbb
              </span>
            )}

            {plan.popular && (
              <span className="absolute z-2 top-[5px] left-[5px] bg-green text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                Népszerű
              </span>
            )}

            <div className="z-1 mt-[35px]">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
                {plan.description}
              </p>

              <div className="my-4 pb-4 border-b border-gray-400">
                <span className="text-3xl font-extrabold text-dark-color">
                  {plan.price}
                </span>
              </div>

              <div className="bg-dark-green p-[10px] rounded-xl mb-6 ">
                <p className="text-[15px] font-bold text-gray-100 uppercase tracking-wider mb-1">
                  Mikor válaszd ezt?
                </p>
                <p className="text-xs text-gray-100 leading-relaxed">
                  {plan.useCase}
                </p>
              </div>

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

            <button
              className={`group z-1 flex w-fit flex-row items-center justify-center gap-3 rounded-full py-3 px-6 font-bold transition-all duration-300 ${
                plan.popular
                  ? "bg-green text-white shadow-md hover:shadow-lg"
                  : "bg-dark-color text-white"
              }`}
            >
              <span>Erre van szükségem</span>
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
