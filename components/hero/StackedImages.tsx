import Image from "next/image";

// Képek
import Andocs from "@/public/references/andocs.jpg";
import Sya from "@/public/references/syasolutions.jpg";
import Panna from "@/public/references/glambypanna.jpg";
import Kiskertesz from "@/public/references/kiskerteszbolt.jpg";

export default function StackedImages() {
  return (
    <div className="stacked-wrapper h-full">
      {/* 1. Kép */}
      <div className="stacked-item stacked-1">
        <Image
          fill
          className="stacked-img"
          alt="Andocs weboldal referencia"
          src={Andocs}
          // sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 2. Kép */}
      <div className="stacked-item stacked-2">
        <Image
          fill
          className="stacked-img"
          alt="SYA Solutions weboldal referencia"
          src={Sya}
          // sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 3. Kép */}
      <div className="stacked-item stacked-3">
        <Image
          fill
          className="stacked-img"
          alt="Glam by Panna weboldal referencia"
          src={Panna}
          // sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 4. Kép */}
      <div className="stacked-item stacked-4">
        <Image
          fill
          className="stacked-img"
          alt="Kiskertész bolt weboldal referencia"
          src={Kiskertesz}
          // sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
