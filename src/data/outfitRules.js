// ============================================================================
// BỘ QUY TẮC PHỐI ĐỒ & LOGIC KIỂM TRA — VIỆT PHỤC REMIX
// Tác giả: Thành viên 2 (Data & Logic)
// Mục đích: Logic phối đồ, tính điểm hài hòa, kiểm tra vi phạm văn hóa
// ============================================================================

import {
  COMPATIBILITY_MATRIX,
  ACCESSORY_COMPATIBILITY,
  BOTTOM_COMPATIBILITY,
  COSTUME_DETAILS
} from './cultureDatabase.js';

// ---------------------------------------------------------------------------
// 1. BỘ QUY TẮC CẢNH BÁO VĂN HÓA MỞ RỘNG (Thay thế CULTURAL_RULES cũ)
// ---------------------------------------------------------------------------
export const CULTURAL_RULES_EXTENDED = [
  // === NHẬT BÌNH ===
  {
    id: 'rule_01',
    costumeId: 'ao_nhat_binh',
    prohibitedBottom: 'vay_dup_den',
    severity: 'critical', // critical | warning | info
    title: 'Sai lệch phẩm cấp cung đình!',
    message: 'Áo Nhật Bình là đại lễ phục trang trọng bậc nhất của bậc Hoàng gia triều Nguyễn. Việc phối cùng váy đụp dân dã Kinh Bắc là hoàn toàn lệch thời kỳ và tính chất phẩm phục bạn nha!',
    suggestion: 'Đổi sang quần lụa trắng hoặc quần lụa đen ống suông để giữ vẻ đoan trang quyền quý nhé.',
    suggestedBottomIds: ['quan_lua_trang', 'quan_lua_den'],
    ngheThanMood: 'shocked',
    ngheThanQuote: 'Ơ kìa! Nhật Bình cung đình mà phối váy đụp dân gian là không ổn lắm đâu nha! 😱'
  },
  {
    id: 'rule_02',
    costumeId: 'ao_nhat_binh',
    prohibitedBottom: 'quan_au_pleat',
    severity: 'critical',
    title: 'Phẩm phục cung đình cần trang trọng!',
    message: 'Nhật Bình là triều phục Hoàng gia, phối cùng quần tây hiện đại sẽ làm mất đi tính tôn nghiêm và phẩm vị vốn có.',
    suggestion: 'Hãy chọn quần lụa trắng truyền thống để giữ nguyên vẻ đài các hoàng triều nhé!',
    suggestedBottomIds: ['quan_lua_trang'],
    ngheThanMood: 'worried',
    ngheThanQuote: 'Quần tây với Nhật Bình hả? Như mặc váy cưới đi đá bóng vậy đó! 😅'
  },
  {
    id: 'rule_03',
    costumeId: 'ao_nhat_binh',
    prohibitedGenz: 'sneaker_retro',
    severity: 'critical',
    title: 'Sneaker không hợp với phẩm phục Hoàng gia!',
    message: 'Nhật Bình thuộc dòng đại lễ phục cung đình, sneaker dù vintage vẫn quá đời thường cho phẩm cấp này.',
    suggestion: 'Nghê Thần gợi ý chọn hài thêu hoa sen — vừa đẹp vừa chuẩn cung đình!',
    suggestedGenzIds: [],
    ngheThanMood: 'shocked',
    ngheThanQuote: 'Hoàng hậu xưa mà thấy sneaker chắc ngất xỉu mất! 👑😵'
  },
  {
    id: 'rule_04',
    costumeId: 'ao_nhat_binh',
    prohibitedGenz: 'blazer_coat',
    severity: 'warning',
    title: 'Blazer che mất nét đẹp Nhật Bình!',
    message: 'Cổ chữ nhật và dải ngũ hành trên tay áo là đặc trưng quan trọng nhất của Nhật Bình. Khoác blazer sẽ che mất toàn bộ những chi tiết tinh xảo này.',
    suggestion: 'Để Nhật Bình tỏa sáng nguyên vẹn, bạn không cần thêm lớp khoác ngoài đâu!',
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Nhật Bình đã quá lộng lẫy rồi, thêm blazer là thừa bạn ơi! ✨'
  },

  // === TỨ THÂN ===
  {
    id: 'rule_05',
    costumeId: 'ao_tu_than',
    prohibitedBottom: 'quan_au_pleat',
    severity: 'critical',
    title: 'Mất nét mềm mại Kinh Bắc!',
    message: 'Áo Tứ Thân cần tà áo buông lơi bên cạnh váy đụp lụa đen truyền thống để tạo nên vẻ đẹp mộc mạc của cô gái Kinh Bắc.',
    suggestion: 'Chọn váy đụp đen tuyền hoặc quần lụa đen để đúng phong thái dân gian Kinh Bắc nhé!',
    suggestedBottomIds: ['vay_dup_den', 'quan_lua_den'],
    ngheThanMood: 'sad',
    ngheThanQuote: 'Liền chị quan họ mà mặc quần tây thì hát giao duyên sao hay được! 🎵'
  },
  {
    id: 'rule_06',
    costumeId: 'ao_tu_than',
    prohibitedBottom: 'quan_lua_trang',
    severity: 'warning',
    title: 'Quần trắng chưa đúng phong cách Bắc Bộ lắm!',
    message: 'Áo Tứ Thân truyền thống thường phối cùng váy đụp đen hoặc quần lụa đen. Quần trắng tuy không sai nhưng thiếu đặc trưng Kinh Bắc.',
    suggestion: 'Để chuẩn nhất, hãy chọn váy đụp lụa đen Kinh Bắc nhé!',
    suggestedBottomIds: ['vay_dup_den'],
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Không sai, nhưng váy đụp đen mới "đúng vị" Kinh Bắc nè! 🤔'
  },
  {
    id: 'rule_07',
    costumeId: 'ao_tu_than',
    prohibitedBottom: 'chan_vay_xoe',
    severity: 'warning',
    title: 'Chân váy xòe không đúng tinh thần dân gian!',
    message: 'Áo Tứ Thân thuộc dòng trang phục dân gian Bắc Bộ, đi cùng chân váy xòe hiện đại sẽ làm mất đi nét mộc mạc đặc trưng.',
    suggestion: 'Váy đụp lụa đen truyền thống mới là "soulmate" của Tứ Thân!',
    suggestedBottomIds: ['vay_dup_den'],
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Chân váy xòe cute thiệt, nhưng Tứ Thân cần váy đụp mới "match" nha! 👗'
  },
  {
    id: 'rule_08',
    costumeId: 'ao_tu_than',
    prohibitedTrad: 'man_lua',
    severity: 'warning',
    title: 'Khăn đóng không hợp với trang phục dân gian!',
    message: 'Khăn đóng/mấn lụa là phụ kiện dành cho trang phục cung đình (ngũ thân, tấc). Áo Tứ Thân nên phối cùng khăn mỏ quạ mới đúng phong cách.',
    suggestion: 'Thay khăn đóng bằng khăn mỏ quạ hoặc nón quai thao cho chuẩn Kinh Bắc!',
    ngheThanMood: 'gentle',
    ngheThanQuote: 'Khăn đóng sang thiệt, nhưng Tứ Thân "xin" khăn mỏ quạ mới đúng trend Kinh Bắc! 🎀'
  },
  {
    id: 'rule_09',
    costumeId: 'ao_tu_than',
    prohibitedTrad: 'chuoi_ngoc',
    severity: 'info',
    title: 'Ngọc trai nhiều tầng hơi quá cho tứ thân!',
    message: 'Chuỗi ngọc trai nhiều tầng có phong cách cung đình/quý tộc, phối cùng áo tứ thân dân dã sẽ tạo cảm giác "lạc quẻ".',
    suggestion: 'Thử thay bằng vòng tay gốm hoặc khuyên tai ngọc trai nhỏ nhẹ nhàng hơn!',
    ngheThanMood: 'cute',
    ngheThanQuote: 'Tứ Thân mộc mạc mà bling bling quá thì mất duyên mất! 💫'
  },

  // === ÁO TẤC ===
  {
    id: 'rule_10',
    costumeId: 'ao_tac',
    prohibitedGenz: 'sneaker_retro',
    triggerWhenOccasion: 'le_hoi',
    severity: 'critical',
    title: 'Lưu ý khi đến chốn tôn nghiêm!',
    message: 'Áo Tấc đi lễ hội truyền thống chốn tôn nghiêm đòi hỏi sự tề chỉnh. Phối sneaker quá năng động có thể chưa thật sự phù hợp với không gian linh thiêng.',
    suggestion: 'Nghê Thần khuyên bạn chọn hài thêu hoặc guốc mộc quai nhung khi đến đền chùa nha!',
    ngheThanMood: 'serious',
    ngheThanQuote: 'Đi lễ mà mang sneaker thì Phật bà nhìn cũng... hơi bối rối đó! 🙏😅'
  },
  {
    id: 'rule_11',
    costumeId: 'ao_tac',
    prohibitedBottom: 'vay_dup_den',
    severity: 'critical',
    title: 'Sai vùng miền và phẩm cấp!',
    message: 'Áo Tấc là lễ phục triều Nguyễn (cung đình), váy đụp là trang phục dân gian Bắc Bộ. Hai phong cách này thuộc hệ thống hoàn toàn khác nhau.',
    suggestion: 'Quần lụa trắng hoặc đen ống suông mới là "best match" cho áo tấc!',
    suggestedBottomIds: ['quan_lua_trang', 'quan_lua_den'],
    ngheThanMood: 'shocked',
    ngheThanQuote: 'Cung đình + dân gian = Xung đột phong cách trầm trọng! 🚨'
  },
  {
    id: 'rule_12',
    costumeId: 'ao_tac',
    prohibitedGenz: 'blazer_coat',
    severity: 'warning',
    title: 'Blazer che mất tay thụng!',
    message: 'Tay thụng rộng buông dài là linh hồn của áo tấc. Khoác blazer sẽ che mất hoàn toàn đặc trưng quan trọng nhất này.',
    suggestion: 'Áo tấc đã đủ "cool" rồi, không cần thêm lớp ngoài đâu!',
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Tay thụng là highlight mà che đi thì uổng phí lắm! 😤'
  },
  {
    id: 'rule_13',
    costumeId: 'ao_tac',
    prohibitedBottom: 'quan_au_pleat',
    triggerWhenOccasion: 'le_hoi',
    severity: 'warning',
    title: 'Quần tây khi đi lễ hội?',
    message: 'Áo Tấc là lễ phục, khi đi lễ hội nên phối cùng quần lụa truyền thống để thể hiện sự trang nghiêm.',
    suggestion: 'Quần lụa trắng ống suông sẽ hoàn hảo cho dịp lễ hội!',
    suggestedBottomIds: ['quan_lua_trang'],
    ngheThanMood: 'gentle',
    ngheThanQuote: 'Đi lễ mà, quần lụa trắng trang nhã hơn quần tây nhiều nha! 🏮'
  },

  // === NGŨ THÂN TAY CHẼN ===
  {
    id: 'rule_14',
    costumeId: 'ao_ngu_than',
    prohibitedBottom: 'vay_dup_den',
    severity: 'warning',
    title: 'Váy đụp không phải "match" tốt nhất cho ngũ thân!',
    message: 'Áo ngũ thân thuộc hệ trang phục triều Nguyễn, thường phối cùng quần ống rộng. Váy đụp là đặc trưng của hệ tứ thân Bắc Bộ.',
    suggestion: 'Quần lụa trắng hoặc đen sẽ chuẩn hơn cho ngũ thân tay chẽn!',
    suggestedBottomIds: ['quan_lua_trang', 'quan_lua_den'],
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Ngũ thân triều Nguyễn mà phối váy đụp Bắc Bộ thì hơi "nhầm kênh" nha! 📺'
  },

  // === ÁO DÀI ===
  {
    id: 'rule_15',
    costumeId: 'ao_dai',
    prohibitedBottom: 'vay_dup_den',
    severity: 'warning',
    title: 'Áo dài cần quần ống suông!',
    message: 'Áo dài hiện đại luôn đi đôi với quần ống suông (trắng hoặc đen). Váy đụp không phù hợp với cấu trúc tà dài hai bên.',
    suggestion: 'Quần lụa trắng là lựa chọn kinh điển nhất cho áo dài!',
    suggestedBottomIds: ['quan_lua_trang'],
    ngheThanMood: 'gentle',
    ngheThanQuote: 'Áo dài + quần trắng = Combo kinh điển không bao giờ sai! 💯'
  },

  // === ÁO ĐỐI KHÂM ===
  {
    id: 'rule_16',
    costumeId: 'ao_doi_kham',
    prohibitedBottom: 'vay_dup_den',
    severity: 'info',
    title: 'Đối khâm thường không phối váy đụp',
    message: 'Áo đối khâm thuộc thời Lý–Trần, váy đụp thuộc truyền thống Bắc Bộ sau này. Tuy không sai nghiêm trọng nhưng không phải kết hợp lý tưởng.',
    suggestion: 'Thử quần lụa đen hoặc trắng để đúng tinh thần cổ phong hơn!',
    suggestedBottomIds: ['quan_lua_den', 'quan_lua_trang'],
    ngheThanMood: 'thinking',
    ngheThanQuote: 'Không tệ, nhưng có thể "lên đời" hơn nữa đấy! 🌿'
  }
];

