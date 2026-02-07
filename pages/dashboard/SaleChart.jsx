import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dashboardchart } from '../../utills/dashboardchart';
import { getThisYearOrders } from '../../src/services/orders';
import jMoment from 'jalali-moment';
import Loader from '../../components/Loader';

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const SaleChart = () => {
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const containerRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  const processOrdersData = useCallback((orders) => {
    const monthsOrdersArr = [];
    const now = jMoment();
    let thisMonth = now.jMonth();
    
    // ایجاد آرایه 12 ماهه معکوس
    for (let i = 0; i < 12; i++) {
      if (thisMonth === -1) thisMonth = 11;
      monthsOrdersArr.push({ month: thisMonth, amount: 0 });
      thisMonth--;
    }

    // محاسبه مبلغ هر ماه
    for (const order of orders) {
      const moment = jMoment(order.pay_at);
      const monthIndex = moment.jMonth();
      const index = monthsOrdersArr.findIndex(o => o.month === monthIndex);
      if (index !== -1) {
        monthsOrdersArr[index].amount = monthsOrdersArr[index].amount + parseInt(order.pay_amount);
      }
    }

    // معکوس کردن برای نمایش صحیح
    monthsOrdersArr.reverse();
    
    return {
      labels: monthsOrdersArr.map(o => labels[o.month]),
      data: monthsOrdersArr.map(o => o.amount / 1000000)
    };
  }, []);

  const handleGetChartInfo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getThisYearOrders();
      
      if (res.status === 200) {
        const processedData = processOrdersData(res.data.data);
        setChartData(processedData);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  }, [processOrdersData]);

  // ایجاد یا به‌روزرسانی چارت
  const updateChart = useCallback(() => {
    if (!chartRef.current || !chartData.labels.length || !chartData.data.length) {
      return;
    }

    // حذف چارت قبلی اگر وجود دارد
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // ایجاد چارت جدید
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = Dashboardchart(
      ctx,
      chartData.labels,
      chartData.data
    );
  }, [chartData]);

  // تنظیم سایز canvas به صورت responsive
  const updateCanvasSize = useCallback(() => {
    if (!chartRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = chartRef.current;
    
    // دریافت ابعاد والد
    const containerWidth = container.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    
    // تنظیم ابعاد canvas
    canvas.width = containerWidth * dpr;
    canvas.height = 195 * dpr;
    
    // تنظیم استایل برای نمایش
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = '195px';
    
    // تنظیم scale برای کیفیت بالا
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // resize چارت اگر وجود دارد
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resize();
    }
  }, []);

  // Effect اول: دریافت داده‌ها
  useEffect(() => {
    handleGetChartInfo();
  }, [handleGetChartInfo]);

  // Effect دوم: ایجاد چارت هنگام تغییر داده‌ها
  useEffect(() => {
    if (chartData.labels.length > 0 && chartData.data.length > 0) {
      updateChart();
    }
  }, [chartData, updateChart]);

  // Effect سوم: تنظیم سایز responsive
  useEffect(() => {
    // تابع برای handle کردن resize
    const handleResize = () => {
      updateCanvasSize();
    };

    // تنظیم اولیه سایز
    const timeoutId = setTimeout(() => {
      updateCanvasSize();
    }, 100); // کمی تاخیر برای اطمینان از render شدن DOM

    // گوش دادن به تغییر سایز پنجره
    window.addEventListener('resize', handleResize);
    
    // Observer برای تغییرات سایز container
    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      // حذف چارت هنگام unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [updateCanvasSize]);

  // Effect چهارم: بررسی visibility برای resize مجدد
  useEffect(() => {
    if (!loading && chartData.labels.length > 0) {
      // کمی تاخیر برای اطمینان از نمایش کامپوننت
      const timer = setTimeout(() => {
        updateCanvasSize();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [loading, chartData, updateCanvasSize]);

  return (
    <>
      {loading && <Loader colorClass={"text-primary"} />}
      <div 
        ref={containerRef}
        className={`col-12 col-lg-6 ${loading ? 'd-none' : ''}`}
        style={{ 
          position: 'relative',
          minHeight: '350px'
        }}
      >
        <canvas 
          ref={chartRef}
          id="saleChart"
          style={{
            display: 'block',
            width: '100%',
            height: '400px'
          }}
        />
      </div>
    </>
  );
};

export default SaleChart;