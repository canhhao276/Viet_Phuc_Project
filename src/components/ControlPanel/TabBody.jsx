import React from 'react';
import styles from './ControlPanel.module.css';

/**
 * Tab 1: Tinh chỉnh chỉ số cơ thể thực tế (Sliders)
 */
export default function TabBody({ bodyMeasurements, onMeasurementChange, onResetDefaults }) {
  const sliders = [
    { key: 'height', label: 'Chiều cao (Height)', min: 150, max: 195, unit: 'cm' },
    { key: 'shoulder', label: 'Độ rộng vai (Shoulder)', min: 34, max: 52, unit: 'cm' },
    { key: 'chest', label: 'Vòng ngực (Chest)', min: 72, max: 115, unit: 'cm' },
    { key: 'waist', label: 'Vòng eo (Waist)', min: 54, max: 98, unit: 'cm' },
    { key: 'hip', label: 'Vòng hông (Hip)', min: 78, max: 120, unit: 'cm' },
    { key: 'arm', label: 'Chiều dài tay (Arm)', min: 50, max: 75, unit: 'cm' }
  ];

  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <div>
          <h4 className={styles.sectionTitle}>Chỉ Số Cơ Thể Mô Phỏng</h4>
          <p className={styles.sectionSubtitle}>
            Kéo thả để điều chỉnh tỷ lệ avatar theo dáng người thực tế
          </p>
        </div>
        <button className={styles.resetSmallBtn} onClick={onResetDefaults}>
          Mặc định
        </button>
      </div>

      <div className={styles.slidersGrid}>
        {sliders.map((s) => (
          <div key={s.key} className={styles.sliderRow}>
            <div className={styles.sliderLabelRow}>
              <span className={styles.sliderName}>{s.label}</span>
              <span className={styles.sliderValue}>
                {bodyMeasurements[s.key]} {s.unit}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={bodyMeasurements[s.key]}
              onChange={(e) => onMeasurementChange(s.key, Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>💡</span>
        <span>
          Cổ phục Việt chuộng dáng đứng nghiêm trang, tà áo ngũ thân buông lửng từ eo giúp tôn vinh tỷ lệ cơ thể tự nhiên và che khuyết điểm hiệu quả.
        </span>
      </div>
    </div>
  );
}
