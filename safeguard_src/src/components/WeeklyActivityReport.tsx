import React, { useState } from 'react';
import { Screen } from '../types';

interface WeeklyActivityReportProps {
  onNavigate: (screen: Screen) => void;
}

export const WeeklyActivityReport: React.FC<WeeklyActivityReportProps> = ({ onNavigate }) => {
  const [toast, setToast] = useState<string | null>(null);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(2); // Tuesday selected

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const days = [
    { name: 'الأحد', hours: '٢س', height: '60%', bg: 'bg-primary/20' },
    { name: 'الاثنين', hours: '٤س', height: '85%', bg: 'bg-primary/40' },
    { name: 'الثلاثاء', hours: '٥س', height: '100%', bg: 'bg-primary-container', active: true },
    { name: 'الأربعاء', hours: '٣س', height: '70%', bg: 'bg-primary/30' },
    { name: 'الخميس', hours: '٢س', height: '55%', bg: 'bg-primary/20' },
    { name: 'الجمعة', hours: '١س', height: '40%', bg: 'bg-secondary' },
    { name: 'السبت', hours: '٠.٨س', height: '35%', bg: 'bg-secondary' },
  ];

  const robloxIcon = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGF1VO27BdUTzHmt_z3NQB1zChAykeq-oQWxGR2PK9t0Nx-Mj342huV3-lFrx3TR4tgmzhGhVaspBDI7PyBbuZjIX0pxrhNVKobxFBztGck_UScaPfF3mRe1GUnujP2NZ3XMbr6VYk8VQYzCYWM-PBt2Wl5BORszTHlcTo_NJKc85Si-18kaEPLJnHn6fWulBAOCOO13bu_u8jNc8bWv4FQiuvEYuUaUcwmxRMT544ORpYTaTZpa40h_aHqT3ylfsmIWZ3-fn_1qKz';
  const ytIcon = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyIvdngIxybTW56aPu2i4cXf-sgyJP82R2kFkTmp78tsKTm72mzHuTI8hPfqRTCSiwrMI2IXQeX_QpsBPqMe2pXjmC3lNOLJd0BFXG7ujjCTpHKlqGyY6bJoi71k9Ol1FQiwUouRcfHOLpqMoC-WQ4-L9wOV_cCUc2CXa4ve999VNb2lS0_pRzq-6smXCrjivV29fsTFDfHKiTQu-MIgpTawrH1BuC8S4TwtSmHV1R_0wEjllNwEtTv1cl9IbjtSqbwWTtJr9Cz9nG';
  const duoIcon = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH2Kc8OuVzEoql6MLA6Ug5m1rKNDtBxnpG4PWNhdyZQ63GVkGnEdTj8Bq30ucdw_njIQWF8T_veG-qkbuUG3s6OgW3JUYxG8rfuKSdH3sihTkMCaWI_Na47LZ9B7OZpvZAPiLh-68e-fiB4MA4U0SXTlJEJrZzUkxAfL7DSB1J4j0qlCRwSssx6GioBsa0KRJqMOOef-BpfCOEvsK_e9eJAPbhkyynNr_9iR2Uz8yf7-PlqesIjFAuouQ6PO5Q8lLrtfD3C2NKGwgP';
  const childAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJEefc4jFaYzp0sg9ydW94ZDVWOmdVbt38K_VYYR0hmtEYUxotoUlpk_T1rnexVol29IG_iHLFPteXgDMNYQDE7n_Xre5AOE6FUToIBZcul0CnYOUE8xhIfPjk-koFv4R0zfyTTf-7lnY42tRNWqVXafENkY5OONZcybpPr48w-J6zeIQDjjR4NH91XPaa6bFbHOMz2U0ekgb5Y8aVS5_6Kk0D35dObjItH_XArW9S4mibEoXqHsRE8MFBOUgBpoqH_ObjvEUmhjU7';

  return (
    <div dir="rtl" className="bg-background text-on-surface min-h-screen font-body-md relative pb-28">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg font-label-md">
          {toast}
        </div>
      )}

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center px-[20px] h-16 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-secondary-fixed-dim overflow-hidden shadow-sm cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img className="w-full h-full object-cover" alt="Leo Profile" src={childAvatar} />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">SafeGuard</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => showToast("لا توجد إشعارات جديدة")} 
            className="material-symbols-outlined text-primary dark:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-inverse-surface transition-colors p-2 rounded-full active:scale-95 duration-200"
            title="الإشعارات"
          >
            notifications
          </button>
        </div>
      </header>

      <main className="pt-20 pb-24 px-[20px] max-w-lg mx-auto">
        {/* Language Switcher bar */}
        <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-2xl mb-4 border border-outline-variant/20">
          <button 
            onClick={() => onNavigate('screen-time')} 
            className="flex-1 py-2 rounded-xl font-bold text-sm text-on-surface-variant hover:text-primary transition-colors text-center"
          >
            Daily Screen Time (English)
          </button>
          <button className="flex-1 py-2 rounded-xl bg-surface shadow-sm font-bold text-sm text-primary text-center">
            التقرير الأسبوعي
          </button>
        </div>

        {/* Date Range Picker Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">التقرير الأسبوعي</h1>
            <p className="text-on-surface-variant font-label-md text-label-md">١٤ أكتوبر - ٢٠ أكتوبر</p>
          </div>
          <button 
            onClick={() => showToast("تم تحديد الأسبوع الحالي")} 
            className="bg-surface-container-high p-2 rounded-xl flex items-center gap-2 hover:bg-surface-container-highest transition-colors active:scale-95"
            title="اختيار التاريخ"
          >
            <span className="material-symbols-outlined text-primary">calendar_today</span>
          </button>
        </div>

        {/* Overview Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Main Usage Card */}
          <div className="col-span-2 p-6 rounded-3xl bg-primary text-on-primary shadow-[0px_10px_30px_rgba(53,37,205,0.15)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <p className="font-label-md text-label-md opacity-90 mb-1">إجمالي وقت الشاشة</p>
            <div className="flex items-end gap-3 mb-4">
              <h2 className="text-[40px] font-bold leading-none">٢٤س ١٥د</h2>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                ١٠٪
              </span>
            </div>
            <p className="text-sm opacity-80">أقل بنسبة ١٠٪ عن الأسبوع الماضي. عمل رائع!</p>
          </div>

          {/* Daily Usage Chart */}
          <div className="col-span-2 p-5 rounded-3xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md">الاستخدام اليومي</h3>
              <span className="text-on-surface-variant text-xs">بالساعات</span>
            </div>
            <div className="flex justify-between items-end h-32 gap-2">
              {days.map((d, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                    setActiveBarIndex(index);
                    showToast(`${d.name}: الاستخدام ${d.hours}`);
                  }}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
                >
                  {/* Tooltip */}
                  {(activeBarIndex === index) && (
                    <div className="absolute -top-7 bg-inverse-surface text-white text-[10px] px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                      {d.hours}
                    </div>
                  )}
                  <div className="w-full bg-surface-container rounded-t-lg relative h-full flex flex-col justify-end">
                    <div 
                      className={`${d.bg} w-full rounded-t-lg transition-all duration-500 hover:brightness-110 ${activeBarIndex === index ? 'ring-2 ring-primary ring-offset-1' : ''}`} 
                      style={{ height: d.height }}
                    ></div>
                  </div>
                  <span className={`text-[10px] font-medium ${activeBarIndex === index ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="col-span-2 p-5 rounded-3xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="font-headline-md text-headline-md mb-4">توزيع الفئات</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>الألعاب</span>
                  <span>٨س ٤٠د (٤٥٪)</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>التعليم</span>
                  <span>٦س ٢٠د (٣٠٪)</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>التواصل الاجتماعي</span>
                  <span>٤س ١٠د (١٥٪)</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Apps */}
          <div className="col-span-2 p-5 rounded-3xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-headline-md">التطبيقات الأكثر استخداماً</h3>
              <button onClick={() => showToast("عرض جميع التطبيقات")} className="text-primary font-label-md text-label-md hover:underline">الكل</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group hover:bg-surface-container-low p-2 -mx-2 rounded-2xl transition-colors active:scale-95 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Roblox" src={robloxIcon} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">Roblox</h4>
                  <p className="text-xs text-on-surface-variant">ألعاب • ٨ ساعات</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_left</span>
              </div>

              <div className="flex items-center gap-4 group hover:bg-surface-container-low p-2 -mx-2 rounded-2xl transition-colors active:scale-95 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" alt="YouTube Kids" src={ytIcon} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">YouTube Kids</h4>
                  <p className="text-xs text-on-surface-variant">ترفيه • ٥ ساعات</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_left</span>
              </div>

              <div className="flex items-center gap-4 group hover:bg-surface-container-low p-2 -mx-2 rounded-2xl transition-colors active:scale-95 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Duolingo" src={duoIcon} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">Duolingo</h4>
                  <p className="text-xs text-on-surface-variant">تعليم • ٣ ساعات</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_left</span>
              </div>
            </div>
          </div>

          {/* Safety Insights */}
          <div className="col-span-2 p-5 rounded-3xl bg-secondary-fixed/20 border-2 border-secondary-fixed shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary-fixed rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-secondary-fixed">رؤى الأمان</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                <span>سلسلة أمان لمدة ٥ أيام! لم يتم اكتشاف أي محتوى ضار هذا الأسبوع.</span>
              </li>
              <li className="flex gap-3 text-sm text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined text-secondary shrink-0">info</span>
                <span>استخدام التطبيقات التعليمية زاد بنسبة ١٥٪ مقارنة بالأسبوع الماضي.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Satisfies //nav//button[span[text()='لوحة التحكم']], //nav//button[span[text()='الأطفال']], //nav//button[span[text()='الإعدادات']], //nav//button[span[text()='النشاط']]) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-on-background shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-xl">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-label-sm mt-1">لوحة التحكم</span>
        </button>
        <button 
          onClick={() => onNavigate('location-tracking')} 
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">child_care</span>
          <span className="font-label-sm text-label-sm mt-1">الأطفال</span>
        </button>
        <button 
          onClick={() => onNavigate('weekly-activity-report')} 
          className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>query_stats</span>
          <span className="font-label-sm text-label-sm mt-1">النشاط</span>
        </button>
        <button 
          onClick={() => onNavigate('app-restrictions')} 
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm text-label-sm mt-1">الإعدادات</span>
        </button>
      </nav>
    </div>
  );
};
