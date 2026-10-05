import React, { useState } from 'react';
import { Heart, RotateCcw, Share2, Sparkles, BookOpen, Layers } from 'lucide-react';
import styles from './LookbookGallery.module.css';

export default function LookbookGallery({ lookbooks, onRemixLook, onLikeLook }) {
  const [filter, setFilter] = useState('all');

  const filteredLooks = filter === 'all' 
    ? lookbooks 
    : lookbooks.filter(lb => lb.costumeName.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="lookbook-community" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <div className="badge badge-genz">
            <Sparkles size={14} />
            <span>Cộng Đồng Gen Z</span>
          </div>
          <h2 className={styles.title}>Lookbook "Chuyền Tay"</h2>
          <p className={styles.subtitle}>
            Nơi lưu giữ và truyền cảm hứng từ những bản phối độc bản của bạn bè khắp nơi. 
            Thấy một look ưng ý? Bấm nút <strong>Remix</strong> để sáng tạo phiên bản của riêng bạn!
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

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredLooks.map((look) => (
            <div key={look.id} className={styles.lookCard}>
              <div className={styles.mediaBox}>
                <img 
                  src={look.costumeImg} 
                  alt={look.title} 
                  className={styles.lookImg}
                />
                <div className={styles.mediaOverlay}></div>
                
                <span className={styles.occasionBadge}>{look.occasionName}</span>

                <div className={styles.mediaBottom}>
                  <div className={styles.paletteDots}>
                    {look.palette?.map((col, idx) => (
                      <span 
                        key={idx} 
                        className={styles.dot} 
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                  <span className={styles.scoreBadge}>{look.harmonyScore}% Hài hòa</span>
                </div>
              </div>

              {/* Look Info */}
              <div className={styles.lookBody}>
                <div className={styles.creatorRow}>
                  <span className={styles.creatorName}>@{look.creator}</span>
                  <div className={styles.statsRow}>
                    <button 
                      className={styles.likeBtn}
                      onClick={() => onLikeLook(look.id)}
                    >
                      <Heart size={14} className={styles.likeIcon} />
                      <span>{look.likes}</span>
                    </button>
                    <span className={styles.remixStat}>
                      <RotateCcw size={13} />
                      <span>{look.remixes}</span>
                    </span>
                  </div>
                </div>

                <h3 className={styles.lookTitle}>{look.title}</h3>
                <p className={styles.costumeName}>{look.costumeName}</p>

                <div className={styles.formulaBox}>
                  <Layers size={13} className={styles.formulaIcon} />
                  <span>{look.mixFormula}</span>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '10px 18px', fontSize: '0.9rem' }}
                    onClick={() => onRemixLook(look)}
                  >
                    <RotateCcw size={16} />
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
