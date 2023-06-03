import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Input, FormGroup, Label, Button } from 'reactstrap';


const ThemVe = () => {
    const [nv, setNV] = useState([]);
    const [cb, setCB] = useState([]);
    const [kh, setKH] = useState([]);
    const [ve, setVe] = useState({
        maV: '',
        maKH: '',
        maCB: '',
        maNV: '',
        giaVe: 0
    })

    useEffect(() => {
        axios.get('/api/nhanviens').then(res => setNV(res.data));
        axios.get('/api/chuyenbays').then(res => setCB(res.data));
        axios.get('/api/khachhangs').then(res => setKH(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVe((prevVe) => ({ ...prevVe, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post('/api/ve/new', ve)
            .then(response => {
                alert(response.data)
            })
            .catch((error) => {
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
            });
    };
    return (
        <Container>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-9 mb-6">
                        <Label htmlFor="maV">Mã vé:</Label>
                        <Input type="text" id="maV" placeholder="Mã vé" name="maV" onChange={handleChange} required />
                    </div>
                </div>
                <div className="row">
                    <FormGroup className="col-md-3 mb-2">
                        <Label htmlFor="maKH">Mã khách hàng:</Label>
                        <select className="form-select w-100" id="maKH" name="maKH" onChange={handleChange} required >
                            <option value="" disabled selected>-- Chọn mã khách hàng --</option>
                            {kh.map((item) => (
                                <option key={item.maKH} value={item.maKH}>{item.maKH}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-2">
                        <Label htmlFor="maCB">Mã chuyến bay:</Label>
                        <select className="form-select" id="maCB" name="maCB" onChange={handleChange} required >
                            <option value="" disabled selected>-- Chọn mã chuyến bay --</option>
                            {cb.map((item) => (
                                <option key={item.maCB} value={item.maCB}>{item.maCB}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-2">
                        <Label htmlFor="maNV">Mã nhân viên:</Label>
                        <select className="form-select" id="maNV" name="maNV" onChange={handleChange} required >
                            <option value="" disabled selected>-- Chọn mã nhân viên --</option>
                            {nv.map((item) => (
                                <option key={item.maNV} value={item.maNV}>{item.maNV}</option>
                            ))}
                        </select>
                    </FormGroup>
                </div>
                <div className="row">
                    <div className="col-md-9 mb-6">
                        <Label htmlFor="giaVe">Giá vé:</Label>
                        <Input type="number" id="giaVe" placeholder="Giá vé" name="giaVe" onChange={handleChange} required />
                    </div>
                </div>
                <Button type="submit" color='primary'>Submit</Button>
            </form>
        </Container>
    );

};

export default ThemVe;