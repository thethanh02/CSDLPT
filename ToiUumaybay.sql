SET STATISTICS TIME ON;
-- Thống kê các chuyến bay có chỗ ngồi còn lại < 10
-- Tập trung
SELECT CB.MaCB, MB.TenMB, CB.SanBayXuatPhat, CB.ThoiGianBatDau, CB.ThoiGianKetThuc
FROM ChuyenBay AS CB, MayBay AS MB
WHERE CB.SLChoNgoiConLai < 10 AND CB.MaMB = MB.MaMB

-- Phân tán trước tối ưu
WITH CB AS (
	SELECT QNCB.MaCB, DNCB.MaMB, DNCB.SanBayXuatPhat, HNCB.SanBayDich, SGCB.ThoiGianBatDau,  SGCB.ThoiGianKetThuc, QNCB.SLChoNgoiConLai
	FROM ChuyenBay AS QNCB,
		SAIGON.CSDLPT.dbo.ChuyenBay AS SGCB,
		DANANG.CSDLPT.dbo.ChuyenBay AS DNCB,
		HANOI.CSDLPT.dbo.ChuyenBay AS HNCB
	WHERE QNCB.MaCB = SGCB.MaCB 
		AND QNCB.MaCB = DNCB.MaCB 
		AND QNCB.MaCB = HNCB.MaCB
)
SELECT CB.MaCB, MB.TenMB, CB.SanBayXuatPhat, CB.ThoiGianBatDau, CB.ThoiGianKetThuc
FROM CB, MayBay AS MB
WHERE CB.SLChoNgoiConLai < 10 AND CB.MaMB = MB.MaMB
-- Phân tán sau tối ưu
SELECT CB.MaCB, T3.TenMB, T2.SanBayXuatPhat, T1.ThoiGianBatDau, T1.ThoiGianKetThuc
FROM (SELECT MaCB FROM ChuyenBay WHERE SLChoNgoiConLai < 10) CB
        INNER JOIN (SELECT MaCB, ThoiGianBatDau, ThoiGianKetThuc FROM SAIGON.CSDLPT.dbo.ChuyenBay) AS T1
        ON CB.MaCB = T1.MaCB
        INNER JOIN (SELECT MaCB, MaMB, SanBayXuatPhat FROM DANANG.CSDLPT.dbo.ChuyenBay) AS T2
        ON CB.MaCB = T2.MaCB
		INNER JOIN (SELECT MaMB, TenMB FROM MayBay) AS T3
        ON T2.MaMB = T3.MaMB

-------------------------------------------------------------
-- Xem danh sách khách hàng mua vé nhiều nhất tại 1 chi nhánh
-- Tập trung
DECLARE @dc nvarchar(30);
SET @dc = N'Đà Nẵng';
SELECT TOP 1 WITH TIES *
FROM (
	SELECT KH.MaKH, KH.TenKH, COUNT (*) AS Tickets
	FROM KhachHang AS KH, Ve, NhanVien AS NV, ChiNhanh AS CN
	WHERE KH.MaKH = Ve.MaKH
		AND Ve.MaNV = NV.MaNV
		AND CN.MaCN = NV.MaCN
		AND CN.DiaChi = @dc
	GROUP BY KH.MaKH, KH.TenKH) AS A
ORDER BY Tickets DESC

-- Phân tán trước tối ưu
DECLARE @dc nvarchar(30);
SET @dc = N'Đà Nẵng';
SELECT TOP 1 WITH TIES * 
FROM (
	SELECT KH.MaKH, KH.TenKH, COUNT (*) AS Tickets
	FROM KhachHang KH 
			INNER JOIN
				(SELECT * FROM Ve
				UNION
				SELECT * FROM DANANG.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM HANOI.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM NGHEAN.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM HUE.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM KHANHHOA.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM SAIGON.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM KIENGIANG.CSDLPT.dbo.Ve
				UNION
				SELECT * FROM GIALAI.CSDLPT.dbo.Ve) AS V
			ON KH.MaKH = V.MaKH
			INNER JOIN
				(SELECT * FROM NhanVien
				UNION
				SELECT * FROM DANANG.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM HANOI.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM NGHEAN.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM HUE.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM KHANHHOA.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM SAIGON.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM KIENGIANG.CSDLPT.dbo.NhanVien
				UNION
				SELECT * FROM GIALAI.CSDLPT.dbo.NhanVien) AS NV
			ON V.MaNV = NV.MaNV
			INNER JOIN
				(SELECT * FROM ChiNhanh
				UNION
				SELECT * FROM DANANG.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM HANOI.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM NGHEAN.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM HUE.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM KHANHHOA.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM SAIGON.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM KIENGIANG.CSDLPT.dbo.ChiNhanh
				UNION
				SELECT * FROM GIALAI.CSDLPT.dbo.ChiNhanh) AS CN
			ON CN.MaCN = NV.MaCN
	WHERE CN.DiaChi = @dc
	GROUP BY KH.MaKH, KH.TenKH
	) AS A
ORDER BY Tickets DESC

-- Phân tán sau tối ưu
;WITH TAM AS (
	SELECT KH.MaKH, KH.TenKH, COUNT (*) AS Tickets
	FROM KhachHang KH 
			INNER JOIN(SELECT MaV, MaNV, MaKH FROM DANANG.CSDLPT.dbo.Ve) V
			ON KH.MaKH = V.MaKH
	GROUP BY KH.MaKH, KH.TenKH
)
SELECT TOP 1 WITH TIES *
FROM TAM	
ORDER BY Tickets DESC

