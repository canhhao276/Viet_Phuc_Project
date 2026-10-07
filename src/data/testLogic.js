// ============================================================================
// SCRIPT KIỂM THỬ LOGIC PHỐI ĐỒ & NGHÊ THẦN
// Mục đích: Chạy thử nghiệm các scenario để đảm bảo logic hoạt động đúng
// ============================================================================

import { calculateDetailedHarmony, checkAllRules } from './outfitRules.js';
import { processNgheThanFeedback } from './ngheThanEngine.js';

// Mock data lấy từ mockData.js
const mockCostumes = {
  ao_ngu_than: { id: 'ao_ngu_than', name: 'Áo Ngũ Thân' },
  ao_tac: { id: 'ao_tac', name: 'Áo Tấc' },
  ao_tu_than: { id: 'ao_tu_than', name: 'Áo Tứ Thân' },
  ao_dai: { id: 'ao_dai', name: 'Áo Dài' },
  ao_nhat_binh: { id: 'ao_nhat_binh', name: 'Áo Nhật Bình' }
};

const mockBottoms = {
  quan_lua_trang: { id: 'quan_lua_trang', name: 'Quần lụa trắng' },
  vay_dup_den: { id: 'vay_dup_den', name: 'Váy đụp lụa đen' },
  quan_au_pleat: { id: 'quan_au_pleat', name: 'Quần tây xếp ly' }
};

const mockTradAcc = {
  man_lua: { id: 'man_lua', name: 'Mấn lụa' },
  guoc_moc: { id: 'guoc_moc', name: 'Guốc mộc' },
  chuoi_ngoc: { id: 'chuoi_ngoc', name: 'Chuỗi ngọc trai' }
};

const mockGenzAcc = {
  sneaker_retro: { id: 'sneaker_retro', name: 'Sneaker trắng' },
  kinh_y2k: { id: 'kinh_y2k', name: 'Kính Y2K' }
};

const mockOccasions = {
  tet: { id: 'tet', name: 'Tết Du Xuân' },
  le_hoi: { id: 'le_hoi', name: 'Lễ Hội Truyền Thống' },
  indie: { id: 'indie', name: 'Dạo Phố Nghệ Thuật' }
};

// Hàm tiện ích để in test case
function runTestCase(name, outfit) {
  console.log(`\n=================================================`);
  console.log(`🧪 TEST CASE: ${name}`);
  console.log(`Trang phục: ${outfit.costume.name} + ${outfit.bottom.name}`);
  console.log(`Phụ kiện: ${outfit.tradAcc.name} + ${outfit.genzAcc.name}`);
  console.log(`Bối cảnh: ${outfit.occasion.name}`);
  console.log(`-------------------------------------------------`);

  const harmony = calculateDetailedHarmony(outfit);
  console.log(`✨ Điểm Hài Hòa: ${harmony.score}/100 (${harmony.level})`);
  console.log(`   - Fit Bối Cảnh: ${harmony.breakdown.costumeOccasionFit}/30`);
  console.log(`   - Fit Quần/Váy: ${harmony.breakdown.bottomFit}/25`);
  console.log(`   - Nhận xét: ${harmony.feedback}`);

  const ngheThan = processNgheThanFeedback(outfit, harmony.score);
  if (ngheThan) {
    if (ngheThan.severity === 'praise') {
      console.log(`🦁 NGHÊ THẦN KHEN NGỢI (${ngheThan.moodData.emoji}):`);
      console.log(`   "${ngheThan.message}"`);
    } else {
      console.log(`🚨 NGHÊ THẦN CẢNH BÁO [${ngheThan.severityLabel.toUpperCase()}] (${ngheThan.moodData.emoji}):`);
      console.log(`   Title: ${ngheThan.title}`);
      console.log(`   Message: "${ngheThan.message}"`);
      console.log(`   Suggestion: "${ngheThan.suggestion}"`);
    }
  } else {
    console.log(`🦁 NGHÊ THẦN: Không có cảnh báo gì đặc biệt.`);
  }
}

// ---------------------------------------------------------
// THỰC THI CÁC KỊCH BẢN KIỂM THỬ (SCENARIOS)
// ---------------------------------------------------------

// 1. Phối hoàn hảo (Tết)
runTestCase('Phối hoàn hảo ngày Tết', {
  costume: mockCostumes.ao_ngu_than,
  bottom: mockBottoms.quan_lua_trang,
  tradAcc: mockTradAcc.man_lua,
  genzAcc: mockGenzAcc.kinh_y2k,
  occasion: mockOccasions.tet
});

// 2. Vi phạm nghiêm trọng (Nhật Bình + Váy Đụp)
runTestCase('Vi phạm nghiêm trọng phẩm cấp', {
  costume: mockCostumes.ao_nhat_binh,
  bottom: mockBottoms.vay_dup_den,
  tradAcc: mockTradAcc.chuoi_ngoc,
  genzAcc: mockGenzAcc.kinh_y2k,
  occasion: mockOccasions.tet
});

// 3. Vi phạm theo bối cảnh (Áo Tấc + Sneaker đi lễ hội)
runTestCase('Vi phạm không gian tôn nghiêm', {
  costume: mockCostumes.ao_tac,
  bottom: mockBottoms.quan_lua_trang,
  tradAcc: mockTradAcc.man_lua,
  genzAcc: mockGenzAcc.sneaker_retro,
  occasion: mockOccasions.le_hoi
});

// 4. Vi phạm mất nét dân gian (Tứ Thân + Quần Tây)
runTestCase('Vi phạm cấu trúc dân gian', {
  costume: mockCostumes.ao_tu_than,
  bottom: mockBottoms.quan_au_pleat,
  tradAcc: mockTradAcc.guoc_moc,
  genzAcc: mockGenzAcc.kinh_y2k,
  occasion: mockOccasions.indie
});

// 5. Vi phạm nhẹ (Tứ thân + Mấn lụa)
runTestCase('Vi phạm phụ kiện (Cung đình x Dân gian)', {
  costume: mockCostumes.ao_tu_than,
  bottom: mockBottoms.vay_dup_den,
  tradAcc: mockTradAcc.man_lua, // Sai, nên dùng khăn mỏ quạ
  genzAcc: mockGenzAcc.kinh_y2k,
  occasion: mockOccasions.le_hoi
});
