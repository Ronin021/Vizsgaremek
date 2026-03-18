export default function ContactPage() {
  return (
    <div className="page policy-page">
      <div className="container policy-container">
        <h1>Kapcsolat</h1>
        <p>
          Kérdés, rendelés vagy reklamáció esetén ügyfélszolgálatunk az alábbi
          elérhetőségeken áll rendelkezésedre.
        </p>

        <section>
          <h2>1. Elérhetőségek</h2>
          <p>
            E-mail: info@interiorshop.hu
            <br />
            Telefon: +36 1 234 5678
          </p>
        </section>

        <section>
          <h2>2. Ügyfélszolgálati idő</h2>
          <p>
            Hétfőtől péntekig 9:00-17:00 között válaszolunk a megkeresésekre.
          </p>
        </section>

        <section>
          <h2>3. Székhely</h2>
          <p>
            1138 Budapest, Minta utca 12.
            <br />
            Magyarország
          </p>
        </section>
      </div>
    </div>
  );
}
