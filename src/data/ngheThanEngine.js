// ============================================================================
// ENGINE TRỢ LÝ NGHÊ THẦN — VIỆT PHỤC REMIX
// Tác giả: Thành viên 2 (Data & Logic)
// Mục đích: Tạo phản hồi nhẹ nhàng, vui vẻ, không phê bình cho trợ lý Nghê Thần
// ============================================================================

import { CULTURAL_RULES_EXTENDED, checkAllRules } from './outfitRules.js';

// ---------------------------------------------------------------------------
// 1. TÍNH CÁCH VÀ GIỌNG ĐIỆU CỦA NGHÊ THẦN
// ---------------------------------------------------------------------------

const NGHE_THAN_PERSONALITY = {
  name: 'Nghê Thần',
  title: 'Trợ Lý Văn Hóa Vui Vẻ',
  description: 'Nghê Thần là linh vật bảo vệ văn hóa, luôn xuất hiện với thái độ nhẹ nhàng và hài hước. Mục tiêu là giúp người dùng hiểu và chỉnh lại, KHÔNG BAO GIỜ phê bình hay chê bai.',

  // Nguyên tắc giao tiếp
  communicationRules: [
    'Luôn dùng giọng điệu thân thiện, như bạn bè nói chuyện',
    'Sử dụng emoji phù hợp để tạo cảm giác vui tươi',
    'Giải thích lý do TẠI SAO không phù hợp, không chỉ nói "sai"',
    'Luôn đề xuất giải pháp thay thế cụ thể',
    'Dùng ví dụ dễ hiểu, gần gũi với Gen Z',
    'Khen trước — góp ý sau — gợi ý cuối'
  ]
};

// ---------------------------------------------------------------------------
// 2. CÁC MOOD (BIỂU CẢM) CỦA NGHÊ THẦN
// ---------------------------------------------------------------------------

export const NGHE_THAN_MOODS = {
  shocked: {
    emoji: '😱',
    expression: 'Ngạc nhiên',
    bodyLanguage: 'Mắt trợn tròn, đuôi dựng đứng',
    colorAccent: '#E74C3C',
    animation: 'bounce'
  },
  worried: {
    emoji: '😅',
    expression: 'Lo lắng nhẹ',
    bodyLanguage: 'Gãi đầu, nhíu mày',
    colorAccent: '#F39C12',
    animation: 'wobble'
  },
  thinking: {
    emoji: '🤔',
    expression: 'Suy nghĩ',
    bodyLanguage: 'Chống cằm, nghiêng đầu',
    colorAccent: '#3498DB',
    animation: 'tilt'
  },
  gentle: {
    emoji: '😊',
    expression: 'Nhẹ nhàng',
    bodyLanguage: 'Mỉm cười, vẫy đuôi',
    colorAccent: '#2ECC71',
    animation: 'nod'
  },
  cute: {
    emoji: '🥺',
    expression: 'Đáng yêu',
    bodyLanguage: 'Nghiêng đầu, chớp mắt',
    colorAccent: '#E91E63',
    animation: 'wiggle'
  },
  sad: {
    emoji: '😢',
    expression: 'Buồn nhẹ',
    bodyLanguage: 'Cúi đầu, tai cụp',
    colorAccent: '#9B59B6',
    animation: 'droop'
  },
  serious: {
    emoji: '🧐',
    expression: 'Nghiêm túc',
    bodyLanguage: 'Đứng thẳng, vẻ mặt kiên quyết',
    colorAccent: '#34495E',
    animation: 'stand'
  },
  happy: {
    emoji: '🎉',
    expression: 'Vui mừng',
    bodyLanguage: 'Nhảy lên, vẫy đuôi mạnh',
    colorAccent: '#F1C40F',
    animation: 'jump'
  },
  proud: {
    emoji: '👑',
    expression: 'Tự hào',
    bodyLanguage: 'Ngẩng cao đầu, ngực ưỡn',
    colorAccent: '#D4AF37',
    animation: 'glow'
  }
};

// ---------------------------------------------------------------------------
// 3. TEMPLATE PHẢN HỒI THEO MỨC ĐỘ VI PHẠM
// ---------------------------------------------------------------------------

