import React from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categoriesData';
import { products } from '../data/productsData';
import { Filter } from 'lucide-react';

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useCart();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const catalog = document.getElementById('products-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getProductCount = (catId) => {
    if (catId === 'all') return products.length;
    if (catId === 'new') return products.filter((p) => p.isNew).length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <aside className="left-sidebar">
      <div className="sidebar-header">
        <Filter size={18} className="sidebar-header-icon" />
        <h2 className="sidebar-title">Categories</h2>
      </div>

      <div className="cat-list">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getProductCount(cat.id);

          return (
            <button
              key={cat.id}
              className={`cat-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <div className="cat-btn-content">
                <span className="cat-name">{cat.name}</span>
                <span className="cat-badge">{count}</span>
              </div>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="cat-thumb" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Helpful promotional mini-banner */}
      <div className="sidebar-promo">
        <span className="promo-tag">SPECIAL OFFER</span>
        <p className="promo-text">Get <strong>15% OFF</strong> on all Hoodie & Jacket combos this week!</p>
      </div>
    </aside>
  );
}
