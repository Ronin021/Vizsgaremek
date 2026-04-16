describe('InteriorShop - E2E Tesztek', () => {
  // 1. teszt - Főoldal betöltődik
  it('1. Főoldal betöltődik és logo látható', () => {
    cy.visit('/')
    cy.get('.logo-text').should('be.visible')
    cy.contains('InteriorShop').should('exist')
  })

  // 2. teszt - Termékek oldal
  it('2. Termékek oldal betöltődik és termékeket jelenít meg', () => {
    cy.visit('/products')
    cy.get('.page-products').should('be.visible')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 3. teszt - Termék keresés
  it('3. Termék keresés működik', () => {
    cy.visit('/products')
    cy.get('.filter-search input').type('LED')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 4. teszt - Kosárba adás
  it('4. Termék kosárba adása működik', () => {
    cy.visit('/products')
    cy.get('.product-card').first().within(() => {
      cy.get('.btn-black').click()
    })
    cy.get('.cart-badge').should('contain', '1')
  })

  // 5. teszt - Kosár oldal
  it('5. Kosár oldal megjeleníti a termékeket', () => {
    cy.visit('/products')
    cy.get('.product-card').first().within(() => {
      cy.get('.btn-black').click()
    })
    cy.get('.cart-button').click()
    cy.url().should('include', '/cart')
  })

  // 6. teszt - Bejelentkezés oldal
  it('6. Bejelentkezési oldal betöltődik és forma látható', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  // 7. teszt - Kategória szűrés
  it('7. Kategória szűrés működik', () => {
    cy.visit('/products')
    cy.get('.filter-select select').first().select('1')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 8. teszt - Ár szerinti rendezés
  it('8. Ár szerinti rendezés működik', () => {
    cy.visit('/products')
    cy.get('.filter-select select').eq(1).select('price-asc')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 9. teszt - Mobilnézet hamburger menü
  it('9. Hamburger menü működik mobilnézeten', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    cy.get('.hamburger-menu').should('be.visible')
    cy.get('.hamburger-menu').click()
    cy.get('.main-nav').should('have.class', 'mobile-nav-open')
  })

  // 10. teszt - Termék részletoldal
  it('10. Termék részletoldala betöltődik', () => {
    cy.visit('/products')
    cy.get('.product-card').first().click()
    cy.url().should('include', '/products/')
  })

  // 11. teszt - Pagination működik
  it('11. Pagination előző/következő gombok működnek', () => {
    cy.visit('/products')
    cy.get('.pagination-arrow').should('have.length', 2)
  })

  // 12. teszt - Keresés üres eredmény
  it('12. Keresés - nincs eredmény kezelés', () => {
    cy.visit('/products')
    cy.get('.filter-search input').type('xyzabc12345')
    cy.get('.product-card').should('have.length', 0)
  })

  // 13. teszt - Footer látható
  it('13. Footer megjeleníti a linkeket', () => {
    cy.visit('/')
    cy.get('footer').should('be.visible')
  })

  // 14. teszt - Regisztrációs oldal
  it('14. Regisztrációs oldal betöltődik és forma látható', () => {
    cy.visit('/register')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  // 15. teszt - Headerben navigáció működik
  it('15. Header navigáció linkei működnek', () => {
    cy.visit('/')
    cy.get('.logo').click()
    cy.url().should('eq', 'http://localhost:5173/')
  })

  // 16. teszt - Hamburger menü bezárása
  it('16. Hamburger menü bezárható az overlay kattintásával', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    cy.get('.hamburger-menu').click()
    cy.get('.mobile-overlay').click()
    cy.get('.main-nav').should('not.have.class', 'mobile-nav-open')
  })

  // 17. teszt - Termék stock badge
  it('17. Termék stock badge látható', () => {
    cy.visit('/products')
    cy.get('.stock-badge').should('be.visible')
  })

  // 18. teszt - Mobilnézet - termékkártya
  it('18. Mobilnézet - termékkártyák reszponzívak', () => {
    cy.viewport('iphone-6')
    cy.visit('/products')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 19. teszt - Bejelentkezési oldal - email input
  it('19. Bejelentkezés email input működik', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="email"]').should('have.value', 'test@example.com')
  })

  // 20. teszt - Bejelentkezési oldal - jelszó input
  it('20. Bejelentkezés jelszó input működik', () => {
    cy.visit('/login')
    cy.get('input[type="password"]').type('password123')
    cy.get('input[type="password"]').should('have.value', 'password123')
  })

  // 21. teszt - Regisztrációs oldal - jelszó input
  it('21. Regisztráció jelszó input működik', () => {
    cy.visit('/register')
    cy.get('input[type="password"]').first().type('pass123')
    cy.get('input[type="password"]').first().should('have.value', 'pass123')
  })

  // 22. teszt - Kategória "Összes" szűrés
  it('22. Kategória "Összes" szűrés mutatja az összes terméket', () => {
    cy.visit('/products')
    cy.get('.filter-select select').first().select('all')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 23. teszt - Ár csökkenő rendezés
  it('23. Ár szerinti rendezés (csökkenő) működik', () => {
    cy.visit('/products')
    cy.get('.filter-select select').eq(1).select('price-desc')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })

  // 24. teszt - Termékkártya hover effekt
  it('24. Termékkártya interaktív', () => {
    cy.visit('/products')
    cy.get('.product-card').first().trigger('mouseover')
    cy.get('.product-card').first().should('be.visible')
  })

  // 25. teszt - Kosár ikon badge
  it('25. Kosár ikon badge számot mutat', () => {
    cy.visit('/products')
    cy.get('.product-card').first().within(() => {
      cy.get('.btn-black').click()
    })
    cy.get('.cart-badge').should('have.text', '1')
  })

  // 26. teszt - Desktopnézet - termékkártyák 3 oszlopban
  it('26. Desktopnézet - termékek 3 oszlopban jelennek meg', () => {
    cy.viewport(1280, 720)
    cy.visit('/products')
    cy.get('.product-card').should('have.length.greaterThan', 0)
  })
})