const RESPONSE_TEMPLATES = {
  critical: {
    openings: [
      'Ối! Nghê Thần phát hiện một điểm quan trọng nè!',
      'Khoan đã bạn ơi! Nghê Thần cần nói điều này!',
      'Ơ kìa! Nghê Thần thấy có gì đó chưa ổn lắm!',
      'Dừng lại chút nha! Nghê Thần có lời muốn nói!'
    ],
    closings: [
      'Nhưng đừng lo, chỉnh lại là đẹp ngay thôi! ✨',
      'Sửa xíu là perfect liền nha! 💯',
      'Tin Nghê Thần đi, đổi xíu là xuất sắc liền! 🌟',
      'Nghê Thần tin bạn sẽ phối đẹp hơn nữa! 💪'
    ]
  },
  warning: {
    openings: [
      'Hmm, Nghê Thần có một gợi ý nhỏ nè!',
      'À, Nghê Thần nghĩ có thể hay hơn một chút!',
      'Bạn ơi, Nghê Thần muốn chia sẻ điều này!',
      'Không tệ đâu, nhưng Nghê Thần biết cách hay hơn!'
    ],
    closings: [
      'Dù sao thì bạn vẫn phối đẹp lắm rồi! 😊',
      'Chỉ là gợi ý thôi, quyết định vẫn ở bạn nha! 💫',
      'Thử đổi xem, biết đâu lại thích hơn! 🎨',
      'Nghê Thần chỉ góp ý nhẹ nhàng thôi! 🌸'
    ]
  },
  info: {
    openings: [
      'Psst! Nghê Thần chia sẻ kiến thức hay nè!',
      'Fun fact từ Nghê Thần đây!',
      'Bạn có biết không...',
      'Nghê Thần muốn kể bạn nghe điều thú vị này!'
    ],
    closings: [
      'Giờ bạn biết rồi, phối đồ sẽ "pro" hơn! 🎓',
      'Kiến thức là sức mạnh! 💪',
      'Hy vọng bạn thấy thú vị nha! 🌟',
      'Biết nhiều, phối đẹp! 📚✨'
    ]
  }
};

// ---------------------------------------------------------------------------
// 4. PHẢN HỒI KHEN NGỢI (Khi phối đúng)
// ---------------------------------------------------------------------------

export const PRAISE_RESPONSES = {
  excellent: [
    {
      mood: 'happy',
      message: 'TUYỆT VỜI! Nghê Thần rất ấn tượng! Bộ phối này chuẩn văn hóa 100% luôn nha! 🎉',
      quote: 'Bản phối này xứng đáng lên tạp chí Việt Phục số 1! ✨'
    },
    {
      mood: 'proud',
      message: 'WOW! Bạn phối đồ như một chuyên gia văn hóa vậy! Nghê Thần tự hào lắm! 👑',
      quote: 'Hoàng gia triều Nguyễn mà thấy chắc cũng phải gật gù! 🏛️'
    },
    {
      mood: 'happy',
      message: 'Xuất sắc! Mọi chi tiết đều hài hòa, từ trang phục đến phụ kiện! Nghê Thần chấm 10 điểm! 💯',
      quote: 'Bộ phối này là nghệ thuật, không phải tình cờ! 🎨'
    }
  ],
  good: [
    {
      mood: 'gentle',
      message: 'Rất tốt! Bộ phối hài hòa và phù hợp bối cảnh. Nghê Thần thích đó! 😊',
      quote: 'Đẹp rồi, tinh chỉnh thêm xíu nữa là hoàn hảo! 🌟'
    },
    {
      mood: 'happy',
      message: 'Bạn phối khá hay đó! Nhìn vừa truyền thống vừa cá tính! 🎉',
      quote: 'Vừa "chuẩn cổ" vừa "chất GenZ" — combo đỉnh! 🔥'
    }
  ],
  fair: [
    {
      mood: 'thinking',
      message: 'Khá ổn! Có vài điểm nhỏ có thể cải thiện, nhưng tổng thể vẫn đẹp! 🤔',
      quote: 'Gần tới đích rồi, thêm chút nữa thôi! 💪'
    }
  ]
};

// ---------------------------------------------------------------------------
// 5. HÀM TẠO PHẢN HỒI NGHÊ THẦN
// ---------------------------------------------------------------------------

/**
 * Tạo phản hồi hoàn chỉnh từ Nghê Thần cho một vi phạm cụ thể.
 * @param {Object} rule - Rule bị vi phạm (từ CULTURAL_RULES_EXTENDED)
 * @returns {Object} Phản hồi hoàn chỉnh
 */
export function generateNgheThanResponse(rule) {
  const severity = rule.severity || 'info';
  const templates = RESPONSE_TEMPLATES[severity];
  const mood = NGHE_THAN_MOODS[rule.ngheThanMood || 'thinking'];

  // Random chọn opening và closing
  const opening = templates.openings[Math.floor(Math.random() * templates.openings.length)];
  const closing = templates.closings[Math.floor(Math.random() * templates.closings.length)];

  return {
    // Thông tin mood
    mood: rule.ngheThanMood || 'thinking',
    moodData: mood,

    // Nội dung phản hồi
    opening,
    title: rule.title,
    message: rule.message,
    suggestion: rule.suggestion,
    closing,

    // Quote ngắn gọn cho tooltip / quick view
    quickQuote: rule.ngheThanQuote || rule.message,

    // Severity cho UI styling
    severity,
    severityLabel: severity === 'critical' ? 'Cần chỉnh ngay' :
                   severity === 'warning' ? 'Nên cân nhắc' : 'Mẹo hay',

    // Suggested alternatives
    suggestedBottomIds: rule.suggestedBottomIds || [],
    suggestedGenzIds: rule.suggestedGenzIds || []
  };
}

