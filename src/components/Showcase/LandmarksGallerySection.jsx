import React from 'react';
import { HERITAGE_LANDMARKS } from '../../data/heritageLandmarks';
import styles from './Showcase.module.css';

/**
 * Mục Trải nghiệm Bối cảnh Di sản Việt Nam thực tế
 */
export default function LandmarksGallerySection() {
  return (
    <section className={styles.sectionWrapper} id="landmarks">
      <div className={styles.container}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.smallBadge}>DANH THẮNG & CỐ ĐÔ VIỆT NAM</div>
          <h2 className={styles.sectionMainTitle}>
            Không Gian Di Tích <span className={styles.goldSpan}>Thực Tế Đỉnh Cao</span>
          </h2>
          <p className={styles.sectionLeadText}>
            Hình ảnh thực địa chân thực của Cố Đô Huế, Phố Cổ Hội An và Văn Miếu Thăng Long,
            tạo nên bối cảnh hoàn mỹ để tôn vinh nét đoan trang của tà áo ngũ thân.
          </p>
        </div>

        <div className={styles.landmarksGrid}>
          {HERITAGE_LANDMARKS.map((landmark) => (
            <div key={landmark.id} className={styles.landmarkCard}>
              <div className={styles.landmarkImgWrapper}>
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className={styles.landmarkImg}
                  loading="lazy"
                />
                <span className={styles.landmarkTag}>{landmark.tag}</span>
              </div>

              <div className={styles.landmarkInfo}>
                <div className={styles.landmarkTop}>
                  <h4 className={styles.landmarkName}>{landmark.name}</h4>
                  <span className={styles.landmarkLocation}>📍 {landmark.location}</span>
                </div>
                <span className={styles.landmarkEra}>Niên đại: {landmark.era}</span>
                <p className={styles.landmarkDesc}>{landmark.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
