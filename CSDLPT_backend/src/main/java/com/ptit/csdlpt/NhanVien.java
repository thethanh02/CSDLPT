package com.ptit.csdlpt;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
	private String maNV, tenNV, maCN, sdt, chucVu;
	private Date ngaySinh;
}
