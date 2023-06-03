import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container } from 'reactstrap';

const UngDung1 = () => {

    const [thongKe, setThongKe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true)
        axios.get('/api/ungdung1').then(res => {
            setThongKe(res.data)
            setIsLoading(false)
        });
    }

    const ud1Result = thongKe.map(item => {
        return <tr key={item.maCB}>
            <td>{item.maCB}</td>
            <td>{item.tenMB}</td>
            <td>{item.sanBayXuatPhat}</td>
            <td>{item.thoiGianBatDau}</td>
            <td>{item.thoiGianKetThuc}</td>
        </tr>
    })

    return (
        <div>
            <Container fluid>
                <h3 className='me-3'>Ứng dụng 1: Thống kê các chuyến bay có chỗ ngồi còn lại nhỏ hơn 10</h3>
                <Button color='primary' onClick={handleClick}>Load</Button>
                    <div>
                        {/* <p>Loading time: {Math.floor((endTime - startTime)/1000)}s {(endTime - startTime)%1000}ms</p> */}
                        <table className="table table-bordered mt-4">
                            <thead className="table-dark">
                                <tr>
                                    <th>Mã chuyến bay</th>
                                    <th>Tên máy bay</th>
                                    <th>Sân bay xuất phát</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                </tr>
                            </thead>
                            {isLoading ? <p>Loading...</p> :
                                <tbody>
                                    {ud1Result}
                                </tbody>
                             }
                        </table>
                    </div>
            </Container>
        </div>
    );
}

export default UngDung1;