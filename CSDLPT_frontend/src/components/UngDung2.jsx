import axios from 'axios';
import React, { useState } from 'react';
import { Container, ButtonGroup } from 'reactstrap';

const UngDung2 = () => {

    const [thongKe, setThongKe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chiNhanh, setChiNhanh] = useState("QUANGNINH");

    const handleClick = () => {
        setIsLoading(true)
        console.log(chiNhanh)
        axios.get(`/api/ungdung2/${chiNhanh}`).then(res => {
            setThongKe(res.data)
            setIsLoading(false)
        });
    }

    const ud2Result = thongKe.map(item => {
        return <tr key={item.maKH}>
                <td>{item.maKH}</td>
                <td>{item.tenKH}</td>
                <td>{item.tickets}</td>
            </tr>
    })

    return (
        <Container>
            <div>
                <h3 className='me-3'>Ứng dụng 2: Xem danh sách khách hàng mua vé nhiều nhất tại 1 chi nhánh</h3>
                <ButtonGroup>
                    <select class="form-select" onChange={e => setChiNhanh(e.target.value)}>
                        <option selected value="QUANGNINH">Quảng Ninh</option>
                        <option value="DANANG">Đà Nẵng</option>
                        <option value="GIALAI">Gia Lai</option>
                        <option value="HANOI">Hà Nội</option>
                        <option value="HUE">Huế</option>
                        <option value="KHANHHOA">Khánh Hòa</option>
                        <option value="KIENGIANG">Kiên Giang</option>
                        <option value="NGHEAN">Nghệ An</option>
                        <option value="SAIGON">Sài Gòn</option>
                    </select>
                    <button className='btn btn-primary' onClick={handleClick}>Load</button>
                </ButtonGroup>
                    <div>
                        {/* <p>Loading time: {Math.floor((endTime - startTime)/1000)}s {(endTime - startTime)%1000}ms</p> */}
                        <table className="table table-bordered mt-4">
                            <thead className="table-dark">
                                <tr>
                                    <th>Mã khách hàng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Số vé đã mua</th>
                                </tr>
                            </thead>
                            {isLoading ? <p>Loading...</p> :
                                <tbody>
                                    {ud2Result}
                                </tbody>
                            }
                        </table>
                    </div>
            </div>
        </Container>
    );
}

export default UngDung2;