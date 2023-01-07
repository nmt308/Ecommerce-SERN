import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
function BarChart() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'DOANH THU CỬA HÀNG',
            },
        },
    };

    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu tháng',
                data: labels.map(() => Math.floor(Math.random() * 10000000)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
export default BarChart;
