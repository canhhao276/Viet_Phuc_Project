// ============================================================================
// BỘ DỮ LIỆU VĂN HÓA CHUYÊN SÂU — VIỆT PHỤC REMIX
// Tác giả: Thành viên 2 (Data & Logic)
// Mục đích: Cung cấp thông tin văn hóa đã kiểm duyệt cho toàn bộ hệ thống
// ============================================================================

// ---------------------------------------------------------------------------
// 1. THÔNG TIN CHI TIẾT TỪNG LOẠI TRANG PHỤC
// ---------------------------------------------------------------------------
export const COSTUME_DETAILS = {
  ao_ngu_than: {
    id: 'ao_ngu_than',
    fullName: 'Áo Ngũ Thân Tay Chẽn',
    altNames: ['Áo ngũ thân', 'Áo năm thân tay chẽn'],
    period: 'Thời Nguyễn (Thế kỷ 18–19)',
    origin: 'Được quy chuẩn hóa dưới triều vua Minh Mạng (1820–1841) nhằm thống nhất trang phục trong cả nước, thay thế áo giao lĩnh và tứ thân ở khu vực phía Bắc.',

    // Đặc điểm nhận diện
    identifyingFeatures: [
      '5 thân vải (2 thân trước, 2 thân sau và 1 thân lót phía trước)',
      '5 cúc (khuy) cài tượng trưng Ngũ Thường: Nhân – Lễ – Nghĩa – Trí – Tín',
      'Ống tay chẽn (ôm sát cổ tay), khác với áo tấc tay thụng rộng',
      'Cổ đứng, viền may tinh tế',
      'Tà áo dài qua đầu gối, xẻ hai bên hông',
      'Thường mặc cùng quần ống rộng và khăn đóng (nam) hoặc khăn vấn (nữ)'
    ],

    // Ý nghĩa triết lý
    symbolism: [
      '5 thân = Tứ thân phụ mẫu (cha mẹ hai bên) + bản thân người mặc',
      '5 khuy = Ngũ Thường (Nhân – Lễ – Nghĩa – Trí – Tín)',
      'Thân trước chồng lên nhau = sự gắn kết gia đình, hòa thuận vợ chồng',
      'Tay chẽn ôm gọn = tinh thần tề chỉnh, năng động của người trẻ'
    ],

    // Bối cảnh sử dụng phù hợp
    suitableContexts: [
      { context: 'Tết Nguyên Đán', level: 'Rất phù hợp', note: 'Chọn màu đỏ, vàng gold, xanh lục đậm' },
      { context: 'Chụp ảnh kỷ yếu', level: 'Rất phù hợp', note: 'Gọn gàng, tôn dáng, chụp ảnh đẹp' },
      { context: 'Đi lễ chùa / viếng đền', level: 'Phù hợp', note: 'Chọn tông trầm, tránh màu quá chói' },
      { context: 'Dạo phố / cafe sáng tạo', level: 'Phù hợp', note: 'Có thể remix nhẹ nhàng với phụ kiện hiện đại' },
      { context: 'Sự kiện văn hóa / triển lãm', level: 'Rất phù hợp', note: 'Thể hiện tinh thần bảo tồn văn hóa' },
      { context: 'Tiệc trang trọng / dạ hội', level: 'Phù hợp vừa', note: 'Nên chọn áo tấc hoặc nhật bình cho chuẩn hơn' }
    ],

    // Quy tắc phối màu
    colorRules: {
      recommended: [
        { color: '#8C2D19', name: 'Đỏ gạch cổ', note: 'Màu truyền thống, quý phái, phù hợp Tết' },
        { color: '#1A365D', name: 'Xanh đêm hoàng cung', note: 'Thanh lịch, phù hợp sự kiện trang trọng' },
        { color: '#D4AF37', name: 'Vàng kim cổ điển', note: 'Tôn quý, sang trọng' },
        { color: '#2D5016', name: 'Xanh lục đậm', note: 'Nhã nhặn, gần gũi thiên nhiên' },
        { color: '#4A1A2E', name: 'Tím mận', note: 'Sang trọng, quyền quý' },
        { color: '#F5F0E8', name: 'Trắng ngà', note: 'Thanh khiết, phù hợp kỷ yếu' }
      ],
      avoid: [
        { color: 'Neon / huỳnh quang', reason: 'Hoàn toàn lệch phong cách truyền thống, gây phản cảm thị giác' },
        { color: 'Nhiều họa tiết chữ / logo thương hiệu', reason: 'Phá vỡ tính nguyên bản và tôn nghiêm của trang phục' }
      ]
    },

    // Phụ kiện phù hợp
    suitableAccessories: {
      traditional: ['Khăn đóng / mấn lụa', 'Quạt xếp trầm hương', 'Hài thêu hoa sen', 'Guốc mộc quai nhung', 'Vòng ngọc trai'],
      modern: ['Sneaker trắng vintage (dạo phố)', 'Kính oval Y2K (chụp ảnh)', 'Túi tote canvas thư pháp', 'Đồng hồ dây da cổ điển'],
      avoid: ['Dép lê / dép xỏ ngón', 'Mũ snapback / mũ lưỡi trai thể thao', 'Ba lô thể thao neon']
    },

    // Điều nên tránh
    culturalWarnings: [
      'Không mặc ngũ thân với quần short hoặc chân váy mini — phá vỡ cấu trúc trang phục',
      'Tránh phối màu quá đối lập không theo quy luật ngũ hành (VD: đỏ chói + xanh neon)',
      'Khi đi lễ chùa, tránh phối phụ kiện quá phá cách (sneaker, kính phản quang)',
      'Không nên gấp tà áo lên thắt lưng — làm mất dáng ngũ thân truyền thống'
    ],

    // Flashcard văn hóa
    flashcards: [
      {
        title: 'Tại sao gọi là "Ngũ Thân"?',
        content: 'Áo gồm 5 thân vải ghép lại. Con số 5 mang ý nghĩa đặc biệt trong triết lý Á Đông: Ngũ Hành (Kim-Mộc-Thủy-Hỏa-Thổ), Ngũ Thường (Nhân-Lễ-Nghĩa-Trí-Tín).',
        funFact: '5 thân áo cũng tượng trưng cho cha mẹ hai bên và bản thân người mặc — mỗi lần khoác áo là mang cả gia đình bên mình! 💫'
      },
      {
        title: '"Tay chẽn" khác gì "tay thụng"?',
        content: 'Tay chẽn là ống tay ôm sát cổ tay, tiện lợi cho sinh hoạt hàng ngày. Tay thụng (áo tấc) có ống tay rộng buông dài, dành cho dịp lễ trang trọng hơn.',
        funFact: 'Gen Z yêu thích ngũ thân tay chẽn vì nó gọn gàng, năng động mà vẫn chuẩn truyền thống! 🔥'
      },
      {
        title: 'Vua Minh Mạng và cuộc cải cách trang phục',
        content: 'Năm 1837, vua Minh Mạng ban chiếu thay đổi trang phục toàn quốc, yêu cầu dân chúng chuyển từ áo giao lĩnh/tứ thân sang áo ngũ thân để thống nhất quốc phục.',
        funFact: 'Đây có thể coi là "cuộc cách mạng thời trang" đầu tiên trong lịch sử Việt Nam! 👑'
      }
    ]
  },

  ao_tac: {
    id: 'ao_tac',
    fullName: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    altNames: ['Áo tấc', 'Áo ngũ thân tay thụng', 'Áo lễ thời Nguyễn'],
    period: 'Thời Nguyễn (Thế kỷ 19)',
    origin: 'Là phiên bản lễ phục của áo ngũ thân, được quy chuẩn trong triều đình Nguyễn dành cho các dịp lễ nghi quan trọng. Điểm khác biệt cốt lõi là ống tay thụng rộng, thể hiện sự trang nghiêm.',

    identifyingFeatures: [
      'Cấu trúc 5 thân giống áo ngũ thân tay chẽn',
      'Ống tay thụng rộng buông dài, tạo nét uy nghi khi vái lễ',
      'Cổ đứng ngay ngắn, thường có viền trang trí',
      'Tà áo dài hơn áo ngũ thân tay chẽn',
      'Thường mặc ngoài áo lót lụa trắng',
      'Phối cùng quần ống rộng lụa trắng hoặc đen'
    ],

    symbolism: [
      'Tay thụng rộng = Phong thái ung dung, điềm tĩnh của bậc quân tử',
      'Khi chắp tay vái lễ, tay áo buông = hình ảnh trang nghiêm, thành kính',
      'Cổ đứng ngay ngắn = Sự chính trực, đoan trang',
      'Là lễ phục "quốc dân" của triều Nguyễn — ai cũng có thể mặc trong dịp trọng đại'
    ],

    suitableContexts: [
      { context: 'Tết Nguyên Đán', level: 'Rất phù hợp', note: 'Lễ phục chuẩn mực cho ngày đầu xuân' },
      { context: 'Đi lễ chùa / viếng đền', level: 'Rất phù hợp', note: 'Trang trọng, tề chỉnh, thể hiện lòng thành kính' },
      { context: 'Lễ hội văn hóa', level: 'Rất phù hợp', note: 'Đúng tinh thần cổ phục Nguyễn triều' },
      { context: 'Chụp ảnh kỷ yếu', level: 'Phù hợp', note: 'Tạo hình ảnh thanh lịch, cổ điển' },
      { context: 'Sự kiện trang trọng / dạ tiệc', level: 'Phù hợp', note: 'Thể hiện sự sang trọng bậc nhất' },
      { context: 'Dạo phố thường ngày', level: 'Hơi trang trọng', note: 'Nên chọn ngũ thân tay chẽn cho thoải mái hơn' }
    ],

    colorRules: {
      recommended: [
        { color: '#9E2A2B', name: 'Đỏ son triều Nguyễn', note: 'Màu lễ phục chính thống, may mắn, quyền quý' },
        { color: '#E6C687', name: 'Vàng hoàng kim', note: 'Sang trọng, quý phái' },
        { color: '#22577A', name: 'Xanh lam sâu', note: 'Thanh lịch, uy nghi' },
        { color: '#1F4E46', name: 'Xanh rêu cổ', note: 'Nhã nhặn, gần gũi thiên nhiên' },
        { color: '#3D1C02', name: 'Nâu trầm gỗ quý', note: 'Mộc mạc mà sang trọng' },
        { color: '#FFFFFF', name: 'Trắng tuyết', note: 'Thuần khiết, dùng cho lễ phục lót' }
      ],
      avoid: [
        { color: 'Cam neon / hồng neon', reason: 'Phá vỡ tính trang nghiêm của lễ phục' },
        { color: 'Họa tiết in digital', reason: 'Không phù hợp với kỹ thuật dệt truyền thống' }
      ]
    },

    suitableAccessories: {
      traditional: ['Khăn đóng lụa', 'Quạt xếp trầm hương', 'Hài thêu ngũ sắc', 'Guốc mộc quai nhung', 'Chuỗi hạt bồ đề (đi lễ)'],
      modern: ['Đồng hồ dây da vintage', 'Kính gọng tròn retro (nhẹ nhàng)', 'Túi clutch nhỏ gọn'],
      avoid: ['Sneaker thể thao (khi đi lễ)', 'Balo hiện đại', 'Phụ kiện kim loại quá nhiều']
    },

    culturalWarnings: [
      'Khi đi lễ chùa/đền, TUYỆT ĐỐI tránh phối sneaker hoặc dép lê — thiếu tôn trọng không gian linh thiêng',
      'Không nên xắn tay áo thụng lên — đây là điểm nhận dạng quan trọng nhất của áo tấc',
      'Tránh phối với quần jean hoặc quần short — phá vỡ hoàn toàn cấu trúc lễ phục',
      'Không mặc áo tấc với váy đụp Kinh Bắc — sai lệch vùng miền và phẩm cấp'
    ],

    flashcards: [
      {
        title: '"Tấc" nghĩa là gì?',
        content: '"Tấc" trong tiếng Hán Nôm chỉ đơn vị đo chiều dài. Áo tấc được đặt tên theo quy chuẩn đo may nghiêm ngặt của triều đình Nguyễn.',
        funFact: 'Mỗi đường may trên áo tấc đều được quy định chính xác đến từng "tấc" — chuẩn hơn cả đo may bespoke thời hiện đại! 📏'
      },
      {
        title: 'Tay thụng — Nét đẹp khi vái lễ',
        content: 'Khi người mặc chắp tay cúi đầu vái lễ, ống tay thụng buông xuống tạo nên hình ảnh uy nghi, thành kính — đó là khoảnh khắc đẹp nhất của áo tấc.',
        funFact: 'Nhiều bạn trẻ Gen Z chọn áo tấc đi lễ chùa đầu năm — trend "Tết chuẩn cổ phong" đang hot! 🔥'
      },
      {
        title: 'Áo tấc vs Áo ngũ thân tay chẽn',
        content: 'Cùng cấu trúc 5 thân, nhưng áo tấc có tay thụng dành cho dịp lễ, còn tay chẽn dành cho thường ngày. Giống như vest vs áo sơ mi trong trang phục phương Tây.',
        funFact: 'Mẹo nhớ: "Tay Thụng = Trang Trọng, Tay Chẽn = Chill Everyday" 😎'
      }
    ]
  },

  ao_tu_than: {
    id: 'ao_tu_than',
    fullName: 'Áo Tứ Thân Bắc Bộ',
    altNames: ['Áo tứ thân', 'Áo mớ ba mớ bảy', 'Trang phục liền chị quan họ'],
    period: 'Dân gian Bắc Bộ (từ thế kỷ 17 trở về trước)',
    origin: 'Là trang phục dân gian lâu đời nhất của phụ nữ Bắc Bộ, gắn liền với đời sống nông thôn và các sinh hoạt văn hóa cộng đồng, đặc biệt là hát quan họ Kinh Bắc.',

    identifyingFeatures: [
      '4 vạt (tứ thân): 2 vạt sau khâu liền giữa lưng, 2 vạt trước buông tự do hoặc buộc chéo trước bụng',
      'Mặc cùng yếm (yếm đào hoặc yếm trắng) bên trong',
      'Thường đi kèm váy đụp lụa đen (2 lớp váy xếp chồng)',
      'Thắt lưng bằng dải lụa màu (lụa đào, lụa tím) buộc ngang eo',
      'Khăn mỏ quạ vấn trên đầu',
      'Hài/guốc mộc hoặc chân đất'
    ],

    symbolism: [
      '4 vạt = Tứ thân phụ mẫu (cha mẹ đôi bên)',
      '2 vạt trước buộc lại = Tình nghĩa vợ chồng, hòa hợp gia đình',
      'Yếm đào bên trong = Nét nữ tính kín đáo, duyên dáng của phụ nữ Việt',
      'Thắt lưng lụa đào = Sắc hồng tượng trưng cho tuổi xuân, duyên phận',
      'Gắn liền với hình ảnh liền chị quan họ = tinh hoa văn hóa Kinh Bắc'
    ],

    suitableContexts: [
      { context: 'Lễ hội quan họ / lễ hội dân gian', level: 'Rất phù hợp', note: 'Đúng bối cảnh lịch sử nhất' },
      { context: 'Chụp ảnh phong cảnh đồng quê', level: 'Rất phù hợp', note: 'Hòa quyện với không gian nông thôn Bắc Bộ' },
      { context: 'Biểu diễn văn nghệ / sân khấu', level: 'Rất phù hợp', note: 'Tạo hình ảnh dân gian ấn tượng' },
      { context: 'Tết Nguyên Đán (phong cách dân dã)', level: 'Phù hợp', note: 'Tạo không khí Tết xưa' },
      { context: 'Dạo phố / sự kiện hiện đại', level: 'Cần cân nhắc', note: 'Nên có phong cách cách tân phù hợp' },
      { context: 'Sự kiện trang trọng / dạ tiệc', level: 'Không phù hợp', note: 'Trang phục dân dã, không phải lễ phục' }
    ],

    colorRules: {
      recommended: [
        { color: '#582F0E', name: 'Nâu gụ trầm', note: 'Màu truyền thống nhất của áo tứ thân' },
        { color: '#E07A5F', name: 'Hồng đào', note: 'Màu yếm truyền thống, tượng trưng tuổi xuân' },
        { color: '#3D405B', name: 'Xanh chàm', note: 'Màu nhuộm thiên nhiên phổ biến thời xưa' },
        { color: '#1C1917', name: 'Đen tuyền', note: 'Màu váy đụp chuẩn Kinh Bắc' },
        { color: '#8B5E3C', name: 'Nâu đất', note: 'Gần gũi, mộc mạc' },
        { color: '#C4A882', name: 'Vàng lúa chín', note: 'Gợi nhớ đồng quê Bắc Bộ' }
      ],
      avoid: [
        { color: 'Vàng gold hoàng gia', reason: 'Áo tứ thân là trang phục dân gian, không phải cung đình' },
        { color: 'Đỏ son triều Nguyễn', reason: 'Sai phẩm cấp — đỏ son là màu cung đình' },
        { color: 'Pastel / candy color', reason: 'Không phù hợp tinh thần dân dã mộc mạc' }
      ]
    },

    suitableAccessories: {
      traditional: ['Khăn mỏ quạ', 'Nón quai thao', 'Guốc mộc', 'Thắt lưng lụa đào', 'Quạt nan (không phải quạt trầm hương)'],
      modern: ['Giỏ mây thủ công', 'Vòng tay gốm sứ Bát Tràng', 'Khuyên tai ngọc trai nhỏ'],
      avoid: ['Quạt xếp trầm hương (phẩm cấp cung đình)', 'Chuỗi ngọc trai nhiều tầng (quá lộng lẫy)', 'Sneaker / giày cao gót']
    },

    culturalWarnings: [
      'KHÔNG phối áo tứ thân với quần tây / quần âu — phá vỡ hoàn toàn cấu trúc trang phục dân gian',
      'Không nên phối phụ kiện cung đình (khăn đóng, quạt trầm hương) — sai phẩm cấp',
      'Yếm PHẢI được mặc bên trong — không mặc áo tứ thân mà bỏ yếm',
      'Thắt lưng lụa phải buộc ngang eo, không phải thắt lưng da hiện đại',
      'Váy đụp phải là váy lụa đen truyền thống, không thay bằng chân váy hiện đại'
    ],

    flashcards: [
      {
        title: 'Liền chị quan họ và áo tứ thân',
        content: 'Áo tứ thân gắn liền với hình ảnh liền chị quan họ Kinh Bắc (Bắc Ninh). Trong các lễ hội quan họ, liền chị mặc áo tứ thân mớ ba mớ bảy, đầu đội khăn mỏ quạ, cầm nón quai thao.',
        funFact: 'Quan họ Bắc Ninh đã được UNESCO công nhận là Di sản văn hóa phi vật thể năm 2009! 🎵'
      },
      {
        title: '"Mớ ba mớ bảy" là gì?',
        content: 'Phụ nữ xưa thường mặc nhiều lớp áo tứ thân chồng lên nhau: 3 lớp (mớ ba) cho ngày thường, 7 lớp (mớ bảy) cho dịp lễ hội. Các lớp áo xen kẽ màu sắc tạo nên vẻ đẹp rực rỡ.',
        funFact: 'Mặc 7 lớp áo mà vẫn duyên dáng — đây mới là "layering" đỉnh cao phiên bản cổ trang! 👗'
      },
      {
        title: 'Yếm đào — Nét đẹp kín đáo',
        content: 'Yếm là lớp trang phục bên trong, che phần ngực và lưng. Yếm đào (màu hồng đào) là loại phổ biến nhất, tượng trưng cho tuổi xuân và duyên dáng.',
        funFact: 'Câu ca dao "Hỡi cô yếm đào, lại đây anh hỏi..." chính là nói về vẻ đẹp này đấy! 🌸'
      }
    ]
  },

  ao_dai: {
    id: 'ao_dai',
    fullName: 'Áo Dài Truyền Thống / Cận hiện đại',
    altNames: ['Áo dài', 'Quốc phục Việt Nam', 'Vietnamese National Dress'],
    period: 'Cận – Hiện đại (từ đầu thế kỷ 20)',
    origin: 'Phát triển từ áo ngũ thân qua nhiều lần cải tiến. Phiên bản hiện đại được thiết kế bởi họa sĩ Cát Tường (1930s) và Lê Phổ, sau đó tiếp tục được cách tân qua các thời kỳ.',

    identifyingFeatures: [
      'Hai tà dài (trước và sau) xẻ từ eo trở xuống',
      'Ôm sát thân người, tôn đường nét cơ thể',
      'Cổ áo đứng (cổ Tàu) hoặc cổ thuyền (cách tân)',
      'Tay dài raglan, thường may liền thân áo',
      'Mặc cùng quần ống suông (lụa trắng hoặc đen)',
      'Chất liệu phổ biến: lụa, gấm, voan, vải áo dài chuyên dụng'
    ],

    symbolism: [
      'Tà áo thướt tha = Vẻ đẹp mềm mại, duyên dáng của phụ nữ Việt',
      'Kín đáo nhưng tôn dáng = Triết lý "đẹp trong sự kín đáo" của văn hóa Việt',
      'Quốc phục = Biểu tượng bản sắc dân tộc được thế giới công nhận',
      'Sự tiếp nối từ áo ngũ thân = Cầu nối giữa truyền thống và hiện đại'
    ],

    suitableContexts: [
      { context: 'Tết Nguyên Đán', level: 'Rất phù hợp', note: 'Quốc phục cho dịp quan trọng nhất' },
      { context: 'Chụp ảnh kỷ yếu', level: 'Rất phù hợp', note: 'Hình ảnh thanh lịch đầy cảm xúc' },
      { context: 'Đi học (ngày đặc biệt)', level: 'Rất phù hợp', note: 'Áo dài trắng = biểu tượng học sinh Việt' },
      { context: 'Lễ hội / sự kiện văn hóa', level: 'Rất phù hợp', note: 'Phù hợp mọi dịp trang trọng' },
      { context: 'Dạo phố', level: 'Phù hợp', note: 'Có thể chọn phiên bản cách tân ngắn hơn' },
      { context: 'Sự kiện quốc tế', level: 'Rất phù hợp', note: 'Tự hào giới thiệu văn hóa Việt' }
    ],

    colorRules: {
      recommended: [
        { color: '#FFFFFF', name: 'Trắng tinh khôi', note: 'Áo dài học sinh, kỷ yếu, thanh thuần' },
        { color: '#D90429', name: 'Đỏ tươi', note: 'Rực rỡ cho Tết và lễ hội' },
        { color: '#2EC4B6', name: 'Xanh ngọc', note: 'Trẻ trung, tươi mới' },
        { color: '#F4D35E', name: 'Vàng chanh', note: 'Nổi bật, vui tươi' },
        { color: '#264653', name: 'Xanh đêm', note: 'Sang trọng, quý phái' },
        { color: '#E9C46A', name: 'Vàng nghệ', note: 'Ấm áp, truyền thống' }
      ],
      avoid: [
        { color: 'Đen toàn thân (không điểm nhấn)', reason: 'Dễ gây ảm đạm nếu không phối phụ kiện khéo' },
        { color: 'Nhiều họa tiết quá rối', reason: 'Làm mất đi sự thanh lịch đặc trưng của áo dài' }
      ]
    },

    suitableAccessories: {
      traditional: ['Nón lá', 'Hoa cài tóc (hoa lan, hoa huệ)', 'Guốc gỗ quai lụa', 'Hoa tai ngọc trai', 'Vòng cổ ngọc bích'],
      modern: ['Giày cao gót (bít mũi)', 'Clutch nhỏ gọn', 'Kính mát nhẹ nhàng', 'Đồng hồ thanh mảnh'],
      avoid: ['Sneaker quá thể thao', 'Ba lô lớn', 'Phụ kiện punk / rock']
    },

    culturalWarnings: [
      'Áo dài trắng học sinh nên mặc đúng bối cảnh — tránh mặc vào quán bar hoặc hộp đêm',
      'Khi mặc áo dài, nên đứng/đi tao nhã — tránh chạy nhảy quá mạnh',
      'Áo dài cần may vừa vặn — quá chật hoặc quá rộng đều không đẹp',
      'Tránh phối áo dài nữ với quần jean — nếu muốn, hãy chọn phiên bản cách tân'
    ],

    flashcards: [
      {
        title: 'Từ ngũ thân đến áo dài hiện đại',
        content: 'Áo dài hiện đại là sự cách tân kỳ diệu từ áo ngũ thân. Họa sĩ Cát Tường (Lemur) vào những năm 1930 đã thiết kế phiên bản ôm sát thân hơn, tạo nên áo dài như chúng ta biết ngày nay.',
        funFact: 'Tên "Lemur" (tiếng Pháp của Cát Tường) từng được dùng để gọi áo dài một thời gian! 🎨'
      },
      {
        title: 'Áo dài trắng — Biểu tượng học đường',
        content: 'Áo dài trắng của nữ sinh Việt Nam là một trong những hình ảnh đẹp nhất được thế giới biết đến. Nó tượng trưng cho sự thanh khiết, trong sáng của tuổi học trò.',
        funFact: 'Hình ảnh tà áo dài bay bay trên xe đạp đến trường là "aesthetic" kinh điển mà Gen Z vẫn mê! 💕'
      },
      {
        title: 'Áo dài trong mắt thế giới',
        content: 'Áo dài Việt Nam được thế giới công nhận là một trong những trang phục dân tộc đẹp nhất. Năm 2022, Google Doodle đã vinh danh áo dài Việt Nam nhân ngày Phụ nữ Việt Nam.',
        funFact: 'Nhiều ngôi sao Hollywood như Rihanna, Katy Perry từng diện áo dài Việt Nam! 🌟'
      }
    ]
  },

  ao_nhat_binh: {
    id: 'ao_nhat_binh',
    fullName: 'Áo Nhật Bình',
    altNames: ['Nhật Bình', 'Triều phục hoàng gia'],
    period: 'Hoàng tộc triều Nguyễn',
    origin: 'Triều phục dành riêng cho Hoàng hậu, Công chúa và các mệnh phụ phu nhân trong triều đình nhà Nguyễn. Là một trong những trang phục cung đình trang trọng và tinh xảo nhất.',

    identifyingFeatures: [
      'Cổ áo hình chữ nhật (đặc trưng nhất) viền hoa văn tinh xảo',
      'Tay áo rộng với dải dệt ngũ hành ở cổ tay',
      'Thân áo rộng, vạt áo dài',
      'Thêu hoa văn rồng phượng, hoa lá tinh xảo',
      'Chất liệu gấm, lụa cao cấp',
      'Mặc cùng xiêm (váy dài) và mấn / mũ phụng'
    ],

    symbolism: [
      'Cổ chữ nhật = Uy quyền và phẩm vị cung đình',
      'Dải ngũ hành = Sự hòa hợp giữa 5 nguyên tố vũ trụ',
      'Hoa văn rồng phượng = Quyền lực hoàng gia',
      'Chỉ dành cho phụ nữ hoàng tộc = Phẩm cấp cao nhất'
    ],

    suitableContexts: [
      { context: 'Sự kiện trang trọng / dạ tiệc', level: 'Rất phù hợp', note: 'Thể hiện sự quý phái tuyệt đối' },
      { context: 'Chụp ảnh cung đình', level: 'Rất phù hợp', note: 'Tạo hình ảnh vương giả' },
      { context: 'Lễ hội văn hóa di sản', level: 'Phù hợp', note: 'Tái hiện phẩm phục cung đình' },
      { context: 'Tết (dịp đặc biệt)', level: 'Phù hợp', note: 'Cho những ai muốn diện thật lộng lẫy' },
      { context: 'Dạo phố thường ngày', level: 'Quá trang trọng', note: 'Nên chọn ngũ thân hoặc áo dài' },
      { context: 'Đi học', level: 'Không phù hợp', note: 'Phẩm phục cung đình, không hợp bối cảnh' }
    ],

    colorRules: {
      recommended: [
        { color: '#C99700', name: 'Vàng hoàng kim', note: 'Màu của Hoàng gia' },
        { color: '#B83232', name: 'Đỏ thắm cung đình', note: 'Quyền quý, may mắn' },
        { color: '#38A3A5', name: 'Xanh ngọc bích', note: 'Trang nhã, quý phái' },
        { color: '#2D1B4E', name: 'Tím hoàng triều', note: 'Cao quý, huyền bí' }
      ],
      avoid: [
        { color: 'Nâu gụ dân dã', reason: 'Sai phẩm cấp — Nhật Bình là cung đình, không phải dân gian' },
        { color: 'Màu nhạt / pastel', reason: 'Không đủ tôn quý cho phẩm phục hoàng gia' }
      ]
    },

    suitableAccessories: {
      traditional: ['Mấn phụng / mũ phụng', 'Chuỗi ngọc trai nhiều tầng', 'Hài thêu hoa sen', 'Trâm cài tóc ngọc bích'],
      modern: ['Clutch gấm lụa', 'Hoa tai ngọc trai lớn'],
      avoid: ['Guốc mộc dân dã', 'Khăn mỏ quạ', 'Nón lá', 'Sneaker', 'Phụ kiện thể thao']
    },

    culturalWarnings: [
      'KHÔNG phối Nhật Bình với váy đụp Kinh Bắc — sai lệch phẩm cấp nghiêm trọng',
      'Không phối với phụ kiện dân gian (nón lá, khăn mỏ quạ) — khác tầng lớp xã hội',
      'Nên đội mấn/mũ phụng khi mặc Nhật Bình — đó là phần không thể thiếu',
      'Tránh mặc Nhật Bình vào bối cảnh quá đời thường (đi chợ, đi học)'
    ],

    flashcards: [
      {
        title: '"Nhật Bình" nghĩa là gì?',
        content: '"Nhật Bình" (日平) có nghĩa là "bình yên mỗi ngày". Cổ áo hình chữ nhật là đặc trưng nhận dạng duy nhất, khác biệt hoàn toàn với cổ đứng của áo ngũ thân.',
        funFact: 'Mỗi bộ Nhật Bình ngày xưa phải mất hàng tháng trời để thêu tay — xứng danh "haute couture" phiên bản Việt! ✨'
      },
      {
        title: 'Ai được mặc Nhật Bình?',
        content: 'Trong triều Nguyễn, chỉ Hoàng hậu, Công chúa và các mệnh phụ phu nhân mới được phép mặc Nhật Bình. Màu sắc và hoa văn được quy định nghiêm ngặt theo phẩm vị.',
        funFact: 'Ngày nay ai cũng có thể mặc Nhật Bình — nhưng hãy mặc với sự tôn trọng và hiểu biết nhé! 👸'
      }
    ]
  },

  ao_doi_kham: {
    id: 'ao_doi_kham',
    fullName: 'Áo Đối Khâm',
    altNames: ['Đối khâm', 'Áo khoác cổ phong'],
    period: 'Thời Lý – Trần – Lê',
    origin: 'Kiểu áo có hai vạt đối xứng xẻ dọc phía trước, phổ biến trong giới quý tộc và văn nhân thời Lý – Trần – Lê. Thường được khoác ngoài các lớp giao lĩnh hoặc yếm lụa.',

    identifyingFeatures: [
      'Hai vạt đối xứng xẻ dọc phía trước (không chéo như giao lĩnh)',
      'Thường là áo khoác ngoài (overcoat layer)',
      'Tay rộng, dáng buông tự nhiên',
      'Vải mỏng nhẹ (lụa, voan, sa)',
      'Có thể có hoa văn thêu hoặc trơn',
      'Mặc ngoài giao lĩnh hoặc yếm lụa'
    ],

    symbolism: [
      'Hai vạt đối xứng = Sự cân bằng, hài hòa âm dương',
      'Dáng bay bổng = Phong thái thoát tục của văn nhân',
      'Lớp khoác ngoài = Sự sang trọng, phong lưu',
      'Gắn với thời Lý–Trần = Thời kỳ hoàng kim văn hóa Đại Việt'
    ],

    suitableContexts: [
      { context: 'Chụp ảnh nghệ thuật / cổ phong', level: 'Rất phù hợp', note: 'Tạo visual bay bổng, thoát tục' },
      { context: 'Dạo phố nghệ thuật (Indie)', level: 'Rất phù hợp', note: 'Phong cách cổ phong hiện đại' },
      { context: 'Cosplay / tái hiện lịch sử', level: 'Rất phù hợp', note: 'Đúng tinh thần thời Lý-Trần' },
      { context: 'Sự kiện trang trọng', level: 'Phù hợp', note: 'Tạo ấn tượng khác biệt' },
      { context: 'Đi lễ chùa', level: 'Phù hợp', note: 'Phong thái thanh thoát, phù hợp không gian' }
    ],

    colorRules: {
      recommended: [
        { color: '#4A4E69', name: 'Xám tím khói', note: 'Cổ phong, huyền bí' },
        { color: '#9A8C98', name: 'Tím mộng mơ', note: 'Bay bổng, lãng mạn' },
        { color: '#F2E9E4', name: 'Trắng ngà', note: 'Thanh thoát, thoát tục' },
        { color: '#22223B', name: 'Xanh đêm', note: 'Quý phái, sâu lắng' }
      ],
      avoid: [
        { color: 'Neon / huỳnh quang', reason: 'Hoàn toàn phá vỡ tinh thần cổ phong' },
        { color: 'Nhiều họa tiết cartoon', reason: 'Sai lệch tính chất nghiêm trang' }
      ]
    },

    suitableAccessories: {
      traditional: ['Quạt xếp vẽ cảnh', 'Trâm cài tóc', 'Dây lưng thắt nút'],
      modern: ['Mũ beret (Indochine style)', 'Kính gọng tròn retro'],
      avoid: ['Sneaker thể thao', 'Ba lô hiện đại', 'Phụ kiện neon']
    },

    culturalWarnings: [
      'Đối khâm là áo KHOÁC NGOÀI — cần mặc với lớp trong (giao lĩnh hoặc yếm)',
      'Không nên mặc đối khâm như áo sơ mi (chỉ mặc một lớp duy nhất)',
      'Khi gió thổi, tà áo bay rất đẹp — hãy tận dụng khi chụp ảnh!'
    ],

    flashcards: [
      {
        title: 'Đối Khâm — Vẻ đẹp của sự đối xứng',
        content: '"Đối Khâm" nghĩa là hai vạt áo đối nhau ở phía trước (khâm = vạt áo). Khác với giao lĩnh (vạt chéo), đối khâm có hai vạt song song tạo nên sự cân bằng hoàn hảo.',
        funFact: 'Nhiều bạn trẻ gọi đối khâm là "áo khoác cardigan phiên bản cổ trang" — và nó thực sự rất dễ phối! 🌿'
      }
    ]
  }
};

