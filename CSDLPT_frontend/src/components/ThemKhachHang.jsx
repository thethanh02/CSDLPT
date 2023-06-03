import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

const KhachHangEdit = () => {
    const [khachHang, setKhachHang] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target

        setKhachHang({ ...khachHang, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/khachhang/new', khachHang);
            alert(response.data)
        } catch (error) {
            const confirmBox = window.confirm(error.response.data + "\nBạn có muốn tiếp tục thêm?")
            if (confirmBox) {
                axios.post('/api/ve/new/confirm', { result: 'yes' })
                    .then(response => {
                        alert(response.data)
                    })
            } else {
                axios.post('/api/ve/new/confirm', { result: 'no' })
                    .then(response => {
                        alert(response.data)
                    })
            }
        }
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="maKH">Mã KH</Label>
                            <Input type="text" name="maKH" id="maKH" value={khachHang.maKH}
                                onChange={handleChange} autoComplete="maKH" />
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="tenKH">Tên KH</Label>
                            <Input type="text" name="tenKH" id="tenKH" value={khachHang.tenKH}
                                onChange={handleChange} autoComplete="tenKH" />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="ngaySinh">Ngày sinh</Label>
                            <Input type="date" name="ngaySinh" id="ngaySinh" value={khachHang.ngaySinh}
                                onChange={handleChange} autoComplete="ngaySinh" />
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="diaChi">Địa chỉ</Label>
                            <Input type="text" name="diaChi" id="diaChi" value={khachHang.diaChi}
                                onChange={handleChange} autoComplete="diaChi" />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="sdt">Số điện thoại</Label>
                            <Input type="text" name="sdt" id="sdt" value={khachHang.sdt}
                                onChange={handleChange} autoComplete="sdt" />
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="soHoChieu">Số hộ chiếu</Label>
                            <Input type="text" name="soHoChieu" id="soHoChieu" value={khachHang.soHoChieu}
                                onChange={handleChange} autoComplete="soHoChieu" />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/khachhangs">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default KhachHangEdit;