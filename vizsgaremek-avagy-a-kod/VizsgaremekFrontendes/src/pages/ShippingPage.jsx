export default function ShippingPage() {
  return (
    <div className="page policy-page">
      <div className="container policy-container">
        <h1>Szállítási Információk</h1>
        <p>
          A rendelések kiszállítása országosan történik szerződött
          futárszolgálat segítségével.
        </p>

        <section>
          <h2>1. Szállítási idő</h2>
          <p>
            Átlagosan 2-5 munkanap, készlettől és szállítási címtől függően.
          </p>
        </section>

        <section>
          <h2>2. Szállítási díj</h2>
          <p>
            A szállítási díj a rendelés összege alapján kerül kiszámításra. A
            kosár oldalon a pontos összeg mindig látható.
          </p>
        </section>

        <section>
          <h2>3. Atvetel</h2>
          <p>
            A futár a megadott címen kísérli meg a kézbesítést. Sikertelen
            kézbesítés esetén a futárszolgálat új időpontot egyeztet.
          </p>
        </section>

        <section>
          <h2>4. Sérült csomag</h2>
          <p>
            Átvételkor ellenőrizd a csomag állapotát. Sérülés esetén kérjük,
            vetess fel jegyzőkönyvet a futárral.
          </p>
        </section>
      </div>
    </div>
  );
}
