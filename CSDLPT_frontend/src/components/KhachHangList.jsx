import React, { useState } from 'react';
import { Button, Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const KhachHangList = () => {

    const [khachHangs, setKhachHangs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true)
        axios.get('api/khachhangs').then(res => {
            setKhachHangs(res.data)
            setIsLoading(false)
        });
    }
    const khachHangList = khachHangs.map(khachHang => {
        return <tr key={khachHang.maKH}>
            <td>{khachHang.maKH}</td>
            <td>{khachHang.tenKH}</td>
            <td>{khachHang.ngaySinh}</td>
            <td>{khachHang.sdt}</td>
            <td>{khachHang.diaChi}</td>
            <td>{khachHang.soHoChieu}</td>
        </tr>
    });


    return (
        <div>
            <Container>
                <h3>Danh sách khách hàng</h3>
                <Button color='primary' onClick={handleClick}>Load data</Button>{'   '}
                <Button color="success" tag={Link} to="/khachhang/new">Thêm KH</Button>
                <Table className="table table-bordered mt-4">
                    <thead className='table-dark'>
                        <tr>
                            <th>Mã KH</th>
                            <th>Tên KH</th>
                            <th>Ngày sinh</th>
                            <th>Sđt</th>
                            <th>Địa chỉ</th>
                            <th>Số hộ chiếu</th>
                        </tr>
                    </thead>
                        {isLoading ? <p>Loading...</p> :
                            <tbody>
                                {khachHangList}
                            </tbody>
                        }
                </Table>
            </Container>
        </div>
    );
};

export default KhachHangList;