// ---------------------------------------------------------------------------
// 2. HÀM TÍNH ĐIỂM HÀI HÒA VĂN HÓA CHI TIẾT
// ---------------------------------------------------------------------------

/**
 * Tính điểm hài hòa văn hóa cho một bộ phối hoàn chỉnh.
 * @param {Object} params
 * @param {Object} params.costume - Trang phục chính (từ COSTUMES)
 * @param {Object} params.bottom - Quần/Váy (từ BOTTOMS)
 * @param {Object} params.footwear - Giày dép (từ FOOTWEAR)
 * @param {Object} params.headwear - Mũ/Phụ kiện (từ HEADWEAR)
 * @param {Object} params.occasion - Bối cảnh sử dụng (từ OCCASIONS)
 * @returns {Object} { score, breakdown, level, feedback }
 */
export function calculateDetailedHarmony({ costume, bottom, footwear, headwear, occasion }) {
  const breakdown = {
    costumeOccasionFit: 0,   // max 30
    bottomFit: 0,             // max 25
    footwearFit: 0,            // max 20
    headwearFit: 0,            // max 15
    overallCoherence: 0       // max 10
  };

  // 1. Trang phục – Bối cảnh (30 điểm)
  const costumeMatrix = COMPATIBILITY_MATRIX[costume.id];
  if (costumeMatrix && costumeMatrix[occasion.id] !== undefined) {
    breakdown.costumeOccasionFit = costumeMatrix[occasion.id] * 6; // 5*6 = 30
  } else {
    breakdown.costumeOccasionFit = 18; // default: 3*6
  }

  // 2. Quần/Váy tương thích (25 điểm)
  const bottomMatrix = BOTTOM_COMPATIBILITY[bottom.id];
  if (bottomMatrix && bottomMatrix[costume.id] !== undefined) {
    breakdown.bottomFit = bottomMatrix[costume.id] * 5; // 5*5 = 25
  } else {
    breakdown.bottomFit = 15;
  }

  // 3. Giày dép tương thích (20 điểm)
  const fwMatrix = ACCESSORY_COMPATIBILITY[footwear.id];
  if (fwMatrix && fwMatrix[costume.id] !== undefined) {
    breakdown.footwearFit = fwMatrix[costume.id] * 4; // 5*4 = 20
  } else {
    breakdown.footwearFit = 12;
  }

  // 4. Mũ / Phụ kiện tương thích (15 điểm)
  const hwMatrix = ACCESSORY_COMPATIBILITY[headwear.id];
  if (hwMatrix && hwMatrix[costume.id] !== undefined) {
    breakdown.headwearFit = hwMatrix[costume.id] * 3; // 5*3 = 15
  } else {
    breakdown.headwearFit = 9;
  }

  // 5. Độ thống nhất tổng thể (10 điểm)
  // Kiểm tra xem có vi phạm quy tắc nào không
  const violations = checkAllRules({ costume, bottom, footwear, headwear, occasion });
  const criticalCount = violations.filter(v => v.severity === 'critical').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;
  const infoCount = violations.filter(v => v.severity === 'info').length;

  breakdown.overallCoherence = Math.max(0, 10 - (criticalCount * 5) - (warningCount * 2) - (infoCount * 1));

  // Tổng điểm
  const totalScore = Math.min(100, Math.max(0,
    breakdown.costumeOccasionFit +
    breakdown.bottomFit +
    breakdown.footwearFit +
    breakdown.headwearFit +
    breakdown.overallCoherence
  ));

  // Xác định mức độ
  let level, feedback;
  if (totalScore >= 90) {
    level = 'excellent';
    feedback = 'Xuất sắc! Bộ phối hoàn hảo, chuẩn mực văn hóa và thẩm mỹ!';
  } else if (totalScore >= 75) {
    level = 'good';
    feedback = 'Rất tốt! Bộ phối hài hòa và phù hợp bối cảnh.';
  } else if (totalScore >= 60) {
    level = 'fair';
    feedback = 'Khá ổn, nhưng có thể cải thiện thêm một vài chi tiết.';
  } else if (totalScore >= 40) {
    level = 'mixed';
    feedback = 'Có một số điểm chưa hài hòa, hãy xem gợi ý từ Nghê Thần nhé!';
  } else {
    level = 'mismatched';
    feedback = 'Bộ phối có nhiều điểm cần điều chỉnh. Nghê Thần sẽ giúp bạn!';
  }

  return {
    score: totalScore,
    breakdown,
    level,
    feedback,
    violations
  };
}

