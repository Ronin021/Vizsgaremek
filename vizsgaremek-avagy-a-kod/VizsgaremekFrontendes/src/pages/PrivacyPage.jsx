export default function PrivacyPage() {
  return (
    <div className="page policy-page">
      <div className="container policy-container">
        <h1>Adatvédelmi Tájékoztató</h1>
        <p>
          Az InteriorShop tiszteletben tartja a felhasználók személyes adatait,
          és azokat a hatályos adatvédelmi jogszabályok szerint kezeli.
        </p>

        <section>
          <h2>1. Kezelt adatok köre</h2>
          <p>
            Név, e-mail cím, telefonszám, szállítási cím és rendeléshez
            kapcsolódó adatok.
          </p>
        </section>

        <section>
          <h2>2. Adatkezelés célja</h2>
          <p>
            Az adatok kezelése a rendelések teljesítéséhez, ügyfélszolgálati
            kapcsolattartáshoz és jogszabályi kötelezettségek teljesítéséhez
            történik.
          </p>
        </section>

        <section>
          <h2>3. Adattovábbítás</h2>
          <p>
            Az adatokat harmadik félnek csak a szolgáltatás teljesítéséhez
            szükséges mértékben továbbítjuk (pl. futárszolgálat).
          </p>
        </section>

        <section>
          <h2>4. Érintetti jogok</h2>
          <p>
            A felhasználó jogosult tájékoztatást kérni, adatait helyesbíteni,
            törölni, illetve az adatkezelés korlátozását kérni.
          </p>
        </section>
      </div>
    </div>
  );
}