// ---------------------------------------------------------------------------
// 2. BỘ FLASHCARD VĂN HÓA TỔNG HỢP (Dùng cho mọi bối cảnh)
// ---------------------------------------------------------------------------
export const GENERAL_FLASHCARDS = [
  {
    id: 'fc_ngu_hanh',
    title: 'Ngũ Hành trong trang phục Việt',
    content: 'Hệ thống Ngũ Hành (Kim-Mộc-Thủy-Hỏa-Thổ) ảnh hưởng sâu sắc đến cách chọn màu sắc trang phục. Mỗi nguyên tố tương ứng với một nhóm màu và mang ý nghĩa riêng.',
    details: {
      'Kim (Trắng, Bạc)': 'Thanh khiết, công chính',
      'Mộc (Xanh lá, Xanh lục)': 'Sinh sôi, phát triển',
      'Thủy (Đen, Xanh đậm)': 'Trí tuệ, uyển chuyển',
      'Hỏa (Đỏ, Cam)': 'May mắn, nhiệt huyết',
      'Thổ (Vàng, Nâu)': 'Trung hậu, bền vững'
    },
    category: 'color'
  },
  {
    id: 'fc_phu_kien',
    title: 'Phụ kiện nói lên điều gì?',
    content: 'Trong văn hóa Việt, mỗi phụ kiện đều mang ý nghĩa. Khăn đóng thể hiện sự trang nghiêm, quạt xếp thể hiện phong lưu nho nhã, hài thêu thể hiện duyên dáng.',
    category: 'accessory'
  },
  {
    id: 'fc_tet',
    title: 'Mặc gì ngày Tết?',
    content: 'Tết Nguyên Đán là dịp quan trọng nhất để diện Việt phục. Màu đỏ, vàng, hồng đào được ưa chuộng vì mang ý nghĩa may mắn, thịnh vượng. Tránh mặc đen toàn thân hoặc trắng trơn (gợi tang tóc).',
    category: 'occasion'
  },
  {
    id: 'fc_le_hoi',
    title: 'Quy tắc trang phục khi đi lễ',
    content: 'Khi đến đền, chùa, miếu: mặc trang phục kín đáo, chọn tông màu trầm hoặc trang nhã, tránh quần short/váy ngắn, ưu tiên hài/guốc truyền thống thay vì sneaker.',
    category: 'occasion'
  },
  {
    id: 'fc_remix_rules',
    title: 'Remix Việt phục — Ranh giới nào?',
    content: 'Remix là tốt, nhưng cần tôn trọng: (1) Giữ nguyên cấu trúc cơ bản của trang phục, (2) Không trộn phẩm cấp (cung đình + dân gian), (3) Không trộn vùng miền sai bối cảnh, (4) Phụ kiện hiện đại OK, nhưng đừng lấn át nét truyền thống.',
    category: 'remix'
  },
  {
    id: 'fc_pham_cap',
    title: 'Phẩm cấp trang phục là gì?',
    content: 'Mỗi loại Việt phục thuộc một "phẩm cấp" xã hội khác nhau: Nhật Bình = Hoàng gia, Áo Tấc = Lễ phục quan lại/dân, Ngũ thân tay chẽn = Thường phục, Tứ Thân = Dân gian Bắc Bộ. Phối chéo phẩm cấp sẽ gây sai lệch lịch sử.',
    category: 'culture'
  }
];

