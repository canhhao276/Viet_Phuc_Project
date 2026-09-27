import React, { useState } from 'react';
import styles from './LookbookModal.module.css';

/**
 * Modal Lookbook: Bộ sưu tập các bản phối đã lưu và chế độ so sánh 2 outfit
 */
export default function LookbookModal({
  isOpen,
  onClose,
  lookbookList = [],
  onDeleteLook,
  onApplyLook
}) {
  const [compareItems, setCompareItems] = useState([]);

  if (!isOpen) return null;

  const toggleCompare = (item) => {
    if (compareItems.some(i => i.id === item.id)) {
      setCompareItems(compareItems.filter(i => i.id !== item.id));
    } else {
      if (compareItems.length < 2) {
        setCompareItems([...compareItems, item]);
      } else {
        // Thay thế món thứ 2
        setCompareItems([compareItems[0], item]);
      }
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <h3 className={styles.modalTitle}>Bộ Sưu Tập Lookbook Cổ Phục</h3>
            <span className={styles.modalSub}>
              Lưu trữ những bản phối di sản và so sánh trực quan đa góc nhìn
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          {/* CHẾ ĐỘ SO SÁNH NẾU ĐÃ CHỌN 2 BỘ */}
          {compareItems.length === 2 && (
            <div className={styles.compareSection}>
              <div className={styles.compareHeader}>
                <h4 className={styles.compareTitle}>⚖️ So Sánh 2 Phương Án Phối Đồ</h4>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setCompareItems([])}
                >
                  Xóa so sánh
                </button>
              </div>

              <div className={styles.compareGrid}>
                {compareItems.map((item, idx) => (
                  <div key={item.id} className={`${styles.compareCard} ${styles.compareCardActive}`}>
                    <span className={styles.lookScore}>Phương án {idx + 1} • Điểm: {item.suitabilityScore}/100</span>
                    <h4 style={{ color: '#D4AF37', margin: '4px 0' }}>{item.outfitName}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#BFC3CC' }}>{item.costumeName}</p>
                    <p style={{ fontSize: '0.78rem', color: '#838896' }}>Dịp: {item.occasionName}</p>
                    <div style={{ fontSize: '0.78rem', marginTop: '6px' }}>
                      <strong>Màu chính: </strong>
                      <span
                        className={styles.colorPreviewDot}
                        style={{ backgroundColor: item.costumeColor }}
                      />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#D2D5DD', marginTop: '6px', lineHeight: 1.4 }}>
                      {item.culturalExplanation?.slice(0, 140)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DANH SÁCH TẤT CẢ LOOK ĐÃ LƯU */}
          {lookbookList.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>👘</span>
              <h4>Chưa có trang phục nào trong Lookbook</h4>
              <p style={{ fontSize: '0.84rem', marginTop: '6px' }}>
                Hãy qua tab "AI Stylist" và bấm "Lưu vào Lookbook" để xây dựng bộ sưu tập của riêng bạn.
              </p>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {lookbookList.map((item) => {
                const isComparing = compareItems.some(i => i.id === item.id);
                return (
                  <div key={item.id} className={styles.lookItem}>
                    <div className={styles.lookHeader}>
                      <span className={styles.lookTitle}>{item.outfitName}</span>
                      <span className={styles.lookScore}>{item.suitabilityScore} ĐIỂM</span>
                    </div>

                    <div className={styles.lookBody}>
                      <div className={styles.lookDetailRow}>
                        <span className={styles.lookLabel}>Cổ phục:</span>
                        <span className={styles.lookVal}>{item.costumeName}</span>
                      </div>
                      <div className={styles.lookDetailRow}>
                        <span className={styles.lookLabel}>Bối cảnh:</span>
                        <span className={styles.lookVal}>{item.occasionName}</span>
                      </div>
                      <div className={styles.lookDetailRow}>
                        <span className={styles.lookLabel}>Màu áo:</span>
                        <span className={styles.lookVal}>
                          <span
                            className={styles.colorPreviewDot}
                            style={{ backgroundColor: item.costumeColor }}
                          />
                        </span>
                      </div>
                      <div className={styles.lookDetailRow}>
                        <span className={styles.lookLabel}>Phụ kiện:</span>
                        <span className={styles.lookVal}>
                          {item.accessories?.length > 0 ? `${item.accessories.length} món` : 'Cơ bản'}
                        </span>
                      </div>
                    </div>

                    <div className={styles.lookActions}>
                      <button
                        className={styles.selectCompareBtn}
                        onClick={() => toggleCompare(item)}
                      >
                        {isComparing ? '✓ Đang so sánh' : '⚖ So sánh'}
                      </button>

                      <button
                        className={styles.selectCompareBtn}
                        style={{ color: '#2E6F68', borderColor: '#2E6F68' }}
                        onClick={() => {
                          onApplyLook(item);
                          onClose();
                        }}
                      >
                        Thử lên 3D
                      </button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => onDeleteLook(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
