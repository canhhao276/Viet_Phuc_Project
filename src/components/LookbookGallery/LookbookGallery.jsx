import React, { useState } from 'react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import styles from './LookbookGallery.module.css';

export default function LookbookGallery({ lookbooks, onRemixLook, onLikeLook }) {
  const [filter, setFilter] = useState('all');

  const filteredLooks = filter === 'all' 
    ? lookbooks 
    : lookbooks.filter(lb => lb.costumeName.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="lookbook-community" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <div className="badge badge-genz">
            <Sparkles size={14} />
            <span>Cộng Đồng Gen Z</span>
          </div>
          <h2 className={styles.title}>Lookbook "Chuyền Tay"</h2>
          <p className={styles.subtitle}>
            Bộ sưu tập các phương án phối đồ độc bản. Tối giản chi tiết để tôn vinh trọn vẹn vẻ đẹp của xiêm y truyền thống.
          </p>

          {/* Filter Pills */}
          <div className={styles.filterPills}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('all')}
            >
              Tất cả Lookbook
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'ngũ thân' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('ngũ thân')}
            >
              Áo Ngũ Thân
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'tấc' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('tấc')}
            >
              Áo Tấc
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'tứ thân' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('tứ thân')}
            >
              Áo Tứ Thân
            </button>
          </div>
        </div>

        {/* Gallery Grid with Ultra-Clean Full-Bleed Cards (Không bị khối chữ che ảnh) */}
        <div className={styles.galleryGrid}>
          {filteredLooks.map((look) => (
            <div key={look.id} className={styles.cleanBleedCard}>
              {/* Full-bleed Photo Background */}
              <img 
                src={look.costumeImg} 
                alt={look.title} 
                className={styles.bgPhoto}
              />
              <div className={styles.photoOverlay}></div>

              {/* 1. Top Row: Stats & Minimal Like Button */}
              <div className={styles.cardTopRow}>

                <div className={styles.topRightActions}>
                  <span className={styles.scorePill}>{look.harmonyScore}% Hài hòa</span>
                  <button 
                    className={styles.likeBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeLook(look.id);
                    }}
                    title="Thả tim"
                  >
                    <Heart size={14} className={styles.heartIcon} />
                    <span>{look.likes}</span>
                  </button>
                </div>
              </div>

              {/* 2. Bottom Caption: Minimalist Typography & Remix Action (Không che thân hình/áo) */}
              <div className={styles.cleanBottomCaption}>
                <span className={styles.occasionSub}>{look.occasionName}</span>
                <h3 className={styles.lookHeading}>{look.title}</h3>
                <p className={styles.costumeName}>{look.costumeName} • @{look.creator}</p>

                <div className={styles.cardActionRow}>
                  <button 
                    className={styles.remixPillBtn}
                    onClick={() => onRemixLook(look)}
                  >
                    <RotateCcw size={15} />
                    <span>Remix Look Này</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