// ---------------------------------------------------------------------------
// 3. HÀM KIỂM TRA TOÀN BỘ QUY TẮC VĂN HÓA
// ---------------------------------------------------------------------------

/**
 * Kiểm tra tất cả quy tắc và trả về danh sách vi phạm.
 * @returns {Array} Danh sách các rule bị vi phạm
 */
export function checkAllRules({ costume, bottom, footwear, headwear, occasion }) {
  const violations = [];

  for (const rule of CULTURAL_RULES_EXTENDED) {
    if (rule.costumeId !== costume.id) continue;

    let violated = false;

    // Kiểm tra prohibitedBottom
    if (rule.prohibitedBottom && bottom && rule.prohibitedBottom === bottom.id) {
      // Nếu có điều kiện occasion, kiểm tra thêm
      if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === occasion.id) {
        violated = true;
      }
    }

    // Kiểm tra prohibitedGenz
    if (rule.prohibitedGenz && headwear && rule.prohibitedGenz === headwear.id) {
      if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === occasion.id) {
        violated = true;
      }
    }
    // Hoặc nếu prohibitedGenz là một đôi giày (sneaker_retro) thì phải check footwear
    if (rule.prohibitedGenz && footwear && rule.prohibitedGenz === footwear.id) {
      if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === occasion.id) {
        violated = true;
      }
    }

    // Kiểm tra prohibitedTrad
    if (rule.prohibitedTrad && headwear && rule.prohibitedTrad === headwear.id) {
      if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === occasion.id) {
        violated = true;
      }
    }
    // Tương tự cho footwear
    if (rule.prohibitedTrad && footwear && rule.prohibitedTrad === footwear.id) {
      if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === occasion.id) {
        violated = true;
      }
    }

    if (violated) {
      violations.push(rule);
    }
  }

  // BỎ LỖI TRÙNG LẶP PHỤ KIỆN VÌ BÂY GIỜ CHỈ CHỌN 1 ĐÔI GIÀY Ở BƯỚC 3.
  // Giao diện đã ép buộc chỉ chọn 1 loại giày nên logic này không cần thiết nữa.

  return violations;
}

