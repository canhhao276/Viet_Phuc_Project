import React from 'react';
import { Sparkles, GraduationCap, Landmark, Camera, Crown, CheckCircle2 } from 'lucide-react';
import { OCCASIONS } from '../../data/mockData';
import styles from './ContextSelector.module.css';

const ICON_MAP = {
  Sparkles: Sparkles,
  GraduationCap: GraduationCap,
  Landmark: Landmark,
  Camera: Camera,
  Crown: Crown
};

export default function ContextSelector({ selectedOccasion, onSelectOccasion }) {
  return (
    <section id="context" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <div className="badge badge-red">
            <span>Bước 1: Chọn Ngữ Cảnh</span>
          </div>
          <h2 className={styles.title}>Bạn Phối Việt Phục Cho Dịp Nào?</h2>
          <p className={styles.subtitle}>
            Mỗi dịp xuất hiện đều mang một quy chuẩn thẩm mỹ và ý nghĩa văn hóa riêng biệt. 
            Hãy chọn một bối cảnh để Nghê Thần định hướng gợi ý phù hợp nhất.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {OCCASIONS.map((occ) => {
            const IconComponent = ICON_MAP[occ.icon] || Sparkles;
            const isSelected = selectedOccasion.id === occ.id;

            return (
              <div
                key={occ.id}
                className={`${styles.card} ${isSelected ? styles.cardActive : ''}`}
                onClick={() => onSelectOccasion(occ)}
              >
                {isSelected && (
                  <div className={styles.checkBadge}>
                    <CheckCircle2 size={18} />
                  </div>
                )}
                
                <div 
                  className={styles.iconCircle}
                  style={{ backgroundColor: `${occ.accentColor}18`, color: occ.accentColor }}
                >
                  <IconComponent size={24} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardName}>{occ.name}</h3>
                  <p className={styles.cardTagline}>{occ.tagline}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.recLabel}>Ưu tiên gợi ý:</span>
                  <div className={styles.tags}>
                    {occ.recommendedCostumes.map((cId) => (
                      <span key={cId} className={styles.tag}>
                        {cId === 'ao_dai' ? 'Áo Dài' : 
                         cId === 'ao_tac' ? 'Áo Tấc' :
                         cId === 'ao_nhat_binh' ? 'Nhật Bình' :
                         cId === 'ao_tu_than' ? 'Tứ Thân' :
                         cId === 'ao_ngu_than' ? 'Ngũ Thân' : 'Đối Khâm'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
