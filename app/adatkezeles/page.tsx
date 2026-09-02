export default function Adatkezeles() {
  return (
    <section className="w-[90%]  mx-auto py-12 text-white/90 space-y-8 bg-dark-color px-10 my-[100px] rounded-md">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Adatkezelési Tájékoztató
        </h1>
        <p className="text-sm text-gray-400">
          A prefersite.hu weboldal látogatói és érdeklődői részére
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Fejezet */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Bevezetés</h2>
          <p className="leading-relaxed">
            A jelen Adatkezelési Tájékoztató célja, hogy a{" "}
            <strong className="text-white">prefersite.hu</strong> weboldal
            látogatói és a kapcsolatfelvételi űrlapot kitöltő érdeklődők (a
            továbbiakban: Érintett) egyértelmű, részletes és átlátható
            tájékoztatást kapjanak személyes adataik kezeléséről, az adatkezelés
            céljáról, jogalapjáról, időtartamáról, valamint az Érintetteket
            megillető jogokról és jogorvoslati lehetőségekről az Európai Unió
            Általános Adatvédelmi Rendelete (2016/679/EU, a továbbiakban: GDPR)
            és az Infotv. rendelkezéseivel összhangban.
          </p>
        </div>

        {/* 2. Fejezet */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Az Adatkezelő adatai és elérhetőségei
          </h2>
          <p>
            A weboldal üzemeltetése és a weboldalon gyűjtött adatok tekintetében
            az Adatkezelő:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong className="text-white">Név:</strong> Szili Gál Áron
            </li>
            <li>
              <strong className="text-white">Székhely:</strong> 7431 Juta
            </li>

            <li>
              <strong className="text-white">E-mail cím:</strong>{" "}
              info@prefersite.hu
            </li>
            <li>
              <strong className="text-white">Telefonszám:</strong> +36 20 312
              7968
            </li>
            <li>
              <strong className="text-white">Weboldal:</strong> prefersite.hu
            </li>
          </ul>
        </div>

        {/* 3. Fejezet */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            3. A kezelt adatok köre, célja, jogalapja és az adatkezelés
            időtartama
          </h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white/90">
              3.1. Kapcsolatfelvételi és ajánlatkérő űrlap
            </h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong className="text-white">Kezelt adatok köre:</strong> Név,
                E-mail cím, Telefonszám, az üzenetben megadott egyéb személyes
                adatok.
              </li>
              <li>
                <strong className="text-white">Az adatkezelés célja:</strong>{" "}
                Kapcsolatfelvétel az Érintettel, ajánlatadás, egyeztetés
                webfejlesztési és digitális szolgáltatásokkal kapcsolatban.
              </li>
              <li>
                <strong className="text-white">
                  Az adatkezelés jogalapja:
                </strong>{" "}
                Az Érintett kifejezett, önkéntes hozzájárulása [GDPR 6. cikk (1)
                bekezdés a) pont].
              </li>
              <li>
                <strong className="text-white">
                  Az adatkezelés időtartama:
                </strong>{" "}
                A kapcsolatfelvétel és a megkeresés elintézését követő 1 évig,
                vagy az Érintett hozzájárulásának visszavonásáig.
              </li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-lg font-medium text-white/90">
              3.2. A weboldal technikai adatai és a Sütik (Cookies)
            </h3>
            <p>
              A weboldal kizárólag a{" "}
              <strong className="text-white">
                működéshez elengedhetetlenül szükséges (technikai)
              </strong>{" "}
              sütiket használja. A weboldal nem használ marketing, sem harmadik
              féltől származó analitikai (statisztikai) sütiket.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong className="text-white">Cél:</strong> A weboldal alapvető
                működésének biztosítása (pl. a süti-elfogadási döntés
                eltárolása).
              </li>
              <li>
                <strong className="text-white">Kezelt adatok köre:</strong> A
                süti elfogadásának állapota (<code>cookie-consent</code>).
              </li>
              <li>
                <strong className="text-white">Jogalap:</strong> Az Adatkezelő
                jogos érdeke [GDPR 6. cikk (1) bekezdés f) pont].
              </li>
              <li>
                <strong className="text-white">Időtartam:</strong> Maximum 1
                évig a böngészőben (a süti lejárati idejéig).
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Fejezet */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Kik férnek hozzá az adatokhoz? (Adatfeldolgozók)
          </h2>
          <p>
            Az Adatkezelő az adatok biztonságos tárolása és a weboldal
            üzemeltetése érdekében az alábbi adatfeldolgozót veszi igénybe:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong className="text-white">
                Tárhelyszolgáltató és Levelezés:
              </strong>{" "}
              [Tárhelyszolgáltató Cégneve, Székhelye]
            </li>
            <li>
              <strong className="text-white">Funkció:</strong> A weboldal
              forráskódjának, adatainak és az e-mail levelezésnek a tárolása.
            </li>
          </ul>
        </div>

        {/* 5. Fejezet */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Az Érintettek jogai és jogorvoslat
          </h2>
          <p className="leading-relaxed">
            Az Érintett az{" "}
            <strong className="text-white">info@prefersite.hu</strong> e-mail
            címen keresztül bármikor, díjmentesen kérheti adataihoz való
            hozzáférését, azok helyesbítését, törlését, korlátozását, valamint
            gyakorolhatja adathordozhatósághoz és a hozzájárulás visszavonásához
            való jogát.
          </p>
          <p className="font-medium text-white pt-2">
            Panaszvételi lehetőség hatóságnál:
          </p>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1 text-sm">
            <p className="font-semibold text-white">
              Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
            </p>
            <p>Székhely: 1055 Budapest, Falk Miksa utca 9-11.</p>
            <p>Postacím: 1363 Budapest, Pf.: 9.</p>
            <p>E-mail: ugyfelszolgalat@naih.hu</p>
            <p>Weboldal: www.naih.hu</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-gray-500">
          Hatályos: 2026. szeptember 2-től
        </div>
      </div>
    </section>
  );
}