// ---------------------------------------------------------------------------
// 4. HÀM GỢI Ý OUTFIT THEO BỐI CẢNH
// ---------------------------------------------------------------------------

/**
 * Gợi ý bộ phối tối ưu cho một bối cảnh cụ thể.
 * @param {string} occasionId - ID bối cảnh
 * @param {Array} costumes - Danh sách trang phục
 * @param {Array} bottoms - Danh sách quần/váy
 * @param {Array} tradAccs - Danh sách phụ kiện truyền thống
 * @param {Array} genzAccs - Danh sách phụ kiện Gen Z
 * @returns {Object} Bộ gợi ý tối ưu
 */
export function suggestOptimalOutfit(occasionId, costumes, bottoms, footwears, headwears) {
  let bestScore = -1;
  let bestCombo = null;

  for (const costume of costumes) {
    for (const bottom of bottoms) {
      for (const footwear of footwears) {
        for (const headwear of headwears) {
          const result = calculateDetailedHarmony({
            costume,
            bottom,
            footwear,
            headwear,
            occasion: { id: occasionId }
          });

          if (result.score > bestScore) {
            bestScore = result.score;
            bestCombo = { costume, bottom, footwear, headwear, result };
          }
        }
      }
    }
  }

  return bestCombo;
}

// ---------------------------------------------------------------------------
// 5. HÀM LẤY THÔNG TIN VĂN HÓA CHO TRANG PHỤC
// ---------------------------------------------------------------------------

