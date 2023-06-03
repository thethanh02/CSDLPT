package com.ptit.csdlpt;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhachHang {
	private String maKH, tenKH, diaChi, sdt, soHoChieu;
	private Date ngaySinh;
}