// ---------------------------------------------------------------------------
// 3. BẢNG TƯƠNG THÍCH TRANG PHỤC – BỐI CẢNH (Compatibility Matrix)
// ---------------------------------------------------------------------------
export const COMPATIBILITY_MATRIX = {
  // Score: 5 = Hoàn hảo, 4 = Rất phù hợp, 3 = Phù hợp, 2 = Tạm được, 1 = Không phù hợp
  ao_ngu_than: { tet: 5, ky_yeu: 5, le_hoi: 4, indie: 4, da_tiec: 3 },
  ao_tac:      { tet: 5, ky_yeu: 4, le_hoi: 5, indie: 2, da_tiec: 5 },
  ao_tu_than:  { tet: 3, ky_yeu: 2, le_hoi: 5, indie: 2, da_tiec: 1 },
  ao_dai:      { tet: 5, ky_yeu: 5, le_hoi: 4, indie: 3, da_tiec: 4 },
  ao_nhat_binh:{ tet: 4, ky_yeu: 2, le_hoi: 4, indie: 1, da_tiec: 5 },
  ao_doi_kham: { tet: 3, ky_yeu: 3, le_hoi: 3, indie: 5, da_tiec: 4 }
};

// ---------------------------------------------------------------------------
// 4. BẢNG TƯƠNG THÍCH PHỤ KIỆN – TRANG PHỤC
// ---------------------------------------------------------------------------
export const ACCESSORY_COMPATIBILITY = {
  // traditional accessories
  man_lua:    { ao_ngu_than: 5, ao_tac: 5, ao_tu_than: 1, ao_dai: 2, ao_nhat_binh: 4, ao_doi_kham: 3 },
  quat_xep:   { ao_ngu_than: 4, ao_tac: 5, ao_tu_than: 1, ao_dai: 3, ao_nhat_binh: 4, ao_doi_kham: 5 },
  chuoi_ngoc:  { ao_ngu_than: 4, ao_tac: 4, ao_tu_than: 1, ao_dai: 5, ao_nhat_binh: 5, ao_doi_kham: 3 },
  hai_theu:    { ao_ngu_than: 5, ao_tac: 5, ao_tu_than: 2, ao_dai: 3, ao_nhat_binh: 5, ao_doi_kham: 3 },
  guoc_moc:    { ao_ngu_than: 4, ao_tac: 4, ao_tu_than: 5, ao_dai: 3, ao_nhat_binh: 2, ao_doi_kham: 3 },

  // gen z accessories
  sneaker_retro: { ao_ngu_than: 4, ao_tac: 2, ao_tu_than: 1, ao_dai: 2, ao_nhat_binh: 1, ao_doi_kham: 3 },
  kinh_y2k:      { ao_ngu_than: 4, ao_tac: 2, ao_tu_than: 2, ao_dai: 3, ao_nhat_binh: 1, ao_doi_kham: 4 },
  tui_canvas:    { ao_ngu_than: 4, ao_tac: 3, ao_tu_than: 3, ao_dai: 3, ao_nhat_binh: 1, ao_doi_kham: 4 },
  blazer_coat:   { ao_ngu_than: 3, ao_tac: 1, ao_tu_than: 1, ao_dai: 3, ao_nhat_binh: 1, ao_doi_kham: 2 },
  mu_beret:      { ao_ngu_than: 3, ao_tac: 2, ao_tu_than: 2, ao_dai: 3, ao_nhat_binh: 1, ao_doi_kham: 5 }
};

// ---------------------------------------------------------------------------
// 5. BẢNG TƯƠNG THÍCH QUẦN/VÁY – TRANG PHỤC
// ---------------------------------------------------------------------------
export const BOTTOM_COMPATIBILITY = {
  quan_lua_trang: { ao_ngu_than: 5, ao_tac: 5, ao_tu_than: 2, ao_dai: 5, ao_nhat_binh: 5, ao_doi_kham: 4 },
  quan_lua_den:   { ao_ngu_than: 5, ao_tac: 5, ao_tu_than: 3, ao_dai: 4, ao_nhat_binh: 4, ao_doi_kham: 4 },
  vay_dup_den:    { ao_ngu_than: 2, ao_tac: 1, ao_tu_than: 5, ao_dai: 1, ao_nhat_binh: 1, ao_doi_kham: 2 },
  quan_au_pleat:  { ao_ngu_than: 4, ao_tac: 2, ao_tu_than: 1, ao_dai: 2, ao_nhat_binh: 1, ao_doi_kham: 3 },
  chan_vay_xoe:   { ao_ngu_than: 3, ao_tac: 2, ao_tu_than: 2, ao_dai: 3, ao_nhat_binh: 2, ao_doi_kham: 3 }
};
