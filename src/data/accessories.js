// Danh mục phụ kiện truyền thống và hiện đại (hỗ trợ kiểm thử Cultural Guardrails)
export const ACCESSORIES = [
  {
    id: 'khan_dong',
    name: 'Khăn Đóng Cung Đình (Khăn Vấn)',
    type: 'traditional',
    category: 'headwear',
    description: 'Chiếc khăn vấn chữ Nhất hoặc khăn xếp trang nghiêm, biểu tượng của sự tề chỉnh, nho nhã của người Việt xưa.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    suitableFor: ['ao_ngu_than_tay_chen', 'ao_tac_tay_thung', 'ao_dai_truyen_thong'],
    isAuthentic: true
  },
  {
    id: 'giay_hai_theu',
    name: 'Giày Hài Nhung Mũi Cong',
    type: 'traditional',
    category: 'footwear',
    description: 'Hài gấm mũi lượn cong thêu chỉ ngũ sắc, bước đi nhẹ nhàng, bảo toàn trọn vẹn dáng dấp thanh cao.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
    suitableFor: ['ao_ngu_than_tay_chen', 'ao_tac_tay_thung', 'ao_dai_truyen_thong'],
    isAuthentic: true
  },
  {
    id: 'quat_tram_huong',
    name: 'Quạt Gỗ Trầm Dát Vàng',
    type: 'traditional',
    category: 'handheld',
    description: 'Quạt nan gỗ trầm hương quý phái, tỏa hương thanh nhẹ, là bạn đồng hành tao nhã của văn nhân tài tử.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
    suitableFor: ['ao_ngu_than_tay_chen', 'ao_tac_tay_thung', 'ao_dai_truyen_thong'],
    isAuthentic: true
  },
  {
    id: 'ngoc_boi_trieu_dinh',
    name: 'Ngọc Bội Chạm Khắc Thủy Tinh Khôi',
    type: 'traditional',
    category: 'jewelry',
    description: 'Mặt ngọc chạm hoa sen thắt dây ngũ sắc đeo bên sườn áo, tượng trưng cho phẩm hạnh thuần khiết như ngọc.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
    suitableFor: ['ao_ngu_than_tay_chen', 'ao_tac_tay_thung'],
    isAuthentic: true
  },
  // Các món phá cách hiện đại (Dùng để kích hoạt tính năng Cảnh Báo Sai Lệch Văn Hóa)
  {
    id: 'kinh_ram_hiphop',
    name: 'Kính Râm HipHop Đen Mắt Mèo',
    type: 'modern_anachronism',
    category: 'eyewear',
    description: 'Kính râm gọng kim loại hầm hố phong cách streetwear phương Tây.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
    suitableFor: [],
    isAuthentic: false,
    warning: 'Kính mắt phong cách HipHop tạo nên sự đứt gãy thẩm mỹ mạnh mẽ với tinh thần trầm mặc, chuẩn mực của cổ phục truyền thống.'
  },
  {
    id: 'sneaker_chunky',
    name: 'Giày Sneaker Chunky Đế Khủng',
    type: 'modern_anachronism',
    category: 'footwear',
    description: 'Giày thể thao đế cao phá cách của thời trang đương đại đường phố.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    suitableFor: [],
    isAuthentic: false,
    warning: 'Giày sneaker đế gồ ghề làm mất đi độ rủ tự nhiên của tà áo và quần thụng lụa, dễ gây cảm giác cọc cạch và phá vỡ cấu trúc chỉnh thể.'
  }
];
