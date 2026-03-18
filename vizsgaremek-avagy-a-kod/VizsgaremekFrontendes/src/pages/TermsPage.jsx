export default function TermsPage() {
  return (
    <div className="page policy-page">
      <div className="container policy-container">
        <h1>Általános Szerződési Feltételek (ÁSZF)</h1>
        <p>
          Jelen dokumentum tartalmazza az InteriorShop webáruház használatának
          és a vásárlásnak a feltételeit.
        </p>

        <section>
          <h2>1. Szolgáltató adatai</h2>
          <p>
            Üzletnév: InteriorShop<br />
            E-mail: info@interiorshop.hu<br />
            Telefon: +36 1 234 5678
          </p>
        </section>

        <section>
          <h2>2. Rendelés menete</h2>
          <p>
            A termékek a kosárba helyezhetőek, majd a fizetési folyamat során
            a megrendelés véglegesíthető. A megrendelés elküldése fizetési
            kötelezettséggel jár.
          </p>
        </section>

        <section>
          <h2>3. Árak és fizetés</h2>
          <p>
            A weboldalon feltüntetett árak forintban (Ft) értendőek. A vásárlás
            során utánvétes fizetési mód érhető el.
          </p>
        </section>

        <section>
          <h2>4. Elállás joga</h2>
          <p>
            A fogyasztó a hatályos jogszabályok szerint a termék átvételétől
            számított 14 napon belül indoklás nélkül elállhat a vásárlástól.
          </p>
        </section>
      </div>
    </div>
  );
}
