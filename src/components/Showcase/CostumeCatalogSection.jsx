import React from 'react';
import { COSTUMES } from '../../data/costumes';
import styles from './Showcase.module.css';

/**
 * Mục Khám phá Kho tàng Cổ phục Việt với thông tin lịch sử chuyên sâu
 */
export default function CostumeCatalogSection({ onSelectFor3D }) {
  return (
    <section className={styles.sectionWrapper} id="costumes">
      <div className={styles.container}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.smallBadge}>KHO TÀNG CỔ PHỤC DI SẢN VIỆT NAM</div>
          <h2 className={styles.sectionMainTitle}>
            Ngàn Năm Tinh Hoa <span className={styles.goldSpan}>Cổ Phục Việt</span>
          </h2>
          <p className={styles.sectionLeadText}>
            Hành trình chiêm ngưỡng kho tàng y phục truyền thống Việt Nam qua các triều đại: từ cổ phong Lý - Trần - Lê,
            di sản cung đình triều Nguyễn đến nét duyên dáng của chiếc áo dài và áo tứ thân kinh kỳ.
          </p>
        </div>

        <div className={styles.costumeGrid}>
          {COSTUMES.map((item) => (
            <div key={item.id} className={styles.costumeDetailCard}>
              <div className={styles.cardImageContainer}>
                <img src={item.image} alt={item.name} className={styles.cardImg} />
                <span className={styles.categoryPill}>{item.category}</span>
                {item.dynasty && <span className={styles.dynastyPill}>{item.dynasty}</span>}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.costumeNameTitle}>{item.name}</h3>
                <span className={styles.costumeSubtitle}>{item.subtitle}</span>
                <p className={styles.costumeDescText}>{item.description}</p>

                <div className={styles.culturalBox}>
                  <strong>Ý nghĩa văn hóa: </strong>
                  <span>{item.culturalMeaning}</span>
                </div>

                <div className={styles.cardFooterAction}>
                  <button
                    className="btn-outline-gold"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                    onClick={() => onSelectFor3D(item.id)}
                  >
                    ✦ Xem & Thử Lên Avatar 3D
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
