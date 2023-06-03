-- Trigger sdt
DROP TRIGGER trigger_sdt

CREATE TRIGGER trigger_sdt
ON KhachHang
AFTER INSERT, UPDATE
AS
BEGIN
	DECLARE @phone_number VARCHAR(30) = (SELECT Sdt FROM inserted);
	-- 10 số: số đầu là 0, tiếp theo là 1|2|3|5|7|8|9, cuối cùng là 8 số tự nhiên
	IF @phone_number NOT LIKE '0[1-3|5|7-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
	BEGIN
		RAISERROR (N'Số điện thoại phải là định dạng của Việt Nam', 16, 1);
		-- ROLLBACK
	END
END

INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
('KH054', N'Tạ Thị B', '2000-08-10', N'Kim Bảng', '0944493559', 'N1993526')

-- Trigger ktra số hộ chiếu
DROP TRIGGER trigger_shc

CREATE TRIGGER trigger_shc
ON KhachHang
AFTER INSERT, UPDATE
AS
BEGIN
	DECLARE @shc NVARCHAR(30) = (SELECT SoHoChieu FROM inserted);
	-- 8 ký tự: Chữ cái đầu in hoa, 7 ký tự tiếp theo là số tự nhiên
	IF @shc NOT LIKE '[A-Z][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
	BEGIN
		RAISERROR (N'Số hộ chiếu không hợp lệ', 16, 1);
		ROLLBACK
	END
END

INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
('KH054', N'Tạ Thị A', '1995-08-10', N'Kim Bảng', '0955754173', 'N1993521')

-- Trigger tuổi
DROP TRIGGER trigger_age

CREATE TRIGGER trigger_age
ON KhachHang
AFTER INSERT, UPDATE
AS
BEGIN
	DECLARE @ns DATE = (SELECT NgaySinh FROM inserted);
	IF YEAR(GETDATE()) - YEAR(@ns) < 12 
	BEGIN
		RAISERROR (N'Tuổi khách hàng ít phất phải >= 12', 16, 1);
		ROLLBACK
	END
END

INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
('KH054', N'Tạ Thị A', '2011-08-10', N'Kim Bảng', '0955754173', 'N1993526')

-- Trigger khách hàng đã tồn tại
DROP TRIGGER trigger_exist_kh

CREATE TRIGGER trigger_exist_kh
ON KhachHang
AFTER INSERT, UPDATE
AS
BEGIN
	DECLARE @ten NVARCHAR(30) = (SELECT TenKH FROM inserted);
	DECLARE @ns DATE = (SELECT NgaySinh FROM inserted);
	DECLARE @sdt VARCHAR(30) = (SELECT Sdt FROM inserted);
	DECLARE @count INT = (SELECT COUNT(*) FROM KhachHang WHERE TenKH = @ten AND NgaySinh = @ns AND Sdt = @sdt);
	IF @count >= 2 
	BEGIN
		RAISERROR (N'Đã tồn tại khách hàng', 16, 1);
		-- ROLLBACK
	END
END

INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
('KH054', N'Tạ Thị A', '1995-08-10', N'Kim Bảng', '0955754173', 'N1993526')

DELETE FROM KhachHang WHERE MaKH = 'KH054'

-- Transaction
BEGIN TRANSACTION themKH
BEGIN TRY
	INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
	('KH054', N'Tạ Thị A', '1995-08-10', N'Kim Bảng', '0955754173', 'N1993526')
	COMMIT TRANSACTION themKH
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION themKH
END CATCH

----------------------------------------------------------

-- Trigger chỗ ngồi còn lại của chuyến bay
DROP TRIGGER trigger_slchongoi

CREATE TRIGGER trigger_slchongoi
ON ChuyenBay
AFTER UPDATE
AS
BEGIN
	DECLARE @slCho VARCHAR(30) = (SELECT SLChoNgoiConLai FROM inserted);
	IF @slCho < 0 
	BEGIN
		RAISERROR (N'Chuyến bay này đã hết chỗ', 16, 1);
		-- ROLLBACK
	END
END

SELECT * FROM VE
SELECT MaCB, SLChoNgoiConLai FROM ChuyenBay
UPDATE ChuyenBay SET SLChoNgoiConLai = SLChoNgoiConLai + 1 WHERE MaCB = 'CB0001'

BEGIN TRANSACTION updateVe
BEGIN TRY
	DECLARE @MaCB VARCHAR(30) = 'CB0010'
	INSERT INTO Ve(MaV, MaKH, MaCB, MaNV, GiaVe) values
	('VB0007', 'KH015', @MaCB, 'NV04001', 2300000)
	UPDATE ChuyenBay SET SLChoNgoiConLai = SLChoNgoiConLai - 1 WHERE MaCB = @MaCB
	COMMIT TRANSACTION updateVe
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION updateVe
END CATCH