/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CumRap` (
  `ma_cum_rap` varchar(255) NOT NULL,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatVe` (
  `tai_khoan` varchar(255) NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int NOT NULL,
  `ngay_dat` datetime NOT NULL,
  `gia_ve` int NOT NULL,
  PRIMARY KEY (`tai_khoan`,`ma_lich_chieu`,`ma_ghe`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`tai_khoan`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `daDat` tinyint(1) DEFAULT NULL,
  `taiKhoanNguoiDat` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` varchar(255) NOT NULL,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_rap` (`ma_rap`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `tai_khoan` varchar(255) NOT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(1000) DEFAULT NULL,
  `ngay_khoi_chieu` datetime DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` varchar(255) DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 1, 'Banner1.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 2, 'Banner2.jpg');


INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
('bhd-star-cineplex-3-2', 'BHD Star Cineplex - 3/2', 'L5-Vincom 3/2, 3C Đường 3/2, Q.10', 'BHDStar');
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
('bhd-star-cineplex-bitexco', 'BHD Star Cineplex - Bitexco', 'L3-Bitexco Icon 68, 2 Hải Triều, Q.1', 'BHDStar');
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
('cgv-aeon-binh-tan', 'CGV - Aeon Bình Tân', 'TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân', 'CGV');
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
('cgv-crescent-mall', 'CGV - Crescent Mall', 'Lầu 5, Crescent Mall, Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng, Q. 7', 'CGV'),
('glx-huynh-tan-phat', 'GLX - Huỳnh Tấn Phát', '1362 Huỳnh Tấn Phát, KP1, Phú Mỹ, Q. 7', 'Galaxy'),
('glx-nguyen-van-qua', 'GLX - Nguyễn Văn Quá', '119B Nguyễn Văn Quá, Đông Hưng Thuận, Q.12, TPHCM', 'Galaxy');

INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ngay_dat`, `gia_ve`) VALUES
('test1', 1, 1, '2024-09-30 17:00:00', 0);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ngay_dat`, `gia_ve`) VALUES
('test2', 2, 2, '2024-09-30 17:00:00', 0);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ngay_dat`, `gia_ve`) VALUES
('test6', 1, 1, '2023-10-30 14:00:00', 0);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ngay_dat`, `gia_ve`) VALUES
('test6', 1, 2, '2023-09-30 17:00:00', 0),
('test6', 1, 3, '2024-01-16 20:00:00', 0),
('test6', 2, 8, '2024-01-16 07:28:32', 0),
('test6', 2, 9, '2024-01-16 07:28:32', 0),
('test6', 2, 10, '2024-01-16 07:28:32', 0),
('test6', 4, 11, '2024-01-16 09:43:00', 70000),
('test6', 4, 12, '2024-01-16 09:43:00', 70000),
('test6', 4, 13, '2024-01-16 09:43:00', 70000);

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `daDat`, `taiKhoanNguoiDat`, `ma_rap`) VALUES
(1, '1', 'thuong', 1, 'test6', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `daDat`, `taiKhoanNguoiDat`, `ma_rap`) VALUES
(2, '2', 'vip', 1, 'test6', 2);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `daDat`, `taiKhoanNguoiDat`, `ma_rap`) VALUES
(3, '3', 'thuong', 1, 'test6', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `daDat`, `taiKhoanNguoiDat`, `ma_rap`) VALUES
(4, '2', 'thuong', 0, 'test5', 1),
(8, '1', 'thuong', 1, 'test6', 3),
(9, '2', 'thuong', 1, 'test6', 3),
(10, '3', 'thuong', 1, 'test6', 3),
(11, '1', 'thuong', 1, 'test6', 4),
(12, '2', 'thuong', 1, 'test6', 4),
(13, '3', 'thuong', 1, 'test6', 4);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
('BHDStar', 'BHD Star Cineplex', 'Logo1.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
('CGV', 'CGV', 'Logo2.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
('Galaxy', 'Galaxy Cinema', 'Logo3.jpg');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2023-01-01 12:00:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 2, 2, '2023-02-01 14:00:00', 120000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 2, 1, '2023-09-01 18:00:00', 80000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 4, 3, '2024-09-30 17:00:00', 70000),
(5, 3, 2, '2024-09-30 17:00:00', 70000);

INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
('test1', 'User 1', 'user1@example.com', '123456789', 'password1', 'user');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
('test2', 'User 2', 'user2@example.com', '987654321', 'password2', 'admin');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
('test3', 'duy', 'test3@gmail.com', '0123456789', '$2b$10$g1uPKJqDfZ0mvlzeOlXsbep1T8Y82l9uZRLoDtlKYYrsQEHWTPWj.', 'user');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
('test5', 'duy2', 'test5@gmail.com', '0123457676', '$2b$10$qDvbRQzG24CTckaYjhAPTeINek00fDZ.PUAmew4.qJGnfWgcb4bvC', 'user'),
('test6', 'Duy Nguyen', 'test@gmail.com', '012345678910', '$2b$10$nmuzTqgpK7Yio30O1HDBQ..RjJiBaDjuZhSV5dqmQDkMoWtmLUUJ2', 'admin');

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'The Creator', 'https://www.youtube.com/watch?v=kTMpVh0eauk', 'Image1.jpg', 'The movie is set in a future where humanity is in a battle against artificial intelligence (AI). Joshua (John David Washington) is a former operative hired to assassinate \"The Creator,\" considered the mastermind behind the AI, who has developed a mysterious and powerful weapon capable of ending the war and wiping out the human race.', '2023-12-01 00:00:00', 4, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'Oppenheimer', 'https://www.youtube.com/watch?v=UdFeVo0cODs&t=8s', 'Image2.jpg', 'With J. Robert Oppenheimer as the central character, a theoretical physicist leading the Los Alamos laboratory during World War II. He played a crucial role in the Manhattan Project, pioneering the mission to develop nuclear weapons and is regarded as one of the \"fathers of the atomic bomb.\" ', '2023-02-01 00:00:00', 3, 0, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'Aquaman and the Lost Kingdom', 'https://www.youtube.com/watch?v=PoF4B_xPVlg', 'Image3.jpg', 'Đạo diễn James Wan và Jason Momoa trong vai Aquaman—cùng với Patrick Wilson, Amber Heard, Yahya Abdul-Mateen II và Nicole Kidman sẽ trở lại trong phần tiếp theo của bộ phim DC có doanh thu cao nhất mọi thời đại “Aquaman Và Vương Quốc Thất Lạc (tựa gốc: Aquaman and the Lost Kingdom)”.', '2023-05-01 12:00:00', 5, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'test', 'youtube.com', 'meo.jpg', 'ai biet', '2024-04-30 17:00:00', 5, 1, 1, 1),
(5, 'test1', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test1', '2024-01-31 17:00:00', 5, 1, 1, 1),
(6, 'test1', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test1', '2024-01-31 17:00:00', 0, 1, 1, 1),
(7, '', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', '1234', '2024-01-31 17:00:00', 0, 1, 1, 1),
(8, 'test2', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test2', '2024-01-31 17:00:00', 3, 1, 1, 1),
(9, 'test3', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test3', '2024-01-31 17:00:00', 3, 1, 1, 1),
(10, 'test4', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test4', '2024-01-31 17:00:00', 3, 1, 1, 1),
(11, 'test5', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test5', '2024-01-31 17:00:00', 3, 1, 1, 1),
(12, 'test5', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test5', '2024-01-31 17:00:00', 3, 1, 1, 1),
(13, 'test6', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test6', '2024-01-31 17:00:00', 3, 1, 1, 1),
(14, 'test6', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test6', '2024-01-31 17:00:00', 3, 1, 1, 1),
(15, 'test6', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test6', '2024-01-31 17:00:00', 3, 1, 1, 1),
(16, 'test6', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test6', '2024-01-31 17:00:00', 3, 0, 0, 1),
(17, 'test6', 'youtube.com', 'Wallpaper-Minimalist-016.jpg', 'test6', '2024-01-31 17:00:00', 3, 1, 1, 1),
(27, 'The Creator', 'youtube.com/123asd\n', 'logoD.png', 'phim hay quá', '2024-01-16 17:00:00', 4, 1, 0, 1);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`, `ma_phim`) VALUES
(1, 'Rap 1', 'bhd-star-cineplex-3-2', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`, `ma_phim`) VALUES
(2, 'Rap 2', 'bhd-star-cineplex-3-2', 2);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`, `ma_phim`) VALUES
(3, 'Rap 3', 'bhd-star-cineplex-3-2', 3);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`, `ma_phim`) VALUES
(4, 'Rap 1', 'cgv-aeon-binh-tan', 4),
(5, 'Rap 2', 'cgv-aeon-binh-tan', 5),
(6, 'Rap 3', 'cgv-aeon-binh-tan', 6),
(7, 'Rap 1', 'glx-nguyen-van-qua', 7),
(8, 'Rap 2', 'glx-nguyen-van-qua', 8),
(9, 'Rap 3', 'glx-nguyen-van-qua', 9);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;