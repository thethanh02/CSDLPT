package com.ptit.csdlpt;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CsdlptDAO {
	
	private static final String SELECT_ALL_CB ="SELECT MaCB, SLChoNgoiConLai FROM ChuyenBay";
	private static final String SELECT_ALL_NV = "SELECT * FROM NhanVien";
	private static final String SELECT_ALL_KH ="SELECT * FROM KhachHang";
	private static final String INSERT_VE =
			"""
			INSERT INTO Ve(MaV, MaKH, MaCB, MaNV, GiaVe) values
			(?, ?, ?, ?, ?)
			""";
	private static final String UPDATE_CB =
			"""
			UPDATE ChuyenBay SET SLChoNgoiConLai = SLChoNgoiConLai - 1 WHERE MaCB = ?
			""";
	private static final String INSERT_KH =
			"""
			INSERT INTO KhachHang(MaKH, TenKH, NgaySinh, DiaChi, Sdt, SoHoChieu) VALUES
			(?, ?, ?, ?, ?, ?)		
			""";
	private static final String UNGDUNG1 = 
			"""
			SELECT CB.MaCB, T3.TenMB, T2.SanBayXuatPhat, T1.ThoiGianBatDau, T1.ThoiGianKetThuc
			FROM (SELECT MaCB FROM ChuyenBay WHERE SLChoNgoiConLai < 10) CB
			        INNER JOIN (SELECT MaCB, ThoiGianBatDau, ThoiGianKetThuc FROM SAIGON.CSDLPT.dbo.ChuyenBay) AS T1
			        ON CB.MaCB = T1.MaCB
			        INNER JOIN (SELECT MaCB, MaMB, SanBayXuatPhat FROM DANANG.CSDLPT.dbo.ChuyenBay) AS T2
			        ON CB.MaCB = T2.MaCB
					INNER JOIN (SELECT MaMB, TenMB FROM MayBay) AS T3
			        ON T2.MaMB = T3.MaMB
	        """;
	private static final String UNGDUNG21 = 
			"""
			WITH TAM AS (
				SELECT KH.MaKH, KH.TenKH, COUNT (*) AS Tickets
				FROM KhachHang KH 
						INNER JOIN(SELECT MaV, MaNV, MaKH FROM
	        """;
	private static final String UNGDUNG22 = 
			"""
			CSDLPT.dbo.Ve) V
						ON KH.MaKH = V.MaKH
				GROUP BY KH.MaKH, KH.TenKH
			)
			SELECT TOP 1 WITH TIES *
			FROM TAM
			ORDER BY Tickets DESC
	        """;

	public List<NhanVien> getAllNhanVien() {
		List<NhanVien> listNV = new ArrayList<>();

		try {
			Connection connection = DAO.getConInstance();
			connection.setAutoCommit(true);
			PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_NV);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				listNV.add(new NhanVien(rs.getString("maNV"), rs.getString("tenNV"), rs.getString("maCN"), rs.getString("sdt"), rs.getString("chucVu"), rs.getDate("ngaySinh")));
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return listNV;
	}
	
	public List<ChuyenBay> getAllChuyenBay() {
		List<ChuyenBay> listCB = new ArrayList<>();

		try {
			Connection connection = DAO.getConInstance();
			connection.setAutoCommit(true);
			PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_CB);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				listCB.add(new ChuyenBay(rs.getString("maCB"), rs.getInt("SLChoNgoiConLai")));
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return listCB;
	}
	
	public List<KhachHang> getAllKhachHang() {
		List<KhachHang> listKH = new ArrayList<>();
		try {
			Connection connection = DAO.getConInstance();
			connection.setAutoCommit(true);
			PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_KH);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				listKH.add(new KhachHang(rs.getString("maKH"), 
										rs.getString("tenKH"), 
										rs.getString("diaChi"), 
										rs.getString("sdt"), 
										rs.getString("soHoChieu"), 
										rs.getDate("ngaySinh")));
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return listKH;
	}
	
	public void themVe(Ve ve) throws SQLException, ClassNotFoundException {
		Connection connection = DAO.getConInstance();
        connection.setAutoCommit(false);
        try {
        	PreparedStatement insertStatement = connection.prepareStatement(INSERT_VE);
        	insertStatement.setString(1, ve.getMaV());
        	insertStatement.setString(2, ve.getMaKH());
        	insertStatement.setString(3, ve.getMaCB());
        	insertStatement.setString(4, ve.getMaNV());
            insertStatement.setInt(5, ve.getGiaVe());
            insertStatement.execute();
            System.out.println(0);
            
            PreparedStatement updateStatement = connection.prepareStatement(UPDATE_CB);
            updateStatement.setString(1, ve.getMaCB());
            updateStatement.execute();
            System.out.println(1);
            
            connection.commit();
        } catch (SQLException e) {
//            connection.rollback();
            throw new SQLException("Lỗi SQL khi thêm vé: " + e.getMessage());
        }
    }
	
	public void confirmTran(String res) throws ClassNotFoundException, SQLException {
		Connection connection = DAO.getConInstance();
		if (res.equals("yes"))
			connection.commit();
		else
			connection.rollback();
	}
	
	public void themKhacHang(KhachHang khachHang) throws SQLException, ClassNotFoundException {
		Connection connection = DAO.getConInstance();
		connection.setAutoCommit(false);
		try {
			PreparedStatement preparedStatement = connection.prepareStatement(INSERT_KH);
			preparedStatement.setString(1, khachHang.getMaKH());
			preparedStatement.setNString(2, khachHang.getTenKH());
			preparedStatement.setDate(3, khachHang.getNgaySinh());
			preparedStatement.setNString(4, khachHang.getDiaChi());
			preparedStatement.setString(5, khachHang.getSdt());
			preparedStatement.setString(6, khachHang.getSoHoChieu());
			preparedStatement.execute();
			
			connection.commit();
		} catch (SQLException e) {
			throw new SQLException("Lỗi SQL khi thêm KH: " + e.getMessage());
		} 
	}
	
	public List<UngDung1> getUngDung1() {
		List<UngDung1> list = new ArrayList<>();

		try {
			Connection connection = DAO.getConInstance();
			connection.setAutoCommit(true);
			PreparedStatement preparedStatement = connection.prepareStatement(UNGDUNG1);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				list.add(new UngDung1(rs.getString(1), rs.getString(2), rs.getString(3), rs.getTimestamp(4), rs.getTimestamp(5)));
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return list;
	}
	
	public List<UngDung2> getUngDung2(String chiNhanh) {
		List<UngDung2> list = new ArrayList<>();

		try {
			Connection connection = DAO.getConInstance();
			connection.setAutoCommit(true);
			PreparedStatement preparedStatement = connection.prepareStatement(UNGDUNG21 + chiNhanh + UNGDUNG22);
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				list.add(new UngDung2(rs.getString(1), rs.getString(2), rs.getInt(3)));
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return list;
	}
}
