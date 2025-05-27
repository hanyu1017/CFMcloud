import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MaintenanceCalendar({ equipment }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const maintenanceByDate = equipment.reduce((acc, item) => {
    const date = new Date(item.next_maintenance);
    const key = date.toISOString().split('T')[0];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {previousMonthDays.map(day => (
          <div key={`prev-${day}`} className="bg-white p-2 min-h-[100px]" />
        ))}
        {days.map(day => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const dateStr = date.toISOString().split('T')[0];
          const dayMaintenance = maintenanceByDate[dateStr] || [];
          
          return (
            <div key={day} className="bg-white p-2 min-h-[100px] border-t">
              <div className="font-medium mb-1">{day}</div>
              {dayMaintenance.map(item => (
                <div
                  key={item.equipment_id}
                  className={`text-xs p-1 mb-1 rounded ${
                    item.status === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : item.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}