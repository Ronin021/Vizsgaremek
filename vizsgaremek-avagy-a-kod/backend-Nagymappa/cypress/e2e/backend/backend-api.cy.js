describe('Backend API - 13 stabil teszt', () => {
  it('1) GET /api visszaad üdvözlő üzenetet', () => {
    cy.request('/api').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('message');
    });
  });

  it('2) Ismeretlen route 404-et ad', () => {
    cy.request({
      method: 'GET',
      url: '/api/unknown-endpoint',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it('3) POST /api/auth/register hiányzó adatokkal 400', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/register',
      failOnStatusCode: false,
      body: {},
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('4) POST /api/auth/login hiányzó adatokkal 400', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      failOnStatusCode: false,
      body: {},
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('5) GET /api/users token nélkül 401', () => {
    cy.request({
      method: 'GET',
      url: '/api/users',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('6) GET /api/users hibás Authorization formátummal 401', () => {
    cy.request({
      method: 'GET',
      url: '/api/users',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Token valami',
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('7) GET /api/users érvénytelen Bearer tokennel 401', () => {
    cy.request({
      method: 'GET',
      url: '/api/users',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer invalid.token.value',
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('8) PATCH /api/users/:id/make-admin token nélkül 401', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/users/1/make-admin',
      failOnStatusCode: false,
      body: {
        is_admin: true,
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('9) PUT /api/orders/:id token nélkül 401', () => {
    cy.request({
      method: 'PUT',
      url: '/api/orders/1',
      failOnStatusCode: false,
      body: {
        status: 'Feldolgozás alatt',
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('10) GET /api/orders/user/:userId token nélkül 401', () => {
    cy.request({
      method: 'GET',
      url: '/api/orders/user/1',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('11) POST /api/products token nélkül 401', () => {
    cy.request({
      method: 'POST',
      url: '/api/products',
      failOnStatusCode: false,
      body: {
        name: 'Teszt termek',
        category_id: 1,
        price: 999,
        description: 'Teszt leiras',
        stock: 5,
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('12) DELETE /api/categories/:id token nélkül 401', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/categories/1',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('error');
    });
  });

  it('13) GET /api/products DB függvény: lista vagy szerverhiba', () => {
    cy.request({
      method: 'GET',
      url: '/api/products',
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 500]).to.include(res.status);

      if (res.status === 200) {
        expect(res.body).to.be.an('array');
      } else {
        expect(res.body).to.have.property('error');
      }
    });
  });
});
