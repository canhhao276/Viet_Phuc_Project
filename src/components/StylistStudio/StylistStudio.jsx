import React from 'react';
import Scene3D from '../Canvas3D/Scene3D';
import ControlPanel from '../ControlPanel/ControlPanel';
import styles from './StylistStudio.module.css';

/**
 * Phòng Lab 3D Studio Tương tác: Bố cục chia đôi LEFT (3D Avatar) & RIGHT (Control Panel)
 */
export default function StylistStudio({
  bodyMeasurements,
  onMeasurementChange,
  onResetBodyDefaults,
  selectedCostume,
  onSelectCostume,
  selectedColor,
  onSelectColor,
  selectedOccasion,
  onSelectOccasion,
  selectedAccessories,
  onToggleAccessory,
  isAnalyzing,
  aiResult,
  onTriggerAI,
  onSaveToLookbook,
  isSaved,
  onOpenWarningModal
}) {
  return (
    <section className={styles.studioWrapper} id="stylist">
      {/* Top Bar Tiêu đề */}
      <div className={styles.studioTopBar}>
        <div className={styles.studioTitleGroup}>
          <div className={styles.studioBadge}>
            <span>✦ KHÔNG GIAN THỬ TRANG PHỤC 3D</span>
          </div>
          <h2 className={styles.studioTitle}>Interactive 3D Heritage Studio</h2>
          <p className={styles.studioSubtitle}>
            Xoay 360 độ, tinh chỉnh thông số cơ thể và phối phụ kiện cùng Trí tuệ Nhân tạo
          </p>
        </div>
      </div>

      {/* Split Layout: LEFT = 3D AVATAR, RIGHT = CONTROL PANEL */}
      <div className={styles.splitLayout}>
        <div className={styles.leftColumn3D}>
          <Scene3D
            bodyMeasurements={bodyMeasurements}
            costumeColor={selectedColor}
            costumeType={selectedCostume}
            selectedAccessories={selectedAccessories}
          />
        </div>

        <div className={styles.rightColumnPanel}>
          <ControlPanel
            bodyMeasurements={bodyMeasurements}
            onMeasurementChange={onMeasurementChange}
            onResetBodyDefaults={onResetBodyDefaults}
            selectedCostume={selectedCostume}
            onSelectCostume={onSelectCostume}
            selectedColor={selectedColor}
            onSelectColor={onSelectColor}
            selectedOccasion={selectedOccasion}
            onSelectOccasion={onSelectOccasion}
            selectedAccessories={selectedAccessories}
            onToggleAccessory={onToggleAccessory}
            isAnalyzing={isAnalyzing}
            aiResult={aiResult}
            onTriggerAI={onTriggerAI}
            onSaveToLookbook={onSaveToLookbook}
            isSaved={isSaved}
            onOpenWarningModal={onOpenWarningModal}
          />
        </div>
      </div>
    </section>
  );
}
