import { Card, CardContent } from "../components/Card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { FaAndroid, FaApple, FaWindows, FaBug, FaGlobe } from "react-icons/fa";

const dataSummary = [
  {
    icon: <FaAndroid size={32} />,
    label: "Weekly Sales",
    value: "4.200.000",
    color: "bg-blue-100",
  },
  {
    icon: <FaApple size={32} />,
    label: "New Users",
    value: "34",
    color: "bg-blue-200",
  },
  {
    icon: <FaWindows size={32} />,
    label: "Item Orders",
    value: "28",
    color: "bg-yellow-200",
  },
  {
    icon: <FaGlobe size={32} />,
    label: "Lượt truy cập",
    value: "833",
    color: "bg-red-200",
  },
];

const websiteVisits = [
  //   { name: "Jan", TeamA: 30, TeamB: 50, TeamC: 20 },
  { name: "Feb", android: 106, ios: 144, "laptop/PC": 218 },
  { name: "Mar", android: 98, ios: 81, "laptop/PC": 186 },
  //   { name: "Apr", android: 0, ios: 0, TeamC: 0 },
  //   { name: "May", android: 0, ios: 0, TeamC: 0 },
  //   { name: "Jun", android: 0, ios: 0, TeamC: 0 },
];

const pieData = [
  { name: "America", value: 27.7, color: "#007bff" },
  { name: "Asia", value: 34.7, color: "#0056b3" },
  { name: "Europe", value: 9.2, color: "#ffcc00" },
  { name: "Africa", value: 28.4, color: "#ff4d4d" },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        {dataSummary.map((item, index) => (
          <Card
            key={index}
            className={`${item.color} p-4 flex flex-col items-center rounded-2xl shadow-md`}
          >
            {item.icon}
            <h3 className="text-lg font-semibold mt-2">{item.value}</h3>
            <p className="text-gray-600 text-sm">{item.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Website Visits</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={websiteVisits}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="android"
                stroke="#007bff"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="ios"
                stroke="#ffcc00"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="laptop/PC"
                stroke="#003366"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Current Visits</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
