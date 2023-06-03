package com.ptit.csdlpt;

import java.sql.*;

public class DAO {
	
	private static Connection conInstance;
	public static Connection getConInstance() throws SQLException, ClassNotFoundException {
		if(conInstance == null) {
			String url = "jdbc:sqlserver://THAWNF\\SERVER2;databaseName=CSDLPT;encrypt=true;trustServerCertificate=true";
			String username = "sa";
			String password = "123";
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conInstance = DriverManager.getConnection(url, username, password);
			System.out.println(conInstance);
		}
		return conInstance;
	}
}