/**
 * Tạo phản hồi khen ngợi khi phối đúng.
 * @param {string} level - Mức độ: 'excellent', 'good', 'fair'
 * @returns {Object} Phản hồi khen ngợi
 */
export function generatePraiseResponse(level) {
  const responses = PRAISE_RESPONSES[level] || PRAISE_RESPONSES.fair;
  const selected = responses[Math.floor(Math.random() * responses.length)];
  const moodData = NGHE_THAN_MOODS[selected.mood];

  return {
    mood: selected.mood,
    moodData,
    message: selected.message,
    quickQuote: selected.quote,
    severity: 'praise',
    severityLabel: level === 'excellent' ? 'Xuất sắc!' :
                   level === 'good' ? 'Rất tốt!' : 'Khá ổn!'
  };
}

/**
 * Xử lý toàn bộ luồng phản hồi Nghê Thần cho một bộ phối.
 * Trả về phản hồi phù hợp nhất (vi phạm nặng nhất hoặc khen ngợi).
 * @param {Object} outfitData - { costume, bottom, tradAcc, genzAcc, occasion }
 * @param {number} harmonyScore - Điểm hài hòa (0-100)
 * @returns {Object|null} Phản hồi Nghê Thần hoặc null nếu không có gì đặc biệt
 */
export function processNgheThanFeedback(outfitData, harmonyScore) {
  // Kiểm tra vi phạm
  const violations = checkAllRules(outfitData);

  if (violations.length > 0) {
    // Ưu tiên vi phạm nghiêm trọng nhất
    const priorityOrder = { critical: 0, warning: 1, info: 2 };
    violations.sort((a, b) => (priorityOrder[a.severity] || 2) - (priorityOrder[b.severity] || 2));

    return generateNgheThanResponse(violations[0]);
  }

  // Nếu không có vi phạm, tạo phản hồi khen ngợi
  if (harmonyScore >= 90) {
    return generatePraiseResponse('excellent');
  } else if (harmonyScore >= 75) {
    return generatePraiseResponse('good');
  } else if (harmonyScore >= 60) {
    return generatePraiseResponse('fair');
  }

  return null; // Không có phản hồi đặc biệt
}

// ---------------------------------------------------------------------------
// 6. CÁC CÂU NÓI NGẪU NHIÊN CỦA NGHÊ THẦN (Idle quotes / Loading tips)
// ---------------------------------------------------------------------------

export const NGHE_THAN_IDLE_QUOTES = [
  { mood: 'gentle', text: 'Mỗi bộ Việt phục đều kể một câu chuyện. Hãy để Nghê Thần kể cho bạn nghe! 📖' },
  { mood: 'thinking', text: 'Bạn biết không, 5 cúc áo ngũ thân tượng trưng cho Nhân - Lễ - Nghĩa - Trí - Tín đấy! 🤔' },
  { mood: 'happy', text: 'Phối Việt phục theo cách Gen Z — vừa "chất" vừa "chuẩn"! Let\'s go! 🚀' },
  { mood: 'proud', text: 'Áo dài Việt Nam là một trong những trang phục dân tộc đẹp nhất thế giới! 👑' },
  { mood: 'cute', text: 'Nghê Thần thích nhất khi bạn phối đồ vừa đẹp vừa đúng văn hóa! 🥺💕' },
  { mood: 'gentle', text: 'Remake không phải copy — hãy sáng tạo trên nền tảng tôn trọng! 🌿' },
  { mood: 'thinking', text: 'Ngũ Hành (Kim-Mộc-Thủy-Hỏa-Thổ) ảnh hưởng sâu sắc đến phối màu Việt phục đấy! 🎨' },
  { mood: 'happy', text: 'Quan họ Bắc Ninh được UNESCO công nhận năm 2009 — tự hào quá! 🎵' },
  { mood: 'gentle', text: 'Nhớ nha: Cung đình ≠ Dân gian. Đừng mix lẫn phẩm cấp nhé! 📏' },
  { mood: 'proud', text: 'Mỗi lần khoác áo ngũ thân, bạn đang mang cả gia đình bên mình! 💫' },
  { mood: 'cute', text: 'Nghê Thần luôn ở đây để bảo vệ văn hóa và style của bạn! 🦁✨' },
  { mood: 'thinking', text: 'Tay thụng hay tay chẽn? Tùy dịp mà chọn cho chuẩn nhé! 🤔' }
];

/**
 * Lấy một câu nói ngẫu nhiên của Nghê Thần.
 * @returns {Object} { mood, text }
 */
export function getRandomIdleQuote() {
  const idx = Math.floor(Math.random() * NGHE_THAN_IDLE_QUOTES.length);
  return NGHE_THAN_IDLE_QUOTES[idx];
}
