import Title from '../../../components/Title';
import Style from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { TbReportMoney } from 'react-icons/tb';
import { BsCartCheck, BsBoxSeam } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import BarChart from '../../../components/BarChart';
import { useEffect, useState } from 'react';
import request from '../../../utils/request';

const cx = classNames.bind(Style);
function Dashboard() {
    const [dashboard, setDashboard] = useState({});

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    useEffect(() => {
        request.get('/dashboard').then((res) => {
            setDashboard(res.data.result);
        });
    }, []);

    return (
        <div className="dashboard">
            <Title name="Thống kê cửa hàng" />

            <div className="content">
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('order', 'item')}>
                            <div className={cx('icon')}>
                                <BsCartCheck size={28} />
                            </div>
                            <div className={cx('info')}>
                                <p>Tổng số đơn hàng</p>
                                <p>{dashboard.totalOrder}</p>
                            </div>
                        </div>
                        <div className={cx('revenue', 'item')}>
                            {' '}
                            <div className={cx('icon')}>
                                <TbReportMoney size={28} />
                            </div>
                            <div className={cx('info')}>
                                <p>Tổng số doanh thu</p>
                                <p>{formatCurrency(dashboard.revenue)}</p>
                            </div>
                        </div>
                        <div className={cx('product', 'item')}>
                            {' '}
                            <div className={cx('icon')}>
                                <BsBoxSeam size={28} />
                            </div>
                            <div className={cx('info')}>
                                <p>Sản phẩm đang bán</p>
                                <p>{dashboard.totalProduct}</p>
                            </div>
                        </div>
                        <div className={cx('user', 'item')}>
                            {' '}
                            <div className={cx('icon')}>
                                <HiUserGroup size={28} />
                            </div>
                            <div className={cx('info')}>
                                <p>Tổng số người dùng </p>
                                <p>{dashboard.totalUser}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('chart')}>
                        {' '}
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
