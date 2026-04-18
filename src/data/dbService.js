// Mock database sử dụng localStorage
const DB_KEY = 'smartcareer_db_v10';

const defaultDB = {
  users: [
    // ── GIÁO VIÊN BỘ MÔN HDTN ──
    { id: 'teacher_duong', name: 'Mai Đình Dương', email: 'duong@gmail.com', password: '123456', role: 'teacher' },
    { id: 'teacher_ban',   name: 'Vũ Hồng Bản',   email: 'ban@gmail.com',   password: '123456', role: 'teacher' },

    // ── HỌC SINH 12D9 (45 hs) ──
    { id: 's001', name: 'Huỳnh Thái An',            email: 'huynhthaian@12d9.com',           password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's002', name: 'Phạm Đình Bảo Anh',        email: 'phamdinhbaoanh@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's003', name: 'Tống Ngọc Hải Âu',         email: 'tongngochaiau@12d9.com',         password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's004', name: 'Ngô Quế Bảo',              email: 'ngoquebao@12d9.com',             password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's005', name: 'Nguyễn Thị Khánh Chi',     email: 'nguyenthikhanhchi@12d9.com',     password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's006', name: 'Nguyễn Thị Quỳnh Chi',     email: 'nguyenthiquynhchi@12d9.com',     password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's007', name: 'Nguyễn Trần Đăng',         email: 'nguyentrandang@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's008', name: 'Nguyễn Trọng Đạt',         email: 'nguyentrongdat@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's009', name: 'Nguyễn Quang Đạt',         email: 'nguyenquangdat@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's010', name: 'Nguyễn Anh Đức',           email: 'nguyenanhduc@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's011', name: 'Nguyễn Trung Dũng',        email: 'nguyentrungdung@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's012', name: 'Thái Văn Duy',             email: 'thaivanduy@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's013', name: 'Trịnh Đức Duy',            email: 'trinhduduy@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's014', name: 'Lê Chu Tuấn Duy',          email: 'lechutuanduy@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's015', name: 'Trần Minh Hoàng',          email: 'tranminhhoang@12d9.com',         password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's016', name: 'Lê Huy Hoàng',             email: 'lehuyhoang@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's017', name: 'Nguyễn Văn Huy',           email: 'nguyenvanhuy@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's018', name: 'Nguyễn Bảo Huy',           email: 'nguyenbaohuy@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's019', name: 'Nguyễn Thị Thanh Huyền',  email: 'nguyenthithanhhuyenvn@12d9.com', password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's020', name: 'Nguyễn Đình Khoa',         email: 'nguyendinhkhoa@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's021', name: 'Nguyễn Dũng Kiên',         email: 'nguyendungkien@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's022', name: 'Võ Tuấn Kiệt',             email: 'votuankiet@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's023', name: 'Phạm Hoàng Long',          email: 'phamhoanglong@12d9.com',         password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's024', name: 'Hoàng Khánh Ly',           email: 'hoangkhanhly@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's025', name: 'Vương Đình Quốc Minh',     email: 'vuongdinhquocminh@12d9.com',     password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's026', name: 'Trần Trí My',              email: 'trantramy@12d9.com',             password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's027', name: 'Nguyễn Văn Hoàng Sâm',    email: 'nguyenvanhoangsam@12d9.com',     password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's028', name: 'Nguyễn Việt Sang',         email: 'nguyenvietsang@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's029', name: 'Chương Tấn Sang',          email: 'chuongtansang@12d9.com',         password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's030', name: 'Phan Đăng Thái Sơn',       email: 'phandangthaison@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's031', name: 'Nguyễn Văn Sơn',           email: 'nguyenvanson@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's032', name: 'Nguyễn Thị Thảo Sương',   email: 'nguyenthithaosuong@12d9.com',    password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's033', name: 'Lưu Đình Tài',             email: 'luudinhtai@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's034', name: 'Nguyễn Thị Hà Thủy',      email: 'nguyenthihathuy@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's035', name: 'Nguyễn Thị Huyền Trang',  email: 'nguyenthihuyentrang@12d9.com',   password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's036', name: 'Nguyễn Thị Cẩm Tú',       email: 'nguyenthicamtu@12d9.com',        password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's037', name: 'Nguyễn Hữu Tuấn',         email: 'nguyenhuutuan@12d9.com',         password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's038', name: 'Nguyễn Hoàng Tuấn',       email: 'nguyenhoangtuan@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's039', name: 'Phan Bá Tùng',             email: 'phanbatung@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's040', name: 'Hà Thảo Uyên',             email: 'hathaouyen@12d9.com',            password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's041', name: 'Nguyễn Thị Thanh Vân',    email: 'nguyenthithanhvan@12d9.com',     password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's042', name: 'Vũ Hoàng Việt',            email: 'vuhoangviet@12d9.com',           password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's043', name: 'Nguyễn Đức Phú',           email: 'nguyenducphu@12d9.com',          password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's044', name: 'Nguyễn Long Khánh',        email: 'nguyenlongkhanh@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },
    { id: 's045', name: 'Trần Thị Bích Ngọc',       email: 'tranthibichngoc@12d9.com',       password: '123456', role: 'student', classId: 'class12d9' },

    // ── HỌC SINH 12D10 (38 hs) ──
    { id: 'd10001', name: 'Hoàng Đức Anh',           email: 'hoangducanh@12d10.com',          password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10002', name: 'Vũ Trọng Anh',            email: 'vutronganh@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10003', name: 'Trần Công Anh',           email: 'tranconganh@12d10.com',          password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10004', name: 'Nguyễn Thị Giang',        email: 'nguyenthigiang@12d10.com',       password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10005', name: 'Trịnh Công Anh',          email: 'trinhconganh@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10006', name: 'Bùi Văn Công',            email: 'buivancong@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10007', name: 'Lã Văn Dũng',             email: 'lavandung@12d10.com',            password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10008', name: 'Nguyễn Tiến Đạt',         email: 'nguyentiendat@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10009', name: 'Lê Văn Công',             email: 'levancong@12d10.com',            password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10010', name: 'Nguyễn Đức Hậu',          email: 'nguyenduchau@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10011', name: 'Nguyễn Thị Hiền',         email: 'nguyenthihien@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10012', name: 'Trương Thị Hoa',          email: 'truongthihoa@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10013', name: 'Phan Trọng Hùng',         email: 'phantronghung@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10014', name: 'Nguyễn Quang Huy',        email: 'nguyenquanghuy@12d10.com',       password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10015', name: 'Trần Đình Khang',         email: 'trandinhkhang@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10016', name: 'Lê Thị Lan',              email: 'lethilan@12d10.com',             password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10017', name: 'Vũ Văn Linh',             email: 'vuvanlinh@12d10.com',            password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10018', name: 'Nguyễn Thị Nga',          email: 'nguyenthinga@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10019', name: 'Phạm Văn Nam',            email: 'phamvannam@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10020', name: 'Bùi Thị Oanh',            email: 'buitihoanh@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10021', name: 'Đặng Văn Phúc',           email: 'dangvanphuc@12d10.com',          password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10022', name: 'Nguyễn Thị Phương',       email: 'nguyenthiphuong@12d10.com',      password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10023', name: 'Lê Văn Quang',            email: 'levanquang@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10024', name: 'Trần Thị Quỳnh',          email: 'tranthiquynh@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10025', name: 'Nguyễn Văn Sơn',          email: 'nguyenvanson@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10026', name: 'Phạm Thị Thanh',          email: 'phamthithanh@12d10.com',         password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10027', name: 'Nguyễn Thị Thảo',         email: 'nguyenthithao@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10028', name: 'Nguyễn Minh Thu',         email: 'nguyenminhthu@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10029', name: 'Nguyễn Thị Anh Thu',      email: 'nguyenthianhthu@12d10.com',      password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10030', name: 'Vi Thị Thủy Tiên',        email: 'vithithuytien@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10031', name: 'Kha Văn Toàn',            email: 'khavantoan@12d10.com',           password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10032', name: 'Nguyễn Công Đức Trường',  email: 'nguyencongductruong@12d10.com',  password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10033', name: 'Trương Thị Cẩm Tú',       email: 'truongthicamtu@12d10.com',       password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10034', name: 'Bùi Nguyên Tuấn',         email: 'buinguyentuan@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10035', name: 'Hồ Anh Tuấn',             email: 'hoanhtuan@12d10.com',            password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10036', name: 'Nguyễn Hữu Tuấn',         email: 'nguyenhuutuan@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10037', name: 'Lê Thị Ánh Tuyết',        email: 'lethianhtuyet@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },
    { id: 'd10038', name: 'Trần Thị Thảo Vi',        email: 'tranthithaovi@12d10.com',        password: '123456', role: 'student', classId: 'class12d10' },

    // ── HỌC SINH 12D11 (39 hs) ──
    { id: 'd11001', name: 'Lô Văn An',               email: 'lovanan@12d11.com',              password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11002', name: 'Nguyễn Thị Hoài An',      email: 'nguyenthihoaian@12d11.com',      password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11003', name: 'Bùi Văn Anh',             email: 'buivananh@12d11.com',            password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11004', name: 'Nguyễn Gia Bảo',          email: 'nguyengiabao@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11005', name: 'Trần Thị Hoài Bằng',      email: 'tranthihoaibang@12d11.com',      password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11006', name: 'Vi Huyền Bằng',           email: 'vihuyenbang@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11007', name: 'Lô Tuấn Du',              email: 'lotuandu@12d11.com',             password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11008', name: 'Hồ Thị Thủy Dung',        email: 'hothithuydung@12d11.com',        password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11009', name: 'Quảng Mạnh Dũng',         email: 'quangmanhdung@12d11.com',        password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11010', name: 'Vi Quang Dũng',           email: 'viquangdung@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11011', name: 'Nguyễn Khắc Duy',         email: 'nguyenkhacduy@12d11.com',        password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11012', name: 'Lê Quang Nhật Đăng',      email: 'lequangnhatdang@12d11.com',      password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11013', name: 'Nguyễn Thị Hà',           email: 'nguyenthiha@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11014', name: 'Chu Mạnh Hảo',            email: 'chumanhhao@12d11.com',           password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11015', name: 'Vi Thị Như Hân',          email: 'vithinhhuhan@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11016', name: 'Nguyễn Văn Hiếu',         email: 'nguyenvanhieu@12d11.com',        password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11017', name: 'Lê Việt Linh',            email: 'levietlinh@12d11.com',           password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11018', name: 'Nguyễn Hà Linh',          email: 'nguyenhalinh@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11019', name: 'Phạm Thị Khánh Linh',     email: 'phamthikhanhlinh@12d11.com',     password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11020', name: 'Lạng Việt Long',           email: 'langvietlong@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11021', name: 'Mạc Công Long',           email: 'macconglong@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11022', name: 'Lô Thị Trà My',           email: 'lothitramy@12d11.com',           password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11023', name: 'Lê Bảo Ngọc',             email: 'lebaongoc@12d11.com',            password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11024', name: 'Lương Bảo Ngọc',          email: 'luongbaongoc@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11025', name: 'Nguyễn Danh Nhân',        email: 'nguyendanhnhan@12d11.com',       password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11026', name: 'Kha Long Nhật',           email: 'khalongnhat@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11027', name: 'Trần Việt Phước',         email: 'tranvietphuoc@12d11.com',        password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11028', name: 'Biên Anh Quân',           email: 'bienanhquan@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11029', name: 'Phạm Hồng Quân',         email: 'phamhongquan@12d11.com',         password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11030', name: 'Vi Mạnh Quân',            email: 'vimanhquan@12d11.com',           password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11031', name: 'Ngô Việt Hoàng Sang',     email: 'ngoviethoangsang@12d11.com',     password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11032', name: 'Hồ Ngọc Sơn',             email: 'hongocson@12d11.com',            password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11033', name: 'Vũ Bá Thắng',             email: 'vubathang@12d11.com',            password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11034', name: 'Vi Văn Tiếp',             email: 'vivantiep@12d11.com',            password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11035', name: 'Lô Thủy Trang',           email: 'lothuytrang@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11036', name: 'Nguyễn Thị Bảo Trâm',    email: 'nguyenthibaotram@12d11.com',     password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11037', name: 'Phạm Đức Tuấn',          email: 'phamdactuan@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11038', name: 'Trần Gia Bảo',            email: 'trangiabao@12d11.com',           password: '123456', role: 'student', classId: 'class12d11' },
    { id: 'd11039', name: 'Lô Nhật Hoàng',           email: 'lonhathoang@12d11.com',          password: '123456', role: 'student', classId: 'class12d11' },
  ],
  classes: [
    {
      id: 'class12d9',
      name: '12D9',
      teacherIds: ['teacher_duong', 'teacher_ban'],
      code: '12D9-2026',
      studentIds: [
        's001','s002','s003','s004','s005','s006','s007','s008','s009',
        's010','s011','s012','s013','s014','s015','s016','s017','s018',
        's019','s020','s021','s022','s023','s024','s025','s026','s027',
        's028','s029','s030','s031','s032','s033','s034','s035','s036',
        's037','s038','s039','s040','s041','s042','s043','s044','s045',
      ]
    },
    {
      id: 'class12d10',
      name: '12D10',
      teacherIds: ['teacher_duong', 'teacher_ban'],
      code: '12D10-2026',
      studentIds: [
        'd10001','d10002','d10003','d10004','d10005','d10006','d10007',
        'd10008','d10009','d10010','d10011','d10012','d10013','d10014',
        'd10015','d10016','d10017','d10018','d10019','d10020','d10021',
        'd10022','d10023','d10024','d10025','d10026','d10027','d10028',
        'd10029','d10030','d10031','d10032','d10033','d10034','d10035',
        'd10036','d10037','d10038',
      ]
    },
    {
      id: 'class12d11',
      name: '12D11',
      teacherIds: ['teacher_duong', 'teacher_ban'],
      code: '12D11-2026',
      studentIds: [
        'd11001','d11002','d11003','d11004','d11005','d11006','d11007',
        'd11008','d11009','d11010','d11011','d11012','d11013','d11014',
        'd11015','d11016','d11017','d11018','d11019','d11020','d11021',
        'd11022','d11023','d11024','d11025','d11026','d11027','d11028',
        'd11029','d11030','d11031','d11032','d11033','d11034','d11035',
        'd11036','d11037','d11038','d11039',
      ]
    },
  ],
  studentProfiles: {
    // ─── LỚP 12D9 ───────────────────────────────────────────────────────────
    's001': {
      scores: { math: 7.5, literature: 8.0 },
      electives: [{ name: 'Vật lý', score: 7.5 }, { name: 'Hóa học', score: 8.0 }],
      holland: ['Xã hội', 'Nghệ thuật', 'Quản lý'],
      hobbies: 'Thích giao tiếp, hay tổ chức sự kiện lớp, giỏi thuyết trình.',
      "consultations": [
  {
    "id": "c_s001_1",
    "timestamp": "2026-04-10T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học khá Toán 7.5, Văn 8.0, Vật lý 7.5, Hóa 8.0. Em thích quản lý và giao tiếp. Em nên chọn ngành gì?"
      },
      {
        "role": "ai",
        "content": "## 🌟 Huỳnh Thái An – Tố chất Lãnh đạo & Giao tiếp!\n\nToán 7.5 | Văn 8.0 | Lý 7.5 | Hóa 8.0 → **Tổng 31.0 điểm** 🎯\n\nĐiểm Văn 8.0 kết hợp Hóa 8.0 cho thấy em có khả năng tư duy **đa chiều** – vừa khoa học vừa ngôn ngữ!\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Quản trị Kinh doanh (NEU / UEH)**\n   - Điểm B00 (Toán-Văn-Anh) hoặc B08 (Toán-Hóa-Sinh) đều xét tốt.\n   - Ra trường làm Quản lý dự án, Giám đốc điều hành.\n   - Lương khởi điểm 12-18 triệu, sau 5 năm 35-60 triệu.\n\n2. **Quản lý Nhà hàng – Khách sạn (CĐ/ĐH Du lịch)**\n   - Với khả năng giao tiếp, ngành này rất phù hợp.\n   - Làm tại resort, khách sạn 5 sao từ Phú Quốc đến Đà Nẵng.\n\n3. **Hóa học ứng dụng / Dược (ĐH Dược HN)**\n   - Hóa 8.0 là lợi thế lớn.\n   - Dược sĩ lương ổn định 15-25 triệu từ năm đầu ra trường.\n\n💡 **Lời khuyên:** Tập trung đẩy điểm Toán lên 8.0+ và ôn thêm Hóa để xét tuyển tổ hợp B08!"
      }
    ]
  }
]
    },
    's002': {
      scores: { math: 8.0, literature: 7.5 },
      electives: [{ name: 'Vật lý', score: 7.5 }, { name: 'Hóa học', score: 8.0 }],
      holland: ['Nghiên cứu', 'Thực tế', 'Quản lý'],
      hobbies: 'Thích khoa học, hay làm thí nghiệm hóa, mơ ước làm dược sĩ.',
    
      "consultations": [
  {
    "id": "c_s002_1",
    "timestamp": "2026-04-11T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học Toán 8.0, Văn 7.5, Lý 7.5, Hóa 8.0. Em thích khoa học và mơ ước làm dược sĩ. Em có đủ điều kiện không?"
      },
      {
        "role": "ai",
        "content": "## 💊 Phạm Đình Bảo Anh – Con đường Dược sĩ!\n\nToán 8.0 | Văn 7.5 | Lý 7.5 | Hóa 8.0 → **Tổng 31.0 điểm** ✨\n\nĐiểm Hóa 8.0 và Toán 8.0 là **combo hoàn hảo** cho ngành Dược!\n\n### 🎓 Lộ trình trở thành Dược sĩ:\n\n1. **ĐH Dược Hà Nội (xét tổ hợp B00: Toán-Hóa-Sinh)**\n   - Điểm chuẩn khoảng 26-28 điểm. Với Toán 8.0 + Hóa 8.0 em cần ôn thêm Sinh.\n   - Ra trường làm Dược sĩ bệnh viện, nhà thuốc, công ty Dược quốc tế.\n\n2. **ĐH Y Dược TP.HCM (B00)**\n   - Uy tín cao nhất miền Nam. Điểm chuẩn 28-30 điểm.\n\n3. **Hóa học – ĐH Khoa học Tự nhiên**\n   - Phù hợp nếu muốn nghiên cứu hoặc làm QC/QA trong công ty Dược.\n\n💡 **Chiến lược:** Em cần ôn thêm Sinh học để xét tổ hợp B00. Điểm Toán + Hóa của em rất tốt!"
      }
    ]
  }
]
    },
    's003': {
      scores: { math: 6.5, literature: 7.0 },
      electives: [{ name: 'Sinh học', score: 7.5 }, { name: 'Hóa học', score: 7.0 }],
      holland: ['Xã hội', 'Nghiên cứu', 'Thực tế'],
      hobbies: 'Thích chăm sóc sức khỏe, yêu thích sinh học và môi trường.',
    
      "consultations": [
  {
    "id": "c_s003_1",
    "timestamp": "2026-04-11T09:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học Toán 6.5, Văn 7.0, Sinh 7.5, Hóa 7.0. Em thích sức khỏe và môi trường. Em nên học ngành gì?"
      },
      {
        "role": "ai",
        "content": "## 🌿 Tống Ngọc Hải Âu – Đam mê Sức khỏe & Thiên nhiên!\n\nToán 6.5 | Văn 7.0 | Sinh 7.5 | Hóa 7.0 → **Tổng 28.0 điểm** 🌱\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Điều dưỡng / Y sĩ (CĐ Y tế)**\n   - Xét tổ hợp B00 (Toán-Hóa-Sinh). Điểm em đủ điều kiện.\n   - Nhu cầu nhân lực y tế rất cao. Lương điều dưỡng 8-15 triệu.\n\n2. **Môi trường (ĐH Tài nguyên Môi trường)**\n   - Học về bảo vệ môi trường, xử lý nước thải, rác thải.\n   - Xu hướng xanh đang tạo nhiều cơ hội việc làm.\n\n3. **Nông nghiệp – Bảo vệ Thực vật (HVN)**\n   - Phù hợp với yêu thích thiên nhiên.\n   - Nhiều chương trình học bổng hấp dẫn.\n\n💡 **Gợi ý:** Đẩy điểm Sinh lên 8.0 để xét tuyển Điều dưỡng chắc chắn hơn!"
      }
    ]
  }
]
    },
    's004': {
      scores: { math: 7.0, literature: 6.5 },
      electives: [{ name: 'Vật lý', score: 7.0 }, { name: 'Tiếng Anh', score: 8.5 }],
      holland: ['Thực tế', 'Nghiên cứu', 'Nghiệp vụ'],
      hobbies: 'Đam mê lập trình, thích xây dựng app mobile.',
      "consultations": [
  {
    "id": "c_s004_1",
    "timestamp": "2026-04-12T09:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em Toán 7.0, Văn 6.5, Lý 7.0, Anh 8.5. Em đam mê lập trình và muốn xây dựng app mobile. Em nên học gì?"
      },
      {
        "role": "ai",
        "content": "## 💻 Ngô Quế Bảo – Lập trình viên tương lai!\n\nToán 7.0 | Văn 6.5 | Lý 7.0 | Anh 8.5 → **Tổng 29.0 điểm** 🚀\n\nAnh 8.5 là **lợi thế cực lớn** trong ngành IT – tài liệu kỹ thuật toàn tiếng Anh, công ty nước ngoài trả lương USD!\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Công nghệ Thông tin – Lập trình Di động (FPT / HUMG)**\n   - Xét tổ hợp A01 (Toán-Lý-Anh) = 22.5 điểm – **đủ điều kiện khá chắc**.\n   - Học Flutter, React Native, iOS/Android development.\n   - Lập trình viên mobile lương 20-50 triệu/tháng.\n\n2. **Kỹ thuật Phần mềm (HUST / UIT)**\n   - Top trường IT uy tín. A01 = 22.5 điểm.\n   - Ra trường được Google, Samsung, Viettel tuyển thẳng.\n\n3. **Hệ thống Thông tin Quản lý**\n   - Nhẹ nhàng hơn, kết hợp IT và kinh doanh.\n\n💡 **Lời khuyên:** Em cần đẩy điểm Toán lên 8.0 để chắc chắn vào FPT. Luyện thêm code Python/Java ngay từ hè này!"
      }
    ]
  }
]
    },
    's005': {
      scores: { math: 8.5, literature: 8.0 },
      electives: [{ name: 'Vật lý', score: 9.0 }, { name: 'Tiếng Anh', score: 8.0 }],
      holland: ['Xã hội', 'Nghệ thuật', 'Nghiên cứu'],
      hobbies: 'Giỏi tiếng Anh, thích du lịch, hay viết blog du lịch bằng Anh ngữ.',
      "consultations": [
  {
    "id": "c_s005_1",
    "timestamp": "2026-04-10T10:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em Toán 8.5, Văn 8.0, Lý 8.0, Anh 9.0. Em rất giỏi tiếng Anh và muốn làm việc toàn cầu. Gợi ý cho em."
      },
      {
        "role": "ai",
        "content": "## 🌍 Nguyễn Thị Khánh Chi – Công dân Toàn cầu!\n\nToán 8.5 | Văn 8.0 | Lý 8.0 | Anh 9.0 → **Tổng 33.5 điểm** 🏆 **Top 5% cả nước!**\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Ngôn ngữ Anh / Sư phạm Tiếng Anh (ULIS – ĐH Ngoại Ngữ)**\n   - Điểm xét D01 (Toán-Văn-Anh) = 25.5 điểm. **Tốp 1 cả nước.**\n   - Làm Phiên dịch viên Hội nghị Quốc tế: 5-15 triệu/ngày.\n   - Giáo viên IELTS tự do: 200k-500k/giờ dạy.\n\n2. **Kinh doanh Quốc tế (FTU – ĐH Ngoại Thương)**\n   - Điểm A01 (Toán-Lý-Anh) = 25.5 điểm. **Rất dễ đỗ.**\n   - Làm Chuyên viên Xuất Nhập Khẩu tại công ty đa quốc gia.\n   - Lương 25-60 triệu sau 3 năm kinh nghiệm.\n\n3. **Du học Hàn Quốc / Nhật Bản (học bổng)**\n   - Điểm Anh 9.0 giúp em xin học bổng nước ngoài.\n   - Hàng năm có hàng trăm suất học bổng toàn phần.\n\n💡 **Lời khuyên:** Chi nên đăng ký thi IELTS ngay – với nền tảng Anh 9.0, em hoàn toàn có thể đạt 7.5+ và mở ra cơ hội toàn cầu!"
      }
    ]
  }
]
    },
    's044': {
      scores: { math: 9.0, literature: 8.0 },
      electives: [{ name: 'Vật lý', score: 8.5 }, { name: 'Hóa học', score: 8.5 }],
      holland: ['Nghiên cứu', 'Quản lý', 'Thực tế'],
      hobbies: 'Đam mê công nghệ thông tin và lập trình web, tự học JavaScript. Hay code website đơn giản, muốn lập startup công nghệ. Đọc blog về AI và blockchain.',
      "consultations": [
  {
    "id": "c_s044_1",
    "timestamp": "2026-04-15T10:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em thi Toán 9.0, Văn 8.0, Lý 8.5, Hóa 8.5. Em mê lập trình web và muốn lập startup. Top 3 ngành cho em?"
      },
      {
        "role": "ai",
        "content": "## 🚀 Nguyễn Long Khánh – Học lực GIỎI, Tham vọng Startup!\n\nToán 9.0 | Văn 8.0 | Lý 8.5 | Hóa 8.5 → **Tổng 34.0 điểm** 💎 **Top 1% cả nước!**\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Khoa học Máy tính (HUST / VNU-IT)**\n   - A00 (Toán-Lý-Hóa) = 25.5 điểm – **vào top 1 không khó**.\n   - Nền tảng vững để xây dựng startup tech.\n   - Kỹ sư HUST được Google, Facebook, Grab tuyển dụng.\n\n2. **Kỹ thuật Phần mềm (FPT University)**\n   - Môi trường startup năng động nhất Việt Nam.\n   - Ra trường lương 25-40 triệu, startup tiềm năng hơn.\n\n3. **Toán Tin (ĐH Khoa học Tự nhiên HN)**\n   - Điểm Toán 9.0 là lợi thế tuyệt vời.\n   - Học AI/Machine Learning – nền tảng startup tương lai.\n\n💡 **Lời khuyên:** Khánh nên xây dựng GitHub profile và tham gia các hackathon ngay từ năm 1 ĐH!"
      }
    ]
  }
]
    },
    's045': {
      scores: { math: 7.0, literature: 8.5 },
      electives: [{ name: 'Tiếng Anh', score: 8.0 }, { name: 'Sinh học', score: 7.5 }],
      holland: ['Xã hội', 'Nghệ thuật', 'Quản lý'],
      hobbies: 'Thích viết văn, làm thơ, hay đọc sách văn học.',
    
      "consultations": [
  {
    "id": "c_s045_1",
    "timestamp": "2026-04-15T11:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em Toán 7.0, Văn 8.5, Anh 9.0, Sinh 7.5. Em thích ngành sáng tạo nội dung và truyền thông. Em có thể học gì?"
      },
      {
        "role": "ai",
        "content": "## 🎨 Trần Thị Bích Ngọc – Cô gái Sáng tạo & Đa tài!\n\nToán 7.0 | Văn 8.5 | Anh 9.0 | Sinh 7.5 → **Tổng 32.0 điểm** ✨\n\nAnh 9.0 + Văn 8.5 = **Bộ đôi hoàn hảo** cho ngành Truyền thông Quốc tế!\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Truyền thông Đa phương tiện / Báo chí (AJC / VNU-USSH)**\n   - Tổ hợp D01 (Toán-Văn-Anh) = 24.5 điểm – **dễ đỗ**.\n   - Làm Content Creator, Journalist, PR Manager.\n\n2. **Ngôn ngữ Anh (ULIS)**\n   - Anh 9.0 nhân đôi hệ số sẽ giúp em có điểm rất cao.\n\n3. **Marketing (TMU / HUBT)**\n   - Kết hợp sáng tạo nội dung với kinh doanh.\n   - Digital Marketing – nghề hot nhất 5 năm tới.\n\n💡 **Lời khuyên:** Ngọc nên bắt đầu xây dựng kênh YouTube/TikTok tiếng Anh ngay từ bây giờ!"
      }
    ]
  }
]
    },

    // ─── LỚP 12D10 ──────────────────────────────────────────────────────────
    'd10001': {
      scores: { math: 6.5, literature: 6.0 },
      electives: [{ name: 'Lịch sử', score: 6.5 }, { name: 'Tin học', score: 6.0 }],
      holland: ['Xã hội', 'Thực tế', 'Nghiệp vụ'],
      hobbies: 'Thích thể thao, hay chơi bóng đá, có tinh thần đồng đội cao.',
    },
    'd10002': {
      scores: { math: 5.5, literature: 6.5 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.5 }],
      holland: ['Xã hội', 'Nghiệp vụ', 'Thực tế'],
      hobbies: 'Thích nấu ăn, hay phụ gia đình kinh doanh nhỏ.',
    },
    'd10003': {
      scores: { math: 6.0, literature: 5.5 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.5 }],
      holland: ['Thực tế', 'Nghiệp vụ', 'Xã hội'],
      hobbies: 'Thích sửa chữa ô tô, xe máy, hay mày mò máy móc.',
      "consultations": [
  {
    "id": "c_d10003_1",
    "timestamp": "2026-04-13T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học yếu, điểm dưới 5. Em thích sửa xe máy, hay mày mò máy móc. Em nên làm nghề gì?"
      },
      {
        "role": "ai",
        "content": "## 🔧 Học nghề Sửa chữa Ô tô – Xe máy!\n\nĐam mê máy móc là **vốn quý** mà trường học không dạy được!\n\n### 🛠️ Con đường nghề Cơ khí Động cơ:\n\n1. **Trung cấp Nghề Sửa chữa Ô tô – Xe máy (Cao đẳng Nghề)**\n   - Học 1.5 năm, điểm đầu vào thấp.\n   - **Lương thợ lành nghề:** 15-25 triệu/tháng.\n\n2. **Kỹ thuật viên Bảo dưỡng Ô tô (Toyota / Honda / VinFast)**\n   - Môi trường chuyên nghiệp, có phúc lợi tốt.\n\n3. **Mở tiệm sửa xe riêng**\n   - Sau 3-5 năm tích lũy, hoàn toàn có thể tự kinh doanh.\n\n💡 **Hành động ngay:** Đăng ký học Cao đẳng Nghề Công nghệ ô tô ngay sau khi thi xong!"
      }
    ]
  }
]
    },
    'd10004': {
      scores: { math: 5.5, literature: 6.0 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.0 }],
      holland: ['Xã hội', 'Nghệ thuật', 'Thực tế'],
      hobbies: 'Tính nữ cẩn thận, hay giúp mẹ bán đồ ăn sáng đầu ngõ.',
      "consultations": [
  {
    "id": "c_d10004_1",
    "timestamp": "2026-04-13T09:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em hay phụ mẹ bán đồ ăn sáng, cẩn thận tỉ mỉ. Em không muốn học đại học. Em có thể làm nghề gì?"
      },
      {
        "role": "ai",
        "content": "## 🍜 Nghề Ẩm thực – Hướng đi Chắc ăn!\n\nKinh nghiệm bán hàng thực tế của em đã có – đó là **lợi thế mà nhiều bạn đại học không có**!\n\n### 🍳 Con đường Kinh doanh Ẩm thực:\n\n1. **Trung cấp Nghề Nấu ăn / Pha chế**\n   - Học 1 năm, **Đầu bếp:** 8-20 triệu/tháng.\n\n2. **Học pha chế Trà sữa / Cà phê**\n   - Khóa học 2-3 tháng, ra nghề ngay.\n\n3. **Mở quán ăn sáng / Kinh doanh Online**\n   - Bán online qua Shopee Food, GrabFood: tăng thu nhập 2-3 lần.\n\n💡 **Lời khuyên:** Đăng ký học thêm kỹ năng kinh doanh online để phát triển quán ăn gia đình!"
      }
    ]
  }
]
    },
    'd10005': {
      scores: { math: 5.0, literature: 4.5 },
      electives: [{ name: 'Lịch sử', score: 5.0 }, { name: 'Tin học', score: 6.0 }],
      holland: ['Nghiệp vụ', 'Thực tế', 'Xã hội'],
      hobbies: 'Đam mê chơi game, thích tự mày mò tháo lắp máy tính, cài windows dạo cho xóm.',
      "consultations": [
  {
    "id": "c_d10005_1",
    "timestamp": "2026-04-13T10:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em chơi game nhiều, thích tháo lắp máy tính, hay cài Windows cho hàng xóm. Em nên học gì?"
      },
      {
        "role": "ai",
        "content": "## 💻 Đam mê công nghệ có thể thành nghề!\n\nTin học 6.0 cao nhất – **đây là tín hiệu rõ ràng** về hướng đi của em!\n\n### 🖥️ Con đường nghề IT Thực chiến:\n\n1. **Cao đẳng Công nghệ Thông tin (hệ 2.5 năm)**\n   - Ra trường làm kỹ thuật viên IT: 10-18 triệu/tháng.\n\n2. **Kỹ thuật viên Phần cứng / Mạng LAN**\n   - Lương ổn định, ít bị cạnh tranh bởi AI.\n\n3. **Bán và Sửa chữa Máy tính**\n   - Mở tiệm sửa máy tính tại nhà là hoàn toàn khả thi.\n\n💡 **Hành động ngay:** Đăng ký khóa học A+/Network+ online hoặc thi bằng Tin học Quốc tế!"
      }
    ]
  }
]
    },
    'd10009': {
      scores: { math: 4.0, literature: 5.5 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.0 }],
      holland: ['Xã hội', 'Nghệ thuật', 'Thực tế'],
      hobbies: 'Thích nấu ăn, hay phụ giúp gia đình làm cỗ, bán đồ ăn sáng đầu ngõ.',
      "consultations": [
  {
    "id": "c_d10009_1",
    "timestamp": "2026-04-14T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em thích nấu ăn, hay làm cỗ giúp gia đình. Em muốn làm nghề liên quan đến ẩm thực."
      },
      {
        "role": "ai",
        "content": "## 🍽️ Nghệ nhân Ẩm thực tương lai!\n\nĐam mê nấu ăn là **nghề mà robot không thể thay thế**!\n\n### 🧑‍🍳 Con đường Đầu bếp chuyên nghiệp:\n\n1. **Trung cấp Kỹ thuật Nấu ăn**\n   - Bếp chính: 15-25 triệu. Bếp trưởng resort: 35-60 triệu.\n\n2. **Kỹ thuật Chế biến Món ăn (CĐ Du lịch)**\n   - Học làm bánh, pha chế, phục vụ khách sạn 5 sao.\n\n3. **Kinh doanh Hàng ăn Online**\n   - Thu nhập 15-30 triệu/tháng khi có khách quen.\n\n💡 **Lời khuyên:** Hè này em thử nhận làm đồ ăn theo đơn online!"
      }
    ]
  }
]
    },
    'd10014': {
      scores: { math: 5.5, literature: 6.0 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.0 }],
      holland: ['Xã hội', 'Quản lý', 'Nghệ thuật'],
      hobbies: 'Thích làm MC, hay đứng trước đám đông nói chuyện, giọng nói to ấm.',
      "consultations": [
  {
    "id": "c_d10014_1",
    "timestamp": "2026-04-12T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em rất thích làm MC và diễn xuất, hay đứng trước đám đông. Điểm học chỉ trung bình. Em học ngành gì được?"
      },
      {
        "role": "ai",
        "content": "## 🎤 MC & Sân khấu – Nghề đẳng cấp!\n\nKhả năng nói chuyện trước đám đông là **tài năng thiên phú**!\n\n### 🌟 Con đường sự nghiệp:\n\n1. **CĐ Nghệ thuật / Sân khấu Điện ảnh**\n   - **MC sự kiện lớn:** 3-10 triệu/buổi.\n\n2. **Truyền thông và Sự kiện (CĐ/ĐH)**\n   - Nhân viên Event: 12-20 triệu/tháng + phụ cấp.\n\n3. **Telesales / Bán hàng trực tiếp**\n   - Thu nhập: 15-40 triệu/tháng tùy doanh số.\n\n💡 **Lời khuyên:** Thử ngay việc dẫn chương trình cho các sự kiện nhỏ ở địa phương!"
      }
    ]
  }
]
    },
    'd10035': {
      scores: { math: 5.0, literature: 5.0 },
      electives: [{ name: 'Lịch sử', score: 5.5 }, { name: 'Tin học', score: 6.0 }],
      holland: ['Thực tế', 'Nghiên cứu', 'Nghiệp vụ'],
      hobbies: 'Thích quan sát thợ sửa điện, hay nối dây điện bị chập hỏng trong nhà thành công.',
      "consultations": [
  {
    "id": "c_d10035_1",
    "timestamp": "2026-04-15T09:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học bình thường nhưng nhạy bén với mạch điện, rành các thiết bị điện trong nhà. Em học kỹ sư điện được không?"
      },
      {
        "role": "ai",
        "content": "## ⚡ Nghề Điện – Không bao giờ sập nguồn!\n\nXã hội cần **hàng triệu Thợ điện dân dụng** tay nghề cao!\n\n### ⚡ Lộ trình nghề Điện:\n\n1. **Trung cấp Điện dân dụng – Điện lạnh**\n   - **Thợ sửa điều hòa mùa hè:** 20-40 triệu/tháng.\n\n2. **Lắp ráp Camera, Smart Home**\n   - Thu nhập: 12-20 triệu + chiết khấu thiết bị.\n\n3. **Mở đại lý Thiết bị Điện**\n   - 25 tuổi có thể nhận thầu đường điện nước nguyên khu phố.\n\n💡 **Lời khuyên:** Học Cao đẳng nghề Điện lạnh – vừa có bằng cấp, 3 năm sau tự mở tiệm!"
      }
    ]
  }
]
    },

    // ─── LỚP 12D11 ──────────────────────────────────────────────────────────
    'd11001': {
      scores: { math: 4.5, literature: 5.0 },
      electives: [{ name: 'Lịch sử', score: 5.5 }, { name: 'Sinh học', score: 6.0 }],
      holland: ['Thực tế', 'Xã hội', 'Nghiệp vụ'],
      hobbies: 'Thích trổng cây cảnh, uốn bonsai mộc mạc, yêu thích thiên nhiên.',
    },
    'd11025': {
      scores: { math: 5.5, literature: 5.0 },
      electives: [{ name: 'Lịch sử', score: 5.5 }, { name: 'Tin học', score: 6.0 }],
      holland: ['Nghiệp vụ', 'Thực tế', 'Quản lý'],
      hobbies: 'Rành đường phố, thích chạy xe máy loanh quanh, am hiểu các app công nghệ gọi xe.',
      "consultations": [
  {
    "id": "c_d11025_1",
    "timestamp": "2026-04-13T14:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học khá yếu, chỉ được cái lanh lợi và thạo đường. Có việc gì làm ra tiền ngay mà không cần bằng cấp không?"
      },
      {
        "role": "ai",
        "content": "## 🚴 Ông vua đường phố!\n\nToán 5.5 | Văn 5.0 | Sử 5.5 | Tin 6.0\n\nSự lanh lợi và \"thuộc bản đồ\" là kỹ năng cực hữu ích trong kinh tế vận chuyển!\n\n### 🛵 Con đường Tự do tài chính:\n\n1. **Giao hàng công nghệ (Ahamove / ShopeeXpress)**\n   - Không cần bằng cấp, chỉ cần thạo đường và thái độ tốt.\n   - **Thu nhập full-time:** 15-25 triệu/tháng.\n   - Chủ động thời gian hoàn toàn.\n\n2. **Trung cấp Logistics / Quản lý Kho bãi**\n   - Từ kinh nghiệm giao hàng, học thêm 1.5 năm.\n   - Điều phối viên (Dispatcher): 12-18 triệu/tháng.\n\n💡 **Chiến lược:** Thi xong đăng ký chạy ngay tháng đầu tiên để có tiền tự lập. Không ai đánh thuế người làm việc lương thiện!"
      }
    ]
  }
]
    },
    'd11026': {
      scores: { math: 5.0, literature: 5.5 },
      electives: [{ name: 'Lịch sử', score: 6.0 }, { name: 'Tin học', score: 5.5 }],
      holland: ['Nghiệp vụ', 'Quản lý', 'Xã hội'],
      hobbies: 'Thích theo dõi bóng đá, chơi thể thao ngoài trời, năng động và không ngại giao tiếp.',
      "consultations": [
  {
    "id": "c_d11026_1",
    "timestamp": "2026-04-13T16:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em rất thích thể thao và bóng đá. Điểm học chỉ trung bình. Em có thể làm nghề gì liên quan đến thể thao không?"
      },
      {
        "role": "ai",
        "content": "## ⚽ Thể thao là nghề!\n\nToán 5.0 | Văn 5.5 | Sử 6.0 | Tin 5.5\n\nĐam mê thể thao là nền tảng cho nhiều nghề **thu nhập tốt và năng động!**\n\n### 🏅 Con đường sự nghiệp Thể thao:\n\n1. **Trung cấp Huấn luyện viên TDTT**\n   - Học 2 năm, điểm xét thấp.\n   - **HLV bóng đá trẻ em:** 200-500k/buổi = 15-25 triệu/tháng.\n\n2. **Quản lý sân bóng / Nhà thi đấu**\n   - Công việc ổn định với người yêu thể thao.\n   - Lương 8-12 triệu + phụ cấp theo ca.\n\n3. **Bán thiết bị thể thao Online**\n   - Am hiểu thể thao → tư vấn tốt → bán được.\n   - Lãi 30-40%, tháng kiếm 10-25 triệu khi thành thạo.\n\n💡 **Lời khuyên:** Đăng ký làm HLV phụ ở CLB bóng đá trẻ em gần nhà ngay sau kỳ thi!"
      }
    ]
  }
]
    },
    'd11039': {
      scores: { math: 5.5, literature: 5.0 },
      electives: [{ name: 'Lịch sử', score: 5.5 }, { name: 'Lý lịch', score: 6.0 }],
      holland: ['Thực tế', 'Nghiệp vụ', 'Quản lý'],
      hobbies: 'Rành điện lạnh, thích sửa điều hòa, hay giúp hàng xóm vệ sinh máy lạnh.',
      "consultations": [
  {
    "id": "c_d11039_1",
    "timestamp": "2026-04-15T10:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em rành về điện lạnh, hay sửa máy lạnh cho hàng xóm. Em nên đi học nghề gì?"
      },
      {
        "role": "ai",
        "content": "## ❄️ Bác thầy Điện Lạnh nhiệt đới!\n\nToán 5.5 | Văn 5.0 | Sử 5.5 | Lý 6.0\n\nXã hội đang \"đốt đuốc tìm không ra\" những **Thợ Điện Lạnh** tay nghề giỏi!\n\n### 🧊 Lộ trình nghề Điện Lạnh:\n\n1. **Trung cấp Điện Lạnh / Máy lạnh**\n   - Học nghề 1-1.5 năm. Thực tập được trả tiền.\n   - **Mùa hè:** Vệ sinh 10 điều hòa/ngày = 2-3 triệu/ngày!\n\n2. **Cung cấp vật tư linh kiện điện lạnh cũ**\n   - Mua dàn lạnh hỏng vài trăm nghìn, sửa lại bán 3-5 triệu.\n\n3. **Đội thi công điện nước M&E**\n   - Nhận thi công lắp máy lạnh cho công trình biệt thự.\n\n💡 **Lời khuyên:** Xin đi làm Thợ Phụ Điện Lạnh (được bao ăn ở) cho cửa hàng uy tín ngay hè này!"
      }
    ]
  }
]
    },
    's033': {
    "scores": {
        "math": 7.5,
        "literature": 8
    },
    electives: [{ name: 'Vật lý', score: 7.5 }, { name: 'Hóa học', score: 8 }],
    "holland": [
        "Quản lý",
        "Xã hội",
        "Thực tế"
    ],
    "hobbies": "Thích tổ chức sự kiện, hay làm nhóm trưởng các dự án trên lớp.",
    "consultations": [
  {
    "id": "c_s033_1",
    "timestamp": "2026-04-14T14:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Với Toán 7.5, Văn 8.0, Lý 7.5, Hóa 8.0 và sở thích tổ chức sự kiện, hay làm nhóm trưởng, chuyên gia gợi ý top 3 ngành phù hợp nhất?"
      },
      {
        "role": "ai",
        "content": "## 👔 Lưu Đình Tài – Nhà lãnh đạo tương lai!\n\nToán 7.5 | Văn 8.0 | Lý 7.5 | Hóa 8.0 → **Tổng 31.0 điểm** 🌟\n\n### 🎓 Top 3 ngành phù hợp:\n\n1. **Quản trị Kinh doanh (NEU / UEH)**\n   - Điểm B08 (Toán-Hóa-Sinh) hoặc A00 (Toán-Lý-Hóa) = 23.0 điểm – **rất chắc**.\n   - Ra trường làm Quản lý dự án, Giám đốc điều hành công ty.\n   - Lương 15-30 triệu khởi điểm, 50-100 triệu sau 7 năm.\n\n2. **Kỹ thuật Hóa học (HUST / HUET)**\n   - Tổ hợp A00 (Toán-Lý-Hóa) = 23.0 điểm.\n   - Ra trường làm kỹ sư tại nhà máy hóa chất, dầu khí.\n   - Petrovietnam, Vinachem đang cần nhân lực này.\n\n3. **Công nghệ Thực phẩm (HaUI / HUAF)**\n   - Hóa 8.0 là nền tảng vững. Ra trường làm QA/QC công ty thực phẩm.\n\n💡 **Lời khuyên:** Tài nên chú trọng tổ hợp **A00 (Toán-Lý-Hóa)** – đây là tổ hợp mạnh nhất của em, mở ra nhiều lựa chọn ngành kỹ thuật và kinh tế!"
      }
    ]
  }
]
},
    's040': {
    "scores": {
        "math": 7,
        "literature": 8.5
    },
    electives: [{ name: 'Hóa học', score: 7.5 }, { name: 'Sinh học', score: 8 }],
    "holland": [
        "Nghệ thuật",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích viết lách, giao tiếp tốt bằng tiếng Anh, hay xem phim Hollywood không cần phụ đề.",
    "consultations": [
  {
    "id": "c_s040_1",
    "timestamp": "2026-04-15T08:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em Toán 7.0, Văn 8.5, Hóa 7.5, Sinh 8.0. Em thích viết lách và giao tiếp. Em có thể làm gì để phát huy điểm mạnh?"
      },
      {
        "role": "ai",
        "content": "## ✨ Hà Thảo Uyên – Tài năng Giao tiếp & Sáng tạo!\n\nToán 7.0 | Văn 8.5 | Hóa 7.5 | Sinh 8.0 → **Tổng 31.0 điểm** 💡\n\nVăn 8.5 kết hợp Sinh 8.0 cho thấy em có tư duy **nhân văn + khoa học** – rất hiếm!\n\n### 🎓 Gợi ý ngành nghề:\n\n1. **Y học (ĐH Y Hà Nội / ĐH Y Dược TP.HCM)**\n   - Tổ hợp B00 (Toán-Hóa-Sinh) = 22.5 điểm. Cần đẩy thêm để vào Y.\n   - Bác sĩ là nghề ổn định và được xã hội trân trọng.\n\n2. **Dược học (ĐH Dược HN)**\n   - B00 = 22.5 điểm – phù hợp hơn với điểm của em.\n   - Kết hợp Hóa + Sinh là nền tảng lý tưởng.\n\n3. **Truyền thông Sức khỏe / Báo Y tế**\n   - Kết hợp Văn 8.5 với kiến thức Y Sinh.\n   - Viết bài y tế, làm content cho bệnh viện, thương hiệu dược.\n   - Hướng đi sáng tạo và rất tiềm năng.\n\n💡 **Lời khuyên:** Em có Văn 8.5 cực mạnh – ngoài việc học ngành Y Dược, em có thể song song xây dựng kênh blog/TikTok về sức khỏe ngay từ bây giờ!"
      }
    ]
  }
]
},
    'd10006': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10007': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10008': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10010': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10011': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10012': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10013': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10015': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10016': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10017': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10018': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10019': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10020': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10021': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10022': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10023': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10024': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10025': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10026': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10027': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10028': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10029': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10030': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10031': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10032': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10033': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10034': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10036': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10037': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd10038': {
    "scores": {
        "math": 4,
        "literature": 4.5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 4.5
        },
        {
            "name": "Địa lí",
            "score": 5
        }
    ],
    "holland": [
        "Thực tế",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích làm các việc chân tay, hỗ trợ công việc gia đình, học nghề thực tế.",
    "consultations": []
},
    'd11002': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11003': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11004': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11005': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11006': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11007': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11008': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11009': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11010': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11011': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11012': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11013': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11014': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11015': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11016': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11017': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11018': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11019': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11020': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11021': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11022': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11023': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11024': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11027': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11028': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11029': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11030': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11031': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11032': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11033': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11034': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11035': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11036': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11037': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    'd11038': {
    "scores": {
        "math": 4.5,
        "literature": 5
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 5
        },
        {
            "name": "Địa lí",
            "score": 5.5
        }
    ],
    "holland": [
        "Quản lý",
        "Thực tế",
        "Xã hội"
    ],
    "hobbies": "Nhanh nhẹn, thích buôn bán kinh doanh nhỏ, đi làm thêm.",
    "consultations": []
},
    's036': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Vật lý",
            "score": 7
        },
        {
            "name": "Hóa học",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": [
  {
    "id": "c_s036_1",
    "timestamp": "2026-04-15T09:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em muốn biết với điểm và tổ hợp môn của mình thì phù hợp với ngành nghề nào?"
      },
      {
        "role": "ai",
        "content": "## ✨ Nguyễn Thị Cẩm Tú – Hành trình Khoa học!\n\nVới tổ hợp Toán-Văn-Lý-Hóa, em có nhiều lựa chọn trong khối kỹ thuật và khoa học tự nhiên.\n\n### 🎓 Gợi ý ngành nghề:\n\n1. **Kỹ thuật Hóa học / Hóa dược (HUST)**\n   - Phù hợp với tổ hợp A00 (Toán-Lý-Hóa).\n   - Ngành đang phát triển mạnh trong lĩnh vực sản xuất.\n\n2. **Công nghệ Vật liệu (ĐH Khoa học Tự nhiên)**\n   - Nghiên cứu vật liệu mới, ứng dụng trong công nghiệp.\n\n3. **Kỹ thuật Môi trường**\n   - Kết hợp Lý + Hóa để giải quyết bài toán ô nhiễm.\n\n💡 **Lời khuyên:** Hãy xác định môn Toán, Lý, Hóa thật vững để xét tuyển khối A00 tốt nhất!"
      }
    ]
  }
]
},
    's037': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Vật lý",
            "score": 7
        },
        {
            "name": "Hóa học",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": [
  {
    "id": "c_s037_1",
    "timestamp": "2026-04-15T10:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học Lý Hóa, thích kỹ thuật. Em muốn tìm ngành học phù hợp."
      },
      {
        "role": "ai",
        "content": "## ⚙️ Nguyễn Hữu Tuấn – Kỹ sư tương lai!\n\nVới tổ hợp Toán-Lý-Hóa (A00), em có lợi thế lớn trong các ngành kỹ thuật.\n\n### 🎓 Gợi ý ngành nghề:\n\n1. **Kỹ thuật Điện – Điện tử (HUST / PTIT)**\n   - Nhu cầu nhân lực rất cao trong thời đại số.\n   - Lương kỹ sư điện: 15-35 triệu/tháng.\n\n2. **Kỹ thuật Cơ khí (ĐH Bách Khoa)**\n   - Ngành trụ cột của nền công nghiệp.\n   - Làm việc tại các nhà máy, khu công nghiệp.\n\n3. **Kỹ thuật Hóa học (HUST)**\n   - Kết hợp tốt Lý + Hóa.\n\n💡 **Lời khuyên:** Tập trung ôn tổ hợp A00 (Toán-Lý-Hóa) để xét tuyển các ngành kỹ thuật uy tín!"
      }
    ]
  }
]
},
    's038': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Vật lý",
            "score": 7
        },
        {
            "name": "Hóa học",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": [
  {
    "id": "c_s038_1",
    "timestamp": "2026-04-15T11:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học khối tự nhiên, Lý Hóa. Em thích làm việc với máy móc và công nghệ."
      },
      {
        "role": "ai",
        "content": "## 🔧 Nguyễn Hoàng Tuấn – Đam mê Công nghệ!\n\nVới nền tảng Toán-Lý-Hóa và đam mê máy móc, em có con đường sự nghiệp rõ ràng.\n\n### 🎓 Gợi ý ngành nghề:\n\n1. **Kỹ thuật Cơ điện tử (Mechatronics)**\n   - Kết hợp Cơ khí + Điện + Điều khiển tự động.\n   - Xu hướng công nghiệp 4.0 cần rất nhiều.\n   - Lương 18-40 triệu/tháng.\n\n2. **Điện – Điện tử (PTIT / HAUI)**\n   - Sửa chữa, bảo trì thiết bị điện tử.\n   - Nhiều cơ hội làm việc tại Nhật, Hàn Quốc.\n\n3. **Tự động hóa (HUST)**\n   - Lập trình robot, dây chuyền sản xuất tự động.\n\n💡 **Lời khuyên:** Cả 3 ngành đều dùng tổ hợp A00. Em cần đẩy điểm Toán là chìa khóa!"
      }
    ]
  }
]
},
    's039': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Hóa học",
            "score": 7
        },
        {
            "name": "Sinh học",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": [
  {
    "id": "c_s039_1",
    "timestamp": "2026-04-15T14:00:00",
    "messages": [
      {
        "role": "user",
        "content": "Em học Hóa học và Sinh học. Em thích ngành y tế hoặc dược phẩm."
      },
      {
        "role": "ai",
        "content": "## 💉 Phan Bá Tùng – Con đường Y Dược!\n\nVới tổ hợp Hóa-Sinh cùng Toán-Văn, em phù hợp với nhóm ngành Y-Dược-Sức khỏe.\n\n### 🎓 Gợi ý ngành nghề:\n\n1. **Dược học (ĐH Dược HN / ĐH Y Dược TP.HCM)**\n   - Xét tổ hợp B00 (Toán-Hóa-Sinh). Điểm chuẩn 26-28 điểm.\n   - Dược sĩ bệnh viện, nhà thuốc, công ty Dược đa quốc gia.\n   - Lương ổn định 15-25 triệu ngay từ năm đầu.\n\n2. **Điều dưỡng / Y sĩ (CĐ/ĐH Y tế)**\n   - Nhu cầu rất cao, đặc biệt sau COVID-19.\n   - Cơ hội xuất khẩu lao động Y tế sang Nhật, Đức.\n\n3. **Công nghệ Sinh học (HUST / VNU)**\n   - Nghiên cứu vaccine, thuốc sinh học, thực phẩm chức năng.\n\n💡 **Lời khuyên:** Tập trung ôn tổ hợp B00 (Toán-Hóa-Sinh). Đây là con đường phù hợp nhất với em!"
      }
    ]
  }
]
},
    's041': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 7
        },
        {
            "name": "Địa lí",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": []
},
    's042': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 7
        },
        {
            "name": "Địa lí",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": []
},
    's043': {
    "scores": {
        "math": 6.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Lịch sử",
            "score": 7
        },
        {
            "name": "Địa lí",
            "score": 7
        }
    ],
    "holland": [
        "Xã hội",
        "Thực tế",
        "Nghệ thuật"
    ],
    "hobbies": "Thích chụp ảnh, làm video, làm nội dung truyền thông cho trường học.",
    "consultations": []
},
    's033': {
    "scores": {
        "math": 7.5,
        "literature": 8
    },
    "electives": [
        {
            "name": "Vật lý",
            "score": 7
        },
        {
            "name": "Tiếng Anh",
            "score": 8.5
        }
    ],
    "holland": [
        "Quản lý",
        "Xã hội",
        "Thực tế"
    ],
    "hobbies": "Thích tổ chức sự kiện, hay làm nhóm trưởng các dự án trên lớp.",
    "consultations": []
},
    's040': {
    "scores": {
        "math": 7,
        "literature": 8.5
    },
    "electives": [
        {
            "name": "Vật lý",
            "score": 6.5
        },
        {
            "name": "Tiếng Anh",
            "score": 9
        }
    ],
    "holland": [
        "Nghệ thuật",
        "Xã hội",
        "Nghiệp vụ"
    ],
    "hobbies": "Thích viết lách, giao tiếp tốt bằng tiếng Anh, hay xem phim Hollywood không cần phụ đề.",
    "consultations": []
},
  }
};