/**
 * Lấy flashcard văn hóa ngẫu nhiên cho trang phục đang xem.
 * @param {string} costumeId - ID trang phục
 * @returns {Object|null} Flashcard hoặc null
 */
export function getRandomFlashcard(costumeId) {
  const details = COSTUME_DETAILS[costumeId];
  if (!details || !details.flashcards || details.flashcards.length === 0) return null;

  const idx = Math.floor(Math.random() * details.flashcards.length);
  return {
    ...details.flashcards[idx],
    costumeName: details.fullName
  };
}

/**
 * Lấy toàn bộ thông tin văn hóa cho trang phục.
 * @param {string} costumeId - ID trang phục
 * @returns {Object|null} Thông tin chi tiết hoặc null
 */
export function getCostumeDetails(costumeId) {
  return COSTUME_DETAILS[costumeId] || null;
}

/**
 * Lấy danh sách điều nên tránh cho trang phục.
 * @param {string} costumeId - ID trang phục
 * @returns {Array} Danh sách cảnh báo
 */
export function getCulturalWarnings(costumeId) {
  const details = COSTUME_DETAILS[costumeId];
  return details ? details.culturalWarnings : [];
}

/**
 * Lấy bối cảnh phù hợp nhất cho trang phục.
 * @param {string} costumeId - ID trang phục
 * @returns {Array} Danh sách bối cảnh phù hợp (đã sắp xếp)
 */
