package com.ptit.csdlpt;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {
	
	@GetMapping("/ungdung1")
	public List<UngDung1> getUngDung1() {
		CsdlptDAO dao = new CsdlptDAO();
		long st = System.currentTimeMillis();
		List<UngDung1> res = dao.getUngDung1();
		long et = System.currentTimeMillis();
		System.out.println((et - st)/1000 + "s " + (et - st)%1000 + "ms");
		return res;
	}
	
	@GetMapping("/ungdung2/{chiNhanh}")
	public List<UngDung2> getUngDung2(@PathVariable String chiNhanh) {
		CsdlptDAO dao = new CsdlptDAO();
		long st = System.currentTimeMillis();
		List<UngDung2> res;
		if (chiNhanh.equals("QUANGNINH"))
			res = dao.getUngDung2("");
		else
			res = dao.getUngDung2(chiNhanh + ".");
		long et = System.currentTimeMillis();
		System.out.println((et - st)/1000 + "s " + (et - st)%1000 + "ms");
		return res;
	}
	
	@GetMapping("/nhanviens")
	public List<NhanVien> getAllNV() {
		CsdlptDAO dao = new CsdlptDAO();
		return dao.getAllNhanVien();
	}
	
	@GetMapping("/chuyenbays")
	public List<ChuyenBay> getAllCB() {
		CsdlptDAO dao = new CsdlptDAO();
		return dao.getAllChuyenBay();
	}
	
	@PostMapping("/ve/new")
    public ResponseEntity<String> addVe(@RequestBody Ve ve) {
        CsdlptDAO dao = new CsdlptDAO();
        try {
            dao.themVe(ve);
            return ResponseEntity.ok("Vé đã được thêm thành công");
        } catch (SQLException ex) {
        	System.err.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        } catch (Exception e) {
			e.printStackTrace();
		}
		return null;
    }
	
	@PostMapping("/ve/new/confirm")
    public ResponseEntity<String> addVeConfirm(@RequestBody ConfirmationRequest request) {
        CsdlptDAO dao = new CsdlptDAO();
        try {
        	dao.confirmTran(request.getResult());
        	if (request.getResult().equals("yes")) 
        		return ResponseEntity.ok("Vé đã được thêm thành công");
    	    	
	    	return ResponseEntity.ok("Vé đã được rollback");
        } catch (Exception e) {
			e.printStackTrace();
        }
        return null;
    }
	
	@GetMapping("/khachhangs")
	public List<KhachHang> getAllKH() {
		CsdlptDAO dao = new CsdlptDAO();
		return dao.getAllKhachHang();
	}
	
	@PostMapping("/khachhang/new")
	public ResponseEntity<String> themKH(@RequestBody KhachHang khachHang) {
		CsdlptDAO dao = new CsdlptDAO();
        try {
            dao.themKhacHang(khachHang);
            return ResponseEntity.ok("KH đã được thêm thành công");
        } catch (SQLException ex) {
        	System.err.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        } catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@PostMapping("/khachhang/new/confirm")
	public ResponseEntity<String> themKHConfirm(@RequestBody ConfirmationRequest request) {
		 CsdlptDAO dao = new CsdlptDAO();
	        try {
	        	System.out.println(request.getResult());
	        	dao.confirmTran(request.getResult());
	        	if (request.getResult().equals("yes")) 
	        		return ResponseEntity.ok("KH đã được thêm thành công");
	    	    	
		    	return ResponseEntity.ok("KH đã được rollback");
	        } catch (Exception e) {
				e.printStackTrace();
	        }
	        System.out.println(111);
	        return null;
	}
}
