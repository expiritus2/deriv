import React, { FC } from 'react';
import classNames from 'classnames';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from './style.module.scss';

type ChartData = {
    labels: any[];
    datasets: any[];
}

type ComponentProps = {
    className?: string;
    data: ChartData
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

export const options: ChartOptions = {
    responsive: true,
    hover: { mode: undefined },
    scales: {
        x: {
            ticks: { display: false }
        },
        y: {
            ticks: { display: false }
        }
    },
    animation: { delay: 100 },
};

const labels = ['1', '2', '3', '4', '5', '6', '7'];

export const fakeData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            data: [-1000, 200, 300, 400, 200, 100, 700],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};

const Chart: FC<ComponentProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.chart, className)}>
            {/* @ts-ignore */}
            <Line height={50} width={'100%'} data={fakeData} options={options} />
        </div>
    );
};

export default Chart;