export function getSuitableContexts(costumeId) {
  const details = COSTUME_DETAILS[costumeId];
  if (!details) return [];

  return details.suitableContexts.sort((a, b) => {
    const levelOrder = { 'Rất phù hợp': 0, 'Phù hợp': 1, 'Phù hợp vừa': 2, 'Cần cân nhắc': 3, 'Hơi trang trọng': 4, 'Quá trang trọng': 5, 'Không phù hợp': 6 };
    return (levelOrder[a.level] || 5) - (levelOrder[b.level] || 5);
  });
}

// ---------------------------------------------------------------------------
// 6. HÀM KIỂM TRA PHỐI MÀU (Dựa trên Ngũ Hành)
// ---------------------------------------------------------------------------

const NGU_HANH_COLORS = {
  kim: { colors: ['#FFFFFF', '#C0C0C0', '#F5F0E8'], name: 'Kim', sinh: 'thuy', khac: 'moc' },
  moc: { colors: ['#2D5016', '#1F4E46', '#2EC4B6'], name: 'Mộc', sinh: 'hoa', khac: 'tho' },
  thuy: { colors: ['#1A365D', '#22577A', '#222222'], name: 'Thủy', sinh: 'moc', khac: 'hoa' },
  hoa: { colors: ['#9E2A2B', '#D90429', '#8C2D19'], name: 'Hỏa', sinh: 'tho', khac: 'kim' },
  tho: { colors: ['#D4AF37', '#C99700', '#E6C687', '#582F0E'], name: 'Thổ', sinh: 'kim', khac: 'thuy' }
};

