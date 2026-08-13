import Image from "next/image";
import Logom from "@/public/Prefer-logo.png";
import navItems from "@/lib/navItems";
// Ikonok------------
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineCookie } from "react-icons/md";

export default function Footer() {
  return (
    <section className="w-full flex flex-col md:flex-row bg-dark-color  text-white py-[50px]">
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-[20px] bg-dark-green p-[15px] mx-auto rounded-[24px]">
        <div className="w-full flex flex-col gap-[15px]">
          <div className="footer-logo flex flex-row px-[20px] py-[10px] rounded-b-[24px] mb-[25px] bg-dark-color  items-center relative w-fit mx-auto mt-[-15px]">
            <Image
              height={40}
              width={40}
              alt="Weboldal készítés, webshop készítés, CRM rendszer készítés"
              src={Logom}
            ></Image>
          </div>

          <p>
            Több éves tapasztalat webfejlesztés terén. Célom, hogy pénztermelő
            rendszereket fejlesszek cégeknek, vállalkozásoknak, akik valóban
            szeretnének kitűnni a konkurenciájuk közül.
          </p>
          <p>
            A folyamatos partneri viszony nálam alapvetés, a közös munka mindig
            meghozza a várt sikereket!
          </p>
        </div>

        <div className="w-full flex flex-col gap-[15px] justify-center">
          <div className="flex flex-row gap-[10px] mb-[25px]  pb-[10px] ">
            <h3>- Navigáció -</h3>
          </div>
          <div className="w-full flex flex-col gap-[15px] justify-center">
            {navItems.map((item, _) => (
              <a
                key={item.name}
                href={item.path}
                className="py-[5px] px-[20px] bg-dark-color rounded-full w-fit"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[15px]">
          <div className="flex flex-row gap-[10px] mb-[25px]  pb-[10px] items-center ">
            <h3>- Kapcsolat -</h3>
          </div>
          <div className="w-full flex flex-col gap-[15px] justify-center">
            <a
              href="mailto:info@prefersite.hu"
              className="flex flex-row gap-[15px] items-center"
            >
              <HiOutlineMail size={25} /> info@prefersite.hu
            </a>
            <a
              href="tel:+36203127968"
              className="flex flex-row gap-[15px] items-center"
            >
              <FaPhoneVolume size={25} /> +36 20 312 7968
            </a>
            <a
              href="prefersite.hu/adatkezeles"
              className="flex flex-row gap-[15px] items-center"
            >
              <MdOutlineCookie size={25} /> Süti -és adatkezelés
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
