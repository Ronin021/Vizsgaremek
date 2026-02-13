import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getCategories,
  getUsers
} from "../api/adminApi.js";

export default function AdminPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit/Create form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category_id: 1,
    description: "",
    image: "",
    stock: 50
  });

  // Check admin access
  useEffect(() => {
    if (!isLoggedIn || !user?.is_admin) {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, ordersData, categoriesData, usersData] = await Promise.all([
          getProducts(),
          getAllOrders(),
          getCategories(),
          getUsers().catch(() => [])
        ]);
        setProducts(productsData);
        setOrders(ordersData.filter(o => o.status !== "Kosár"));
        setCategories(categoriesData);
        setUsers(usersData);
      } catch (err) {
        console.error("Admin adatok betöltése sikertelen", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Stats calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);

  // Form handlers
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      category_id: categories[0]?.id || 1,
      description: "",
      image: "",
      stock: 50
    });
    setShowForm(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      description: product.description || "",
      image: product.image || "",
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "price") {
      // Only allow numbers for price
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: Number(numericValue) || 0 }));
    } else if (name === "stock") {
      setFormData((prev) => ({ ...prev, [name]: checked ? 50 : 0 }));
    } else if (name === "category_id") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      // Refresh products
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      handleCloseForm();
    } catch (err) {
      console.error("Művelet sikertelen", err);
      alert("Hiba történt a mentés során");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) return;
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Törlés sikertelen", err);
      alert("Hiba történt a törlés során");
    }
  };

  // Helper to get user name from user_id
  const getUserName = (userId) => {
    const u = users.find((usr) => usr.id === userId);
    return u ? `${u.first_name} ${u.last_name}` : "Ismeretlen";
  };

  // Helper to get category name
  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || "Egyéb";
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 10);
  };

  // Status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case "Feldolgozás alatt": return "status-pending";
      case "Szállítás alatt": return "status-shipping";
      case "Kiszállítva": return "status-delivered";
      default: return "status-default";
    }
  };

  if (loading) {
    return (
      <div className="page page-admin">
        <div className="container">
          <p>Betöltés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-admin">
      <div className="container">
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Összes termék</span>
              <span className="stat-value">{totalProducts}</span>
            </div>
            <div className="stat-icon stat-icon-product">
              📦
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Összes rendelés</span>
              <span className="stat-value">{totalOrders}</span>
            </div>
            <div className="stat-icon stat-icon-order">
              🛒
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Bevétel</span>
              <span className="stat-value">{totalRevenue.toLocaleString("hu-HU")} Ft</span>
            </div>
            <div className="stat-icon stat-icon-revenue">
              👥
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Termékek
          </button>
          <button
            className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Rendelések
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="admin-products">
            <button className="btn-add-product" onClick={handleOpenCreate}>
              <span className="plus-icon">+</span> Új termék hozzáadása
            </button>

            {/* Edit/Create Form */}
            {showForm && (
              <div className="product-form-card">
                <h3>{editingProduct ? "Termék szerkesztése" : "Új termék hozzáadása"}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Név</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Ár (Ft)</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Kategória</label>
                      <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleFormChange}
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Leírás</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>Kép URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group form-checkbox">
                    <input
                      type="checkbox"
                      id="stock-checkbox"
                      name="stock"
                      checked={formData.stock > 0}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="stock-checkbox">Raktáron</label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-save">
                      Mentés
                    </button>
                    <button type="button" className="btn btn-cancel" onClick={handleCloseForm}>
                      Mégse
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Product Grid */}
            <div className="admin-product-grid">
              {products.map((product) => (
                <div key={product.id} className="admin-product-card">
                  <div className="admin-product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="product-image-placeholder" />
                    )}
                  </div>
                  <div className="admin-product-info">
                    <h4>{product.name}</h4>
                    <span className="admin-product-category">
                      {getCategoryName(product.category_id)}
                    </span>
                    <p className="admin-product-price">
                      {product.price.toLocaleString("hu-HU")} Ft
                    </p>
                    <span className={`stock-badge-small ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                      {product.stock > 0 ? "Raktáron" : "Nincs raktáron"}
                    </span>
                  </div>
                  <div className="admin-product-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleOpenEdit(product)}
                      title="Szerkesztés"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(product.id)}
                      title="Törlés"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="admin-orders">
            {orders.length === 0 ? (
              <p>Nincsenek rendelések.</p>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-info">
                      <h4>Rendelés #{order.id}</h4>
                      <p className="order-customer">{getUserName(order.user_id)}</p>
                      <p className="order-date">{formatDate(order.date)}</p>
                    </div>
                    <div className="order-right">
                      <p className="order-total">
                        {(order.total_price || 0).toLocaleString("hu-HU")} Ft
                      </p>
                      <span className={`order-status ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