/**
 * Xác định một màu thuộc hành nào trong Ngũ Hành.
 * @param {string} hexColor - Mã màu hex
 * @returns {string|null} Tên hành hoặc null
 */
export function getColorElement(hexColor) {
  if (!hexColor) return null;
  const hex = hexColor.toUpperCase();

  for (const [element, data] of Object.entries(NGU_HANH_COLORS)) {
    if (data.colors.some(c => c.toUpperCase() === hex)) {
      return element;
    }
  }

  // Phân loại dựa trên HSL nếu không tìm thấy exact match
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    // Grayscale
    return l > 0.5 ? 'kim' : 'thuy';
  }

  let h;
  const d = max - min;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;

  if (h >= 0 && h < 45) return 'hoa';      // Đỏ → Cam
  if (h >= 45 && h < 80) return 'tho';      // Vàng
  if (h >= 80 && h < 170) return 'moc';     // Xanh lá
  if (h >= 170 && h < 260) return 'thuy';   // Xanh dương
  if (h >= 260 && h < 330) return 'thuy';   // Tím → xanh
  return 'hoa'; // Hồng → Đỏ
}

/**
 * Kiểm tra hai màu có tương sinh hay tương khắc theo Ngũ Hành.
 * @param {string} color1 - Mã màu hex 1
 * @param {string} color2 - Mã màu hex 2
 * @returns {Object} { relation: 'sinh'|'khac'|'neutral', description }
 */
export function checkColorHarmony(color1, color2) {
  const el1 = getColorElement(color1);
  const el2 = getColorElement(color2);

  if (!el1 || !el2) return { relation: 'neutral', description: 'Không xác định được hành' };
  if (el1 === el2) return { relation: 'neutral', description: 'Cùng hành — hài hòa tự nhiên' };

  const data1 = NGU_HANH_COLORS[el1];
  if (data1.sinh === el2) {
    return {
      relation: 'sinh',
      description: `${data1.name} sinh ${NGU_HANH_COLORS[el2].name} — Tương sinh, rất tốt!`
    };
  }
  if (data1.khac === el2) {
    return {
      relation: 'khac',
      description: `${data1.name} khắc ${NGU_HANH_COLORS[el2].name} — Tương khắc, cần cân nhắc.`
    };
  }

  return { relation: 'neutral', description: `${data1.name} và ${NGU_HANH_COLORS[el2].name} — Trung tính` };
}
