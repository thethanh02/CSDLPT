package com.ptit.csdlpt;

import java.sql.Timestamp;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UngDung1 {
	private String maCB, tenMB, sanBayXuatPhat;
	private Timestamp thoiGianBatDau, thoiGianKetThuc;;
}
