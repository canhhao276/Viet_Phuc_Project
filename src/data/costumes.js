// Danh mục Đa Dạng Cổ Phục Di Sản Việt Nam Qua Các Thời Kỳ Lịch Sử
export const COSTUMES = [
  {
    id: 'ao_ngu_than_tay_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    dynasty: 'Triều Nguyễn (1802 - 1945)',
    subtitle: 'Thường phục tinh hoa nam/nữ triều Nguyễn (Thế kỷ 18-20)',
    category: 'Ngũ Thân',
    description: 'Thiết kế 5 thân tượng trưng cho ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín) và tứ thân phụ mẫu chở che con cái. Ống tay bó gọn gàng (tay chẽn), cổ đứng lập lĩnh cài khuy vàng, toát lên phong thái khiêm nhường, đĩnh đạc.',
    image: '/costumes/ao_ngu_than_tay_chen.jpg',
    defaultColor: '#1A365D',
    pantColor: '#F7F6F2',
    availableColors: [
      { id: 'xanh_cham', name: 'Xanh Lam Chàm', hex: '#1A365D' },
      { id: 'do_tram', name: 'Đỏ Thẫm Huyết Dụ', hex: '#8C1D18' },
      { id: 'vang_hoang_kim', name: 'Vàng Hoàng Yến', hex: '#D4AF37' },
      { id: 'den_huyen', name: 'Đen Huyền Quý Phái', hex: '#1C1D21' },
      { id: 'trang_nga', name: 'Trắng Ngà Tơ Tằm', hex: '#F3EFE6' },
      { id: 'xanh_ngoc', name: 'Xanh Lam Ngọc', hex: '#2E6F68' }
    ],
    culturalMeaning: 'Biểu tượng của sự chuẩn mực, tôn ti trật tự và đạo hiếu gia phong. Năm thân áo nhắc nhở con người luôn giữ tròn bổn phận làm người và rèn giũa đạo đức.',
    suitableOccasions: ['di_hoc_ky_yeu', 'tet_nguyen_dan', 'chup_anh_ngoai_canh', 'le_hoi_su_kien']
  },
  {
    id: 'ao_tac_tay_thung',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    dynasty: 'Triều Nguyễn (Lễ Phục)',
    subtitle: 'Đại lễ phục trang trọng bậc nhất triều đình và dân gian',
    category: 'Lễ Phục',
    description: 'Ống tay thụng rộng cả thước (tấc), dài quá bàn tay. Khi cung kính chấp tay trước ngực tạo nên phong thái uy nghi, đoan chính. Thường mặc trong các nghi lễ trang nghiêm nhất: tế tự, hôn lễ, yết kiến tiền nhân.',
    image: '/costumes/ao_tac_tay_thung.jpg',
    defaultColor: '#8C1D18',
    pantColor: '#F7F6F2',
    availableColors: [
      { id: 'do_tram', name: 'Đỏ Chu Sa Cung Đình', hex: '#8C1D18' },
      { id: 'xanh_ngoc', name: 'Xanh Lam Ngọc Bích', hex: '#2E6F68' },
      { id: 'vang_hoang_kim', name: 'Vàng Hoàng Cung', hex: '#D4AF37' },
      { id: 'den_huyen', name: 'Đen Huyền Trọng Thể', hex: '#1C1D21' },
      { id: 'trang_nga', name: 'Trắng Ngà Lụa Hà Đông', hex: '#F3EFE6' }
    ],
    culturalMeaning: 'Tượng trưng cho sự rộng lượng, trang nghiêm và hòa hợp với đất trời qua dáng tay thụng vuông vức khi cung kính hành lễ.',
    suitableOccasions: ['tet_nguyen_dan', 'le_hoi_su_kien', 'chup_anh_ngoai_canh']
  },
  {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    dynasty: 'Hoàng Triều Nguyễn',
    subtitle: 'Thường triều phục của hoàng hậu, công chúa và mệnh phụ triều đình',
    category: 'Cung Đình',
    description: 'Cổ áo hình chữ nhật bản to viền hoa văn tinh xảo, phía trước ngực kết dải ngũ sắc biểu tượng cho ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ). Tay áo có dải ngũ sắc rực rỡ, toát lên vẻ quyền quý, lộng lẫy chốn cung nghiêm.',
    image: '/costumes/ao_nhat_binh.jpg',
    defaultColor: '#C49A2C',
    pantColor: '#F7F6F2',
    availableColors: [
      { id: 'vang_hoang_hau', name: 'Vàng Hoàng Yến Cung Đình', hex: '#C49A2C' },
      { id: 'do_cong_chua', name: 'Đỏ Hồng Điều Công Chúa', hex: '#9E2A2B' },
      { id: 'xanh_menh_phu', name: 'Xanh Lam Ngọc Mệnh Phụ', hex: '#1B4D3E' },
      { id: 'tim_cung_dinh', name: 'Tím Trầm Hoàng Triều', hex: '#4A235A' }
    ],
    culturalMeaning: 'Biểu tượng vương quyền và vị thế tôn quý của nữ giới chốn cung đình triều Nguyễn, thể hiện sự am tường về mỹ học và trật tự điển chế.',
    suitableOccasions: ['le_hoi_su_kien', 'chup_anh_ngoai_canh', 'tet_nguyen_dan']
  },
  {
    id: 'ao_dai_truyen_thong',
    name: 'Áo Dài Cổ Điển',
    dynasty: 'Thế kỷ 20 - Hiện Đại',
    subtitle: 'Nét duyên dáng thanh thoát vượt thời gian của người Việt',
    category: 'Áo Dài',
    description: 'Tà áo dài thướt tha mềm rủ kết hợp quần lụa tơ tằm buông lơi tự nhiên, cổ đứng truyền thống khéo léo tôn vinh đường nét duyên dáng, kín đáo mà kiêu hãnh của quốc phục Việt Nam qua các thời kỳ.',
    image: '/costumes/ao_dai_truyen_thong.jpg',
    defaultColor: '#F7F6F2',
    pantColor: '#1C1D21',
    availableColors: [
      { id: 'trang_nga', name: 'Trắng Tinh Khôi Nữ Sinh', hex: '#F7F6F2' },
      { id: 'do_tram', name: 'Đỏ Lụa Sen Thắm', hex: '#8C1D18' },
      { id: 'vang_hoang_kim', name: 'Vàng Cúc Mùa Thu', hex: '#D4AF37' },
      { id: 'xanh_ngoc', name: 'Xanh Thủy Tinh Khôi', hex: '#2E6F68' },
      { id: 'tim_hue', name: 'Tím Huế Mộng Mơ', hex: '#633974' }
    ],
    culturalMeaning: 'Biểu tượng quốc phục ngời sáng vẻ đẹp kín đáo mà thanh nhã, là niềm kiêu hãnh của bản sắc văn hóa Việt Nam trên trường quốc tế.',
    suitableOccasions: ['di_hoc_ky_yeu', 'tet_nguyen_dan', 'chup_anh_ngoai_canh', 'le_hoi_su_kien']
  },
  {
    id: 'ao_tu_than',
    name: 'Áo Tứ Thân Kinh Bắc',
    dynasty: 'Dân Gian Bắc Bộ',
    subtitle: 'Hồn cốt mộc mạc, đằm thắm của phụ nữ miền Kinh Bắc',
    category: 'Dân Gian',
    description: 'Gồm 4 thân áo, hai thân sau may liền sống lưng, hai thân trước buông dài thắt vạt duyên dáng trước bụng. Thường mặc lồng yếm đào, áo cánh trắng bên trong, thắt lưng lụa đào và đội nón quai thao.',
    image: '/costumes/ao_tu_than.jpg',
    defaultColor: '#5C4033',
    pantColor: '#1A1C23',
    availableColors: [
      { id: 'nau_dong', name: 'Nâu Vỏ Gai Mộc Mạc', hex: '#5C4033' },
      { id: 'hong_canh_sen', name: 'Hồng Đào Duyên Dáng', hex: '#A93226' },
      { id: 'vang_mo', name: 'Vàng Mơ Quan Họ', hex: '#D4AC0D' },
      { id: 'den_chanh', name: 'Đen Tuyển Dân Gian', hex: '#1A1C23' }
    ],
    culturalMeaning: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng). Sự thắt nút vạt áo trước bụng tượng trưng cho tình nghĩa phu thê khăng khít, keo sơn.',
    suitableOccasions: ['le_hoi_su_kien', 'chup_anh_ngoai_canh', 'tet_nguyen_dan']
  },
  {
    id: 'ao_giao_linh',
    name: 'Áo Giao Lĩnh (Tràng Vạt)',
    dynasty: 'Thời Lý - Trần - Hậu Lê',
    subtitle: 'Cổ phục uy nghiêm ngàn năm thời Lý - Trần - Lê',
    category: 'Cổ Phong',
    description: 'Vạt áo đan chéo nhau trước ngực (giao lĩnh), vạt phải đè lên vạt trái thắt đai lưng lụa, ống tay rộng thanh thoát. Là một trong những dạng cổ phục lâu đời bậc nhất của người Việt trước thế kỷ 18.',
    image: '/costumes/ao_giao_linh.jpg',
    defaultColor: '#1B263B',
    pantColor: '#F7F6F2',
    availableColors: [
      { id: 'xanh_da_troi', name: 'Xanh Đêm Huyền Bí', hex: '#1B263B' },
      { id: 'do_chua', name: 'Đỏ Son Cổ Phục', hex: '#78281F' },
      { id: 'trang_to', name: 'Trắng Ngà Tơ Tằm', hex: '#F4F6F7' },
      { id: 'den_co', name: 'Đen Mực Nho Gia', hex: '#17202A' }
    ],
    culturalMeaning: 'Chứng nhân lịch sử của các triều đại hưng thịnh Lý, Trần, Lê; phản ánh chiều sâu văn hóa Đông Á nhưng mang đậm phong vị bản địa của người Việt.',
    suitableOccasions: ['le_hoi_su_kien', 'chup_anh_ngoai_canh']
  },
  {
    id: 'ao_doi_kham',
    name: 'Áo Đối Khâm Quý Tộc',
    dynasty: 'Thời Lý - Trần - Lê',
    subtitle: 'Khoác ngoài sang trọng với hai vạt song song mở ngực',
    category: 'Cổ Phong',
    description: 'Áo có hai vạt song song buông thẳng đối xứng qua ngực (đối khâm), vạt áo buông rủ tha thướt thêu rồng phượng hoặc mây lửa. Thường mặc khoác ngoài cùng bên ngoài yếm lụa hoặc áo giao lĩnh thời Lý - Trần - Lê.',
    image: '/costumes/ao_doi_kham.jpg',
    defaultColor: '#6B1D2F',
    pantColor: '#F7F6F2',
    availableColors: [
      { id: 'do_ruou', name: 'Đỏ Mận Quý Phái', hex: '#6B1D2F' },
      { id: 'luc_bao', name: 'Xanh Lục Bảo Triều Trần', hex: '#1E5E4F' },
      { id: 'vang_hoang_gia', name: 'Vàng Hoàng Kim Đế Vương', hex: '#C29B38' },
      { id: 'tim_tram', name: 'Tím Trầm Quý Tộc', hex: '#44224A' }
    ],
    culturalMeaning: 'Biểu tượng của vẻ đẹp thanh tao, quý phái của phụ nữ quý tộc và bậc vương giả trong giai đoạn vàng son thời Lý - Trần - Lê.',
    suitableOccasions: ['le_hoi_su_kien', 'chup_anh_ngoai_canh']
  }
];
