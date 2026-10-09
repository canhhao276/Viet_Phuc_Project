import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './FeaturedShowcase.module.css';

export default function FeaturedShowcase({ onSelectCategory }) {
  const categories = [
    {
      id: 'cach_tan',
      title: 'TRANG PHỤC CÁCH TÂN',
      subtitle: 'Áo Dài Lửng • Yếm Lụa • Duster Đối Khâm',
      img: '/ao_viet_phuc/ảnh nền áo cách tân.jpg',
      badge: 'Trẻ trung • Năng động',
      targetCategory: 'cach_tan'
    },
    {
      id: 'truyen_thong',
      title: 'TRANG PHỤC TRUYỀN THỐNG',
      subtitle: 'Đại Lễ Phục Nhật Bình & Áo Tấc Cung Đình',
      img: '/ao_viet_phuc/ảnh nền trang phục truyền thống.jpg',
      badge: 'Trang trọng • Hoàng triều',
      targetCategory: 'truyen_thong'
    },
    {
      id: 'remix_genz',
      title: 'CỔ PHỤC REMIX GEN Z',
      subtitle: 'Ngũ Thân Tay Chẽn Mix Sneaker & Y2K',
      img: '/costumes/ao_tac_tay_thung.jpg',
      badge: 'Đột phá • Độc bản',
      targetCategory: 'all'
    }
  ];

  return (
    <section id="featured-showcase" className={styles.section}>
      <div className="container">
        {/* Section Heading */}
        <div className={styles.headerBlock}>
          <div className="badge badge-gold">
            <Sparkles size={14} />
            <span>Bộ Sưu Tập Tiêu Biểu</span>
          </div>
          <h2 className={styles.heading}>DANH MỤC TRANG PHỤC ĐẶC TRƯNG</h2>
          <p className={styles.subHeading}>
            Khám phá các dòng cổ phục tiêu biểu từ truyền thống kinh kỳ đến phong cách cách tân đương đại.
          </p>
        </div>

        {/* 3 Full-Bleed Editorial Cards Grid */}
        <div className={styles.showcaseGrid}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={styles.fullBleedBox}
              onClick={() => onSelectCategory(cat.targetCategory || cat.id)}
            >
              {/* 100% Full-bleed Image */}
              <img 
                src={cat.img} 
                alt={cat.title} 
                className={styles.boxImage}
              />
              <div className={styles.boxOverlay}></div>

              {/* Top Tag */}
              <div className={styles.topBadge}>
                {cat.badge}
              </div>

              {/* Clean Typography at Bottom - Không còn khung trắng che ảnh */}
              <div className={styles.bottomCaption}>
                <h3 className={styles.captionTitle}>{cat.title}</h3>
                <span className={styles.captionSubtitle}>{cat.subtitle}</span>
                <div className={styles.exploreLink}>
                  <span>Khám phá & Phối đồ</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
