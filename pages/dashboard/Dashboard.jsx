import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import { Dashboardchart, destroyChart } from '../../utills/dashboardchart';
import Card from './Card';
import Producttable from './Producttable';

const Dashboard = () => {
    useEffect(() => {
        const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        Dashboardchart(labels, datapoints)
        return () => {
            destroyChart() 
        }
    }, [])
    return (
        <div id="dashboard_section" className="dashboard_section main_section">

            <div className="row">

                <Card
                    currentvalue={7}
                    title="سبدخرید امروز"
                    desc="سبد های خرید مانده امروز"
                    icon="fas fa-shopping-basket"
                    lastweek={13}
                    lastmonth={18}
                />
                <Card
                    currentvalue={5}
                    title="سفارشات مانده امروز"
                    desc="سفارشات معلق و فاقد پرداختی"
                    icon="fas fa-dolly"
                    lastweek={9}
                    lastmonth={16}
                />
                <Card
                    currentvalue={45}
                    title="سفارشات امروز"
                    desc="سفارشات کامل و دارای پرداختی"
                    icon="fas fa-luggage-cart"
                    lastweek={263}
                    lastmonth={1038} />
                <Card
                    currentvalue="1,500,000"
                    title="درآمدامروز"
                    desc="جمع مبالغ پرداختی (تومان)"
                    icon="fas fa-money-check-alt"
                    lastweek="6,380,000"
                    lastmonth="22,480,000"
                />



            </div>







            <div className="row">

                <div className="col-12 col-lg-6">

                    <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>
                    <Producttable />

                </div>


                <div className="col-12 col-lg-6">
                    <canvas id="myChart" height="195"></canvas>
                </div>

            </div>










        </div>

    );
};

export default Dashboard;