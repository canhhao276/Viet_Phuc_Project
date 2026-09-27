import { evaluateCulturalHarmony } from '../utils/culturalChecker';

/**
 * Service mô phỏng trí tuệ nhân tạo Gemini AI phân tích trang phục Việt Phục
 * Tuân thủ đúng bản hợp đồng dữ liệu với Thành viên 2
 */
export async function generateAIStylingRecommendation({
  costume,
  occasion,
  colorHex,
  accessories = [],
  bodyMeasurements = {},
  apiKey = null
}) {
  // Giả lập thời gian suy nghĩ của AI (1.2s) để giao diện hiển thị hiệu ứng Shimmer/Scan lộng lẫy
  await new Promise(resolve => setTimeout(resolve, 1400));

  const harmony = evaluateCulturalHarmony({
    costumeId: costume.id,
    occasionId: occasion.id,
    colorHex,
    accessoryIds: accessories.map(a => a.id)
  });

  // Tạo tên phong cách trang trọng theo phong vị thơ ca và di sản
  const outfitTitles = {
    ao_ngu_than_tay_chen: ['Cổ Phong Chuẩn Mực', 'Hương Sắc Kinh Kỳ', 'Trường An Phong Nhã', 'Minh Mạng Điển Chế'],
    ao_tac_tay_thung: ['Uy Nghi Hoàng Tộc', 'Lễ Phục Thao Thao', 'Diễm Lệ Cố Đô', 'Ngọc Các Trầm Hương'],
    ao_dai_truyen_thong: ['Thanh Âm Thước Tha', 'Dáng Ngọc Tràng An', 'Hương Sen Xứ Huế', 'Tú Khí Đoan Trang'],
    ao_nhat_binh: ['Phượng Các Hoàng Triều', 'Ngũ Sắc Cung Đình', 'Mệnh Phụ Tôn Nghiêm', 'Kim Chi Ngọc Diệp'],
    ao_tu_than: ['Hồn Quê Kinh Bắc', 'Nón Ba Tầm Duyên Dáng', 'Đào Thắm Hội Lim', 'Thắt Lưng Lụa Đào'],
    ao_giao_linh: ['Giao Lĩnh Uy Nghi', 'Hào Khí Đông A', 'Đại Việt Cổ Phong', 'Tràng Vạt Hưng Long'],
    ao_doi_kham: ['Đối Khâm Quyền Quý', 'Phượng Vũ Hoàng Cung', 'Lý Trần Diễm Lệ', 'Ngọc Các Vương Giả']
  };

  const pool = outfitTitles[costume.id] || ['Di Sản Tỏa Sáng'];
  const title = pool[Math.floor(Math.random() * pool.length)];

  // Thuyết minh văn hóa sâu sắc
  let culturalExplanation = '';
  if (costume.id === 'ao_ngu_than_tay_chen') {
    culturalExplanation = 'Áo ngũ thân lập lĩnh 5 thân tượng trưng cho "Ngũ Thường" (Nhân, Lễ, Nghĩa, Trí, Tín) và tứ thân phụ mẫu ôm lấy thân con ở giữa. Dáng áo suông thẳng, tay chẽn gọn gàng, cổ đứng cài khuy vàng cùng dây ngọc bội xanh ngọc toát lên nét nho nhã, uyên bác của bậc quân tử.';
  } else if (costume.id === 'ao_tac_tay_thung') {
    culturalExplanation = 'Áo Tấc là biểu tượng của đại lễ tế tự và hôn lễ trang trọng triều Nguyễn. Đôi tay thụng vuông vức khi cung kính chắp tay trước ngực thể hiện thái độ tôn kính tuyệt đối đối với gia tiên, tiền nhân và đất trời.';
  } else if (costume.id === 'ao_dai_truyen_thong') {
    culturalExplanation = 'Tà áo dài thướt tha suông thẳng buông lơi tự nhiên trên nền quần lụa trắng ngà, kết hợp khăn đóng than chì tạo nên khí độ thư sinh thanh cao, vừa gần gũi vừa đậm đà hồn cốt dân tộc.';
  } else if (costume.id === 'ao_nhat_binh') {
    culturalExplanation = 'Áo Nhật Bình với cổ áo hình chữ nhật viền hoa văn tinh xảo và dải ngũ sắc trước ngực là đỉnh cao mỹ học cung đình triều Nguyễn, biểu trưng cho ngũ hành tương sinh và sự quyền quý cao sang.';
  } else if (costume.id === 'ao_tu_than') {
    culturalExplanation = 'Áo tứ thân mộc mạc gắn liền với phụ nữ Kinh Bắc và những câu ca quan họ. Bốn vạt áo tượng trưng cho tứ thân phụ mẫu, sự thắt nút vạt trước bụng gửi gắm tình nghĩa vợ chồng son sắt thủy chung.';
  } else if (costume.id === 'ao_giao_linh') {
    culturalExplanation = 'Áo Giao Lĩnh (tràng vạt) là dạng thức cổ phục uy nghiêm thời Lý - Trần - Lê với hai vạt giao chéo trước ngực, minh chứng cho bề dày nghìn năm văn hiến và hào khí độc lập tự chủ của Đại Việt.';
  } else if (costume.id === 'ao_doi_kham') {
    culturalExplanation = 'Áo Đối Khâm khoác ngoài với hai vạt buông song song đối xứng trước ngực, hoa văn thêu rồng phượng tinh mỹ, toát lên phong thái quý phái, thanh tao của tầng lớp vương giả thời Lý - Trần - Lê.';
  } else {
    culturalExplanation = 'Trang phục di sản dân tộc chở che đạo nghĩa, tôn vinh khí độ đoan trang và bản sắc y phục truyền thống Việt Nam.';
  }

  // Khuyến nghị điều chỉnh tỷ lệ cơ thể theo thanh trượt
  let bodyRecommendation = `Với tỷ lệ vai ${bodyMeasurements.shoulder || 40}cm và chiều cao ${bodyMeasurements.height || 168}cm, phom dáng áo này tạo độ rủ thanh thoát từ cầu vai xuống gấu áo, giúp tôn dáng thẳng tắp chuẩn phong thái nho nhã.`;

  return {
    outfitName: title,
    suitabilityScore: harmony.score,
    isAuthentic: harmony.isAuthentic,
    warnings: harmony.warnings,
    suggestions: harmony.suggestions,
    culturalExplanation,
    bodyRecommendation,
    costumeName: costume.name,
    occasionName: occasion.name,
    timestamp: new Date().toISOString()
  };
}