const getDB = () => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
    return JSON.parse(JSON.stringify(defaultDB));
  } catch {
    return JSON.parse(JSON.stringify(defaultDB));
  }
};

const saveDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Xóa tất cả key cũ của SmartCareer, chỉ giữ key hiện tại
Object.keys(localStorage)
  .filter(k => k.startsWith('smartcareer_db') && k !== DB_KEY)
  .forEach(k => localStorage.removeItem(k));

// Khởi tạo DB với dữ liệu mới nếu chưa có
if (!localStorage.getItem(DB_KEY)) {
  saveDB(JSON.parse(JSON.stringify(defaultDB)));
}

export const dbService = {
  // XÁC THỰC
  login: (email, password) => {
    const db = getDB();
    return db.users.find(u => u.email === email && u.password === password) || null;
  },

  register: (userData) => {
    const db = getDB();
    if (db.users.find(u => u.email === userData.email)) return { error: 'Email đã tồn tại!' };
    if (userData.role === 'student' && userData.classCode) {
      const cls = db.classes.find(c => c.code === userData.classCode);
      if (!cls) return { error: 'Mã lớp không tồn tại! Vui lòng liên hệ giáo viên.' };
      const newUser = { ...userData, id: 'u_' + Date.now(), classId: cls.id };
      delete newUser.classCode;
      db.users.push(newUser);
      cls.studentIds.push(newUser.id);
      saveDB(db);
      return { user: newUser };
    }
    const newUser = { ...userData, id: 'u_' + Date.now() };
    db.users.push(newUser);
    saveDB(db);
    return { user: newUser };
  },

  // LỚP HỌC
  getClassesByTeacher: (teacherId) => {
    const db = getDB();
    return db.classes.filter(c =>
      (c.teacherIds && c.teacherIds.includes(teacherId)) || c.teacherId === teacherId
    );
  },

  addClass: (teacherId, name) => {
    const db = getDB();
    const code = name.replace(/\s/g, '').toUpperCase() + '-' + Date.now().toString().slice(-4);
    const cls = { id: 'cls_' + Date.now(), name, teacherIds: [teacherId], code, studentIds: [] };
    db.classes.push(cls);
    saveDB(db);
    return cls;
  },

  deleteClass: (classId) => {
    const db = getDB();
    db.classes = db.classes.filter(c => c.id !== classId);
    db.users = db.users.map(u => u.classId === classId ? { ...u, classId: null } : u);
    saveDB(db);
  },

  updateClass: (classId, name) => {
    const db = getDB();
    const cls = db.classes.find(c => c.id === classId);
    if (cls) { cls.name = name; saveDB(db); }
  },

  // HỌC SINH
  getStudentsByClass: (classId) => {
    const db = getDB();
    const cls = db.classes.find(c => c.id === classId);
    if (!cls) return [];
    return cls.studentIds.map(sid => db.users.find(u => u.id === sid)).filter(Boolean);
  },

  addStudentToClass: (classId, studentData) => {
    const db = getDB();
    if (db.users.find(u => u.email === studentData.email)) return { error: 'Email đã tồn tại!' };
    const newStudent = { ...studentData, id: 'u_' + Date.now(), role: 'student', classId };
    const cls = db.classes.find(c => c.id === classId);
    if (!cls) return { error: 'Lớp không tồn tại!' };
    db.users.push(newStudent);
    cls.studentIds.push(newStudent.id);
    saveDB(db);
    return { user: newStudent };
  },

  removeStudentFromClass: (classId, studentId) => {
    const db = getDB();
    const cls = db.classes.find(c => c.id === classId);
    if (cls) {
      cls.studentIds = cls.studentIds.filter(sid => sid !== studentId);
      const user = db.users.find(u => u.id === studentId);
      if (user) user.classId = null;
      saveDB(db);
    }
  },

  getAllStudentsByTeacher: (teacherId) => {
    const db = getDB();
    const classes = db.classes.filter(c =>
      (c.teacherIds && c.teacherIds.includes(teacherId)) || c.teacherId === teacherId
    );
    const studentIds = classes.flatMap(c => c.studentIds);
    return studentIds.map(sid => {
      const u = db.users.find(u => u.id === sid);
      const cls = classes.find(c => c.studentIds.includes(sid));
      return u ? { ...u, className: cls?.name } : null;
    }).filter(Boolean);
  },

  // HỒ SƠ HỌC SINH
  getProfile: (userId) => {
    const db = getDB();
    return db.studentProfiles[userId] || null;
  },

  saveProfile: (userId, profile) => {
    const db = getDB();
    if (!db.studentProfiles[userId]) {
      db.studentProfiles[userId] = {};
    }
    db.studentProfiles[userId] = { ...db.studentProfiles[userId], ...profile };
    saveDB(db);
  },

  getClassById: (classId) => {
    const db = getDB();
    return db.classes.find(c => c.id === classId) || null;
  },

  getUserById: (userId) => {
    const db = getDB();
    return db.users.find(u => u.id === userId) || null;
  },

  // LỊCH SỬ TƯ VẤN AI
  getConsultedStudentsByClass: (classId) => {
    const db = getDB();
    const cls = db.classes.find(c => c.id === classId);
    if (!cls) return [];
    return cls.studentIds
      .map(sid => {
        const user = db.users.find(u => u.id === sid);
        const profile = db.studentProfiles[sid];
        if (!user || !profile || !profile.consultations?.length) return null;
        return { ...user, profile, lastConsultation: profile.consultations[profile.consultations.length - 1] };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.lastConsultation.timestamp) - new Date(a.lastConsultation.timestamp));
  },

  saveConsultation: (userId, session) => {
    const db = getDB();
    if (!db.studentProfiles[userId]) db.studentProfiles[userId] = { consultations: [] };
    if (!db.studentProfiles[userId].consultations) db.studentProfiles[userId].consultations = [];
    db.studentProfiles[userId].consultations.push(session);
    saveDB(db);
  },

  clearConsultationHistory: (userId) => {
    const db = getDB();
    if (db.studentProfiles[userId] && db.studentProfiles[userId].consultations) {
      db.studentProfiles[userId].consultations = [];
      saveDB(db);
    }
  },

  getAllConsultedStudentsByTeacher: (teacherId) => {
    const db = getDB();
    const classes = db.classes.filter(c =>
      (c.teacherIds && c.teacherIds.includes(teacherId)) || c.teacherId === teacherId
    );
    return classes.map(cls => ({
      classId: cls.id,
      className: cls.name,
      students: cls.studentIds
        .map(sid => {
          const user = db.users.find(u => u.id === sid);
          const profile = db.studentProfiles[sid];
          if (!user || !profile || !profile.consultations?.length) return null;
          return { ...user, profile, lastConsultation: profile.consultations[profile.consultations.length - 1] };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.lastConsultation.timestamp) - new Date(a.lastConsultation.timestamp))
    }));
  },
};