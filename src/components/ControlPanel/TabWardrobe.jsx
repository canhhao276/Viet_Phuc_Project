import React from 'react';
import { COSTUMES } from '../../data/costumes';
import { OCCASIONS } from '../../data/occasions';
import { ACCESSORIES } from '../../data/accessories';
import styles from './ControlPanel.module.css';

/**
 * Tab 2: Tủ đồ cổ phục (Trang phục, Màu sắc, Bối cảnh, Phụ kiện)
 */
export default function TabWardrobe({
  selectedCostume,
  onSelectCostume,
  selectedColor,
  onSelectColor,
  selectedOccasion,
  onSelectOccasion,
  selectedAccessories,
  onToggleAccessory
}) {
  const currentCostumeData = COSTUMES.find(c => c.id === selectedCostume) || COSTUMES[0];

  return (
    <div className={styles.tabContent}>
      {/* 1. CHỌN LOẠI TRANG PHỤC */}
      <div className={styles.wardrobeSection}>
        <h4 className={styles.sectionTitle}>1. Chọn Cổ Phục Di Sản</h4>
        <div className={styles.costumeCardsGrid}>
          {COSTUMES.map((c) => {
            const isSelected = c.id === selectedCostume;
            return (
              <div
                key={c.id}
                className={`${styles.costumeCard} ${isSelected ? styles.costumeCardActive : ''}`}
                onClick={() => onSelectCostume(c.id)}
              >
                <img src={c.image} alt={c.name} className={styles.costumeCardImg} />
                <div className={styles.costumeCardOverlay}>
                  <div className={styles.tagRow}>
                    <span className={styles.costumeTag}>{c.category}</span>
                    {c.dynasty && <span className={styles.costumeDynastyTag}>{c.dynasty}</span>}
                  </div>
                  <h5 className={styles.costumeCardName}>{c.name}</h5>
                  <p className={styles.costumeCardSub}>{c.subtitle}</p>
                </div>
                {isSelected && <span className={styles.activeCheck}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CHỌN BẢNG MÀU HOÀNG GIA */}
      <div className={styles.wardrobeSection}>
        <div className={styles.colorHeader}>
          <h4 className={styles.sectionTitle}>2. Bảng Màu Thượng Hạng</h4>
          <span className={styles.activeColorLabel}>
            {currentCostumeData.availableColors.find(col => col.hex === selectedColor)?.name || 'Màu Đã Chọn'}
          </span>
        </div>
        <div className={styles.colorPaletteGrid}>
          {currentCostumeData.availableColors.map((col) => {
            const isSelected = col.hex === selectedColor;
            return (
              <button
                key={col.id}
                className={`${styles.colorSwatch} ${isSelected ? styles.colorSwatchActive : ''}`}
                style={{ backgroundColor: col.hex }}
                onClick={() => onSelectColor(col.hex)}
                title={col.name}
              >
                {isSelected && <span className={styles.colorCheckMark}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CHỌN BỐI CẢNH SỬ DỤNG */}
      <div className={styles.wardrobeSection}>
        <h4 className={styles.sectionTitle}>3. Bối Cảnh / Dịp Sử Dụng</h4>
        <div className={styles.occasionsGrid}>
          {OCCASIONS.map((occ) => {
            const isSelected = occ.id === selectedOccasion;
            return (
              <button
                key={occ.id}
                className={`${styles.occasionChip} ${isSelected ? styles.occasionChipActive : ''}`}
                onClick={() => onSelectOccasion(occ.id)}
              >
                <div className={styles.occasionContent}>
                  <span className={styles.occasionName}>{occ.name}</span>
                  <span className={styles.occasionSub}>{occ.subtitle}</span>
                </div>
                {isSelected && <span className={styles.activePill}>Đang chọn</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CHỌN PHỤ KIỆN */}
      <div className={styles.wardrobeSection}>
        <h4 className={styles.sectionTitle}>4. Phụ Kiện Đi Kèm</h4>
        <div className={styles.accessoriesGrid}>
          {ACCESSORIES.map((acc) => {
            const isSelected = selectedAccessories.some(a => a.id === acc.id);
            return (
              <div
                key={acc.id}
                className={`${styles.accessoryCard} ${isSelected ? styles.accessoryActive : ''} ${!acc.isAuthentic ? styles.accessoryAnachronism : ''}`}
                onClick={() => onToggleAccessory(acc)}
              >
                <img src={acc.image} alt={acc.name} className={styles.accessoryImg} />
                <div className={styles.accessoryInfo}>
                  <span className={styles.accessoryName}>{acc.name}</span>
                  {!acc.isAuthentic && (
                    <span className={styles.warningMiniTag}>⚠️ Phá cách hiện đại</span>
                  )}
                </div>
                <div className={styles.accessoryCheckbox}>
                  {isSelected ? '✓' : '+'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
