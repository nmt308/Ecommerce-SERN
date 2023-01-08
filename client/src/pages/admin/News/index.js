//Local
import Title from '../../../components/Title';

//React
import React from 'react';

import { MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

//Icon
import { ImSearch } from 'react-icons/im';

function News() {
    return (
        <div>
            <Title name="Danh sách tin tức" />
            <div className="action">
                <MDBInput placeholder="Nhập tên tin tức ..." label="Tìm kiếm" type="text">
                    <MDBBtn style={{ padding: '10px 16px', display: 'flex' }}>
                        <ImSearch size={16} />
                    </MDBBtn>
                </MDBInput>
            </div>
            <div className="content">
                <MDBTable align="middle">
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Nội dung tin tức</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Ngày tạo bài viết</th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                Hành động
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr className="text-center">
                            <td colSpan="7">
                                <div style={{ padding: '12px 0' }}>Không tìm thấy dữ liệu tương ứng</div>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    );
}

export default News;
