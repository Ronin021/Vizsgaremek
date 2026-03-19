import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  
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
    images: [],
    stock: 50
  });
  const [imageUrlInput, setImageUrlInput] = useState("");

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

  // Keep tab in sync with URL query (e.g. /admin?tab=orders)
  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab === "orders" || tab === "products") {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Stats calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);

  // Helper: parse image field from product (can be JSON array or single URL string)
  const parseImages = (imageField) => {
    if (!imageField) return [];
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) return parsed;
      return [imageField];
    } catch {
      return imageField ? [imageField] : [];
    }
  };

  // Form handlers
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      category_id: categories[0]?.id || 1,
      description: "",
      images: [],
      stock: 50
    });
    setImageUrlInput("");
    setShowForm(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      description: product.description || "",
      images: parseImages(product.image),
      stock: product.stock
    });
    setImageUrlInput("");
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "price") {
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

  // Image URL hozzáadása
  const handleAddImageUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    setImageUrlInput("");
  };

  // File feltöltés (base64 data URL)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  // Kép eltávolítása
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Készítjük az adatot: image mező JSON tömbként
      const payload = {
        name: formData.name,
        price: formData.price,
        category_id: formData.category_id,
        description: formData.description,
        stock: formData.stock,
        image: formData.images.length > 0 ? JSON.stringify(formData.images) : ""
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
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

  // Format date - parse from UTC (database stores as YYYY-MM-DD UTC)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    // Parse as UTC date, then format to local timezone
    const utcDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    return utcDate.toLocaleDateString("hu-HU");
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
                    <label>Képek</label>

                    {/* Képek előnézete */}
                    {formData.images.length > 0 && (
                      <div className="image-preview-list">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="image-preview-item">
                            <img src={img} alt={`Kép ${idx + 1}`} />
                            <button
                              type="button"
                              className="image-remove-btn"
                              onClick={() => handleRemoveImage(idx)}
                              title="Kép eltávolítása"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* URL hozzáadás */}
                    <div className="image-url-row">
                      <input
                        type="text"
                        placeholder="Kép URL beillesztése..."
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                      />
                      <button type="button" className="btn btn-add-url" onClick={handleAddImageUrl}>
                        + URL
                      </button>
                    </div>

                    {/* Fájl feltöltés */}
                    <label className="file-upload-label">
                      📁 Kép feltöltése fájlból
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="file-upload-input"
                      />
                    </label>
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
              {products.map((product) => {
                const imgs = parseImages(product.image);
                const firstImage = imgs[0] || "";
                return (
                <div key={product.id} className="admin-product-card">
                  <div className="admin-product-image">
                    {firstImage ? (
                      <img src={firstImage} alt={product.name} />
                    ) : (
                      <div className="product-image-placeholder" />
                    )}
                    {imgs.length > 1 && (
                      <span className="image-count-badge">{imgs.length} kép</span>
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
                );
              })}
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
                  <Link 
                    key={order.id} 
                    to={`/admin/orders/${order.id}`}
                    className="order-card-link"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="order-card">
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
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
