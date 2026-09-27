import { ACCESSORIES } from '../data/accessories';
import { COSTUMES } from '../data/costumes';
import { OCCASIONS } from '../data/occasions';

/**
 * Kiểm tra tính chuẩn mực văn hóa và tính phù hợp của bộ phối đồ
 * @param {Object} state - Trạng thái lựa chọn của người dùng
 * @returns {Object} Kết quả đánh giá văn hóa
 */
export function evaluateCulturalHarmony({ costumeId, occasionId, colorHex, accessoryIds = [] }) {
  const costume = COSTUMES.find(c => c.id === costumeId) || COSTUMES[0];
  const occasion = OCCASIONS.find(o => o.id === occasionId) || OCCASIONS[0];
  const selectedAccessories = ACCESSORIES.filter(a => accessoryIds.includes(a.id));

  const warnings = [];
  const suggestions = [];
  let score = 96;

  // 1. Kiểm tra phụ kiện lạc điệu (Anachronism / Sai lệch văn hóa)
  const anachronisticItems = selectedAccessories.filter(a => !a.isAuthentic);
  if (anachronisticItems.length > 0) {
    anachronisticItems.forEach(item => {
      warnings.push({
        title: `Phụ kiện chưa chuẩn mực: ${item.name}`,
        description: item.warning || `Món đồ này xung đột với nét tôn nghiêm của ${costume.name}.`,
        severity: 'warning'
      });
      score -= 22;
    });
    suggestions.push(`Khuyên dùng phụ kiện truyền thống như Khăn Đóng, Hài cong nhung thêu hoặc Quạt trầm dát vàng để giữ trọn vẻ tôn quý.`);
  }

  // 2. Kiểm tra độ phù hợp giữa trang phục và bối cảnh
  if (costume.suitableOccasions && !costume.suitableOccasions.includes(occasion.id)) {
    warnings.push({
      title: `Bối cảnh chưa tối ưu cho ${costume.name}`,
      description: `${costume.name} mang tính chất ${costume.category.toLowerCase()}, cần cân nhắc kỹ khi diện trong dịp ${occasion.name}.`,
      severity: 'notice'
    });
    score -= 10;
  }

  // 3. Đánh giá tính hài hòa nếu là trang phục đại lễ
  if (costume.id === 'ao_tac_tay_thung' && !accessoryIds.includes('khan_dong')) {
    suggestions.push('Áo Tấc (tay thụng) theo điển chế xưa luôn đội kèm Khăn Đóng (khăn vấn) để thể hiện sự lễ nghi tề chỉnh cao nhất.');
    score -= 5;
  }

  // 4. Khen ngợi nếu bộ phối hoàn hảo
  if (warnings.length === 0) {
    suggestions.push(`Sự kết hợp giữa ${costume.name} và bối cảnh ${occasion.name} tái hiện xuất sắc tinh thần di sản Việt cổ truyền.`);
  }

  const finalScore = Math.max(35, Math.min(100, score));

  return {
    isAuthentic: warnings.length === 0,
    hasSevereWarning: anachronisticItems.length > 0,
    score: finalScore,
    warnings,
    suggestions,
    costume,
    occasion
  };
}
