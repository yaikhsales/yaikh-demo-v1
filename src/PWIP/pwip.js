import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import GeneralAIAgent from "../general-ag";

// ----------------------------------------------------------------------
// Reusable SVG Chart Components
// ----------------------------------------------------------------------

const TopMetricCard = ({
  title,
  subtitle,
  value,
  target,
  percentage,
  isPositive,
  chartType,
  dataPoints,
}) => {
  // Simple SVG Path generator
  const width = 140;
  const height = 50;
  const max = Math.max(...dataPoints);
  const min = Math.min(...dataPoints) * 0.8;
  const range = max - min || 1;
  const step = width / (dataPoints.length - 1);

  let pathD = `M0,${height - ((dataPoints[0] - min) / range) * height}`;
  dataPoints.forEach((d, i) => {
    pathD += ` L${i * step},${height - ((d - min) / range) * height}`;
  });
  const areaD = `${pathD} V${height} H0 Z`;

  const chartColor = chartType === "dark" ? "#0f3f6e" : "#2083b8"; // Dark blue vs Medium Blue

  return (
    <div className="bg-white px-6 py-4 border-r border-b border-gray-200 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-black">{title}</h3>
          <p className="text-xs text-gray-500 italic">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#006080]">{value}</span>
          {target && (
            <div className="text-[10px] text-gray-500 mt-1">
              Target: <span className="text-red-500">{target}</span>
            </div>
          )}
        </div>

        <div className="w-[120px] h-[50px]">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
          >
            <path d={areaD} fill={chartColor} />
            <path d={pathD} fill="none" stroke={chartColor} strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Target Badge */}
      <div className="flex justify-end mt-2 h-6">
        {percentage && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 text-xs text-white font-bold ${isPositive ? "bg-[#00b050]" : "bg-[#c00000]"}`}
          >
            <span className="text-[10px]">{isPositive ? "↑" : "↓"}</span>{" "}
            {percentage}
          </div>
        )}
      </div>
    </div>
  );
};

const HorizontalBarChart = ({ title, subtitle, data, showYear }) => {
  return (
    <div className="bg-white px-6 py-4 border-r border-b border-gray-200 h-full">
      <h3 className="text-sm font-bold text-black">{title}</h3>
      <p className="text-xs text-gray-500 italic mb-4">{subtitle}</p>

      <div className="flex items-center h-[120px]">
        {showYear && (
          <div className="text-xs text-gray-500 w-10 shrink-0">2018</div>
        )}
        <div className="flex-1 flex flex-col gap-3 border-l border-gray-300 pl-2">
          {data.map((item, idx) => (
            <div key={idx} className="w-full relative h-5 bg-gray-100/50">
              <div
                className="h-full absolute left-0 top-0 transition-all duration-1000"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Axis/Grid Simulation */}
      <div className="ml-10 flex justify-between text-[10px] text-gray-500 mt-1 border-t border-gray-400 pt-1">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div
              className="w-2 h-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-[10px] font-bold text-black">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DonutChart = () => {
  return (
    <div className="bg-white px-6 py-4 border-r border-b border-gray-200 h-full">
      <h3 className="text-sm font-bold text-black">Lost Units : Causes</h3>
      <div className="flex items-center justify-center h-full relative">
        {/* CSS/SVG Donut */}
        <div className="relative w-40 h-40">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Segments - approximated to match image visual */}
            <circle
              cx="50"
              cy="50"
              r="15.9155"
              fill="transparent"
              stroke="#004c6d"
              strokeWidth="14"
              strokeDasharray="20 80"
              strokeDashoffset="25"
            />
            <circle
              cx="50"
              cy="50"
              r="15.9155"
              fill="transparent"
              stroke="#2a8b9e"
              strokeWidth="14"
              strokeDasharray="30 70"
              strokeDashoffset="5"
            />
            <circle
              cx="50"
              cy="50"
              r="15.9155"
              fill="transparent"
              stroke="#2ecc71"
              strokeWidth="14"
              strokeDasharray="20 80"
              strokeDashoffset="-25"
            />
            <circle
              cx="50"
              cy="50"
              r="15.9155"
              fill="transparent"
              stroke="#1abc9c"
              strokeWidth="14"
              strokeDasharray="30 70"
              strokeDashoffset="-45"
            />

            {/* Center Text */}
            <text
              x="50"
              y="55"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              fill="black"
            >
              100
            </text>
          </svg>

          {/* Floating Labels inside slices - manual positioning for "exact" look */}
          <div className="absolute top-[20%] left-[50%] text-[8px] font-bold text-white">
            20
          </div>
          <div className="absolute top-[50%] right-[15%] text-[8px] font-bold text-white">
            30
          </div>
          <div className="absolute bottom-[20%] left-[40%] text-[8px] font-bold text-white">
            20
          </div>
          <div className="absolute top-[40%] left-[15%] text-[8px] font-bold text-white">
            30
          </div>
        </div>

        {/* Legend */}
        <div className="ml-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#004c6d]"></div>
            <span className="text-[10px] font-bold">Tooling Error</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#2a8b9e]"></div>
            <span className="text-[10px] font-bold">Operator Damage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#2ecc71]"></div>
            <span className="text-[10px] font-bold">Physical Damage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#1abc9c]"></div>
            <span className="text-[10px] font-bold">Other Causes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupedBarChart = ({ title, subtitle, showYAxis = true }) => {
  const months = [
    "Jan-18",
    "Feb-18",
    "Mar-18",
    "Apr-18",
    "May-18",
    "Jun-18",
    "Jul-18",
    "Aug-18",
    "Sep-18",
    "Oct-18",
    "Nov-18",
    "Dec-18",
  ];

  // Pseudo random generator for consistant mock data
  const getH = (i, offset) => {
    const seed = (i + offset) * 9301 + 49297;
    return (seed % 80) + 10;
  };

  return (
    <div className="bg-white px-6 py-4 border-r border-b border-gray-200 h-full flex flex-col">
      <h3 className="text-sm font-bold text-black">{title}</h3>
      {subtitle && (
        <p className="text-xs text-gray-500 italic mb-2">{subtitle}</p>
      )}

      <div className="flex-1 flex relative items-end ml-6 border-l border-b border-gray-300 pb-1">
        {/* Y Axis Labels */}
        {showYAxis && (
          <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[8px] text-gray-500 py-2 text-right w-6">
            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
        )}

        {/* Bars */}
        {months.map((m, i) => (
          <div
            key={i}
            className="flex-1 flex items-end justify-center h-full px-[1px]"
          >
            <div
              className="w-[30%] bg-[#002f4b] mx-[1px]"
              style={{ height: `${getH(i, 0)}%` }}
            ></div>
            <div
              className="w-[30%] bg-[#2083b8] mx-[1px]"
              style={{ height: `${getH(i, 1)}%` }}
            ></div>
            <div
              className="w-[30%] bg-[#58b9c9] mx-[1px]"
              style={{ height: `${getH(i, 2)}%` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between ml-6 mt-1 text-[7px] text-gray-500 -rotate-45 origin-top-left h-8">
        {months.map((m, i) => (
          <span key={i} className="w-full text-center block mt-2">
            {m}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#002f4b]"></div>
          <span className="text-[9px] font-bold text-black">Machine-A</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#2083b8]"></div>
          <span className="text-[9px] font-bold text-black">Machine-B</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#58b9c9]"></div>
          <span className="text-[9px] font-bold text-black">Machine-C</span>
        </div>
      </div>
    </div>
  );
};

const AreaChartDots = () => {
  // Generate accurate looking path
  const points = [
    { x: 0, y: 15 },
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 10 },
    { x: 40, y: 12 },
    { x: 50, y: 18 },
    { x: 60, y: 30 },
    { x: 70, y: 45 },
    { x: 80, y: 55 },
    { x: 90, y: 20 },
  ];

  let d = `M${points[0].x},${100 - points[0].y}`;
  points.forEach((p) => (d += ` L${p.x},${100 - p.y}`));
  const areaD = `${d} V100 H0 Z`;

  // Axis lines
  const dates = [
    "01-01-2018",
    "02-01-2018",
    "03-01-2018",
    "04-01-2018",
    "05-01-2018",
    "06-01-2018",
    "07-01-2018",
    "08-01-2018",
    "09-01-2018",
    "10-01-2018",
  ];

  return (
    <div className="bg-white px-6 py-4 border-r border-b border-gray-200 h-full flex flex-col">
      <h3 className="text-sm font-bold text-black">Operators Available</h3>
      <div className="flex-1 relative mt-4 ml-6 border-l border-b border-gray-400">
        {/* Y Axis */}
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[8px] text-gray-500 h-full">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={areaD} fill="#1a3e5c" opacity="0.9" />
          <path d={d} fill="none" stroke="#fff" strokeWidth="0.5" />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={100 - p.y}
              r="1.5"
              fill="white"
              stroke="#1a3e5c"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between ml-6 mt-1 text-[7px] text-gray-500 -rotate-45 origin-top-left h-8">
        {dates.map((d, i) => (
          <span key={i} className="w-full text-center block mt-2">
            {d}
          </span>
        ))}
      </div>
      <div className="text-center text-[9px] font-bold mt-2">
        Operators Available
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Dashboard
// ----------------------------------------------------------------------

const PWIP = ({ onBack }) => {
  const navigate = useNavigate();
  const [isBotOpen, setIsBotOpen] = useState(false);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-auto z-[100]">
      {/* Header mimics standard window/app header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 rounded text-black text-sm font-bold border border-black px-3 bg-[#0d1e35] text-white"
          >
            ← Back
          </button>
          <div className="text-sm text-gray-500">
            <span className="font-bold text-black">PWIP</span> [1 / 3]
          </div>
        </div>
        <div className="flex bg-gray-100 rounded p-1 gap-2">
          <span className="text-xs px-2">100%</span>
        </div>
        <button
          onClick={handleBack}
          className="text-red-500 hover:bg-gray-100 p-1"
        >
          ✕
        </button>
      </div>

      {/* Dashboard Container - White Paper Look */}
      <div className="flex-1 flex justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-[1200px] bg-white shadow-2xl min-h-[900px] p-10 flex flex-col relative">
          {/* Dashboard Title */}
          <div className="mb-8 relative border-l-4 border-gray-400 pl-4 py-1">
            <h1 className="text-3xl font-normal text-black">
              Manufacturing KPI Dashboard Showing Production...
            </h1>
            {/* Top-left corner graphic partial simulation */}
            <div className="absolute -top-1 -left-[5px] w-6 h-1 bg-gray-400"></div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-3 grid-rows-3 flex-1 border-t border-l border-gray-200">
            {/* Row 1 */}
            <div className="h-48 border-r border-b border-gray-200">
              <TopMetricCard
                title="Units YTD"
                subtitle="Units produced"
                value="345,144.00"
                target="350,000.00"
                percentage="-5%"
                isPositive={false}
                chartType="blue"
                dataPoints={[20, 25, 23, 27, 26, 22, 24]}
              />
            </div>
            <div className="h-48 border-r border-b border-gray-200">
              <TopMetricCard
                title="Units : lost"
                subtitle="Units loss"
                value="380"
                chartType="dark"
                dataPoints={[50, 40, 35, 38, 45, 52, 55]}
              />
            </div>
            <div className="h-48 border-r border-b border-gray-200">
              <TopMetricCard
                title="Overall Plant Productivity"
                subtitle="Productivity"
                value="80.15%"
                target="82.10%"
                percentage="5%"
                isPositive={true}
                chartType="dark"
                dataPoints={[40, 42, 41, 44, 43, 45, 46]}
              />
            </div>

            {/* Row 2 */}
            <div className="h-64 border-r border-b border-gray-200">
              <HorizontalBarChart
                title="Production Rate : Machine"
                subtitle="Units produced"
                showYear={true}
                data={[
                  { label: "Machine-A", value: 25, color: "#002f4b" },
                  { label: "Machine-B", value: 35, color: "#2083b8" },
                  { label: "Machine-C", value: 100, color: "#58b9c9" },
                ]}
              />
            </div>
            <div className="h-64 border-r border-b border-gray-200">
              <DonutChart />
            </div>
            <div className="h-64 border-r border-b border-gray-200">
              <GroupedBarChart title="Productivity By : Machine" />
            </div>

            {/* Row 3 */}
            <div className="h-64 border-r border-b border-gray-200">
              <AreaChartDots />
            </div>
            <div className="h-64 border-r border-b border-gray-200">
              <GroupedBarChart
                title="Units Lost : Machine"
                subtitle="Units loss"
                showYAxis={true}
              />
            </div>
            <div className="h-64 border-r border-b border-gray-200">
              <HorizontalBarChart
                title="Overall Productivity :YTD"
                subtitle="Productivity"
                showYear={true}
                data={[
                  { label: "Machine-A", value: 90, color: "#002f4b" },
                  { label: "Machine-B", value: 80, color: "#2083b8" },
                  { label: "Machine-C", value: 50, color: "#58b9c9" },
                ]}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500 italic font-serif">
            This graph/chart is linked to excel, and changes automatically based
            on data. Just left click on it and select "Edit Data".
          </div>
        </div>
      </div>

      {/* AI Bot Integration */}
      <button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-6 right-6 z-[102] w-14 h-14 bg-gradient-to-tr from-[#002f4b] to-[#2083b8] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <MessageCircle className="relative z-10" size={24} />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="PWIP Dashboard"
        />
      )}
    </div>
  );
};

export default PWIP;
