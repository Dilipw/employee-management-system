import { useEffect, useState, useRef } from "react"
import MainLayout from "../layouts/MainLayout"
import { FaUsers, FaUserCheck, FaChartLine, FaDatabase, FaBuilding, FaUserTie, FaBolt } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { getEmployees } from "../services/employeeService"

// Animated counter hook
function useCountUp(target, duration = 1200, shouldStart = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!shouldStart || typeof target !== "number") return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [target, shouldStart, duration])
  return value
}

// Individual stat card with its own counter
function StatCard({ item, index, visible }) {
  const animated = useCountUp(
    typeof item.value === "number" ? item.value : 0,
    900 + index * 100,
    visible
  )

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.2s ease, translate 0.2s ease`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: item.iconBg }}
        >
          <span style={{ color: item.iconColor, fontSize: 20 }}>{item.icon}</span>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: item.badgeBg, color: item.badgeColor }}
        >
          {item.badge}
        </span>
      </div>

      {/* Value */}
      <div className="mb-1">
        <span className="text-3xl font-black text-slate-900 tabular-nums">
          {typeof item.value === "number" ? animated : item.value}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm text-slate-500 font-medium">{item.title}</p>

      {/* Bottom bar */}
      <div className="mt-4 h-1 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: item.barColor,
            width: visible ? item.barWidth : "0%",
            transition: `width 1s ease ${0.3 + index * 0.1}s`,
          }}
        />
      </div>
    </div>
  )
}

function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState([])
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [itEmployees, setItEmployees] = useState(0)
  const [hrEmployees, setHrEmployees] = useState(0)
  const [recentEmployees, setRecentEmployees] = useState([])
  const [error, setError] = useState("")
  const [cardsVisible, setCardsVisible] = useState(false)
  const [tableVisible, setTableVisible] = useState(false)
  const tableRef = useRef(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await getEmployees(1, 100)
      const employeeData = response.data || []
      setEmployees(employeeData)
      setTotalEmployees(response.total || 0)
      const itCount = employeeData.filter((e) => e.department === "IT").length
      const hrCount = employeeData.filter((e) => e.department === "HR").length
      setItEmployees(itCount)
      setHrEmployees(hrCount)
      setRecentEmployees(employeeData.slice(0, 5))
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load dashboard")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Trigger card animations shortly after load
  useEffect(() => {
    if (!loading) {
      const t1 = setTimeout(() => setCardsVisible(true), 80)
      const t2 = setTimeout(() => setTableVisible(true), 300)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [loading])

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <FaUsers />,
      iconBg: "#eff6ff",
      iconColor: "#3b82f6",
      badge: "All staff",
      badgeBg: "#eff6ff",
      badgeColor: "#2563eb",
      barColor: "#3b82f6",
      barWidth: "85%",
    },
    {
      title: "IT Department",
      value: itEmployees,
      icon: <FaDatabase />,
      iconBg: "#f0fdf4",
      iconColor: "#22c55e",
      badge: "Engineering",
      badgeBg: "#f0fdf4",
      badgeColor: "#16a34a",
      barColor: "#22c55e",
      barWidth: "60%",
    },
    {
      title: "HR Department",
      value: hrEmployees,
      icon: <FaBuilding />,
      iconBg: "#faf5ff",
      iconColor: "#a855f7",
      badge: "People ops",
      badgeBg: "#faf5ff",
      badgeColor: "#9333ea",
      barColor: "#a855f7",
      barWidth: "40%",
    },
    {
      title: "System Status",
      value: "Active",
      icon: <FaBolt />,
      iconBg: "#fff7ed",
      iconColor: "#f97316",
      badge: "Online",
      badgeBg: "#f0fdf4",
      badgeColor: "#16a34a",
      barColor: "#f97316",
      barWidth: "100%",
    },
  ]

  // Department pill colors
  const deptColors = {
    IT: { bg: "#eff6ff", color: "#2563eb" },
    HR: { bg: "#faf5ff", color: "#9333ea" },
    Finance: { bg: "#fff7ed", color: "#ea580c" },
    Marketing: { bg: "#fdf2f8", color: "#c026d3" },
  }

  const getDeptStyle = (dept) =>
    deptColors[dept] || { bg: "#f8fafc", color: "#475569" }

  // Avatar initials + color from name hash
  function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  }
  const avatarColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#22c55e"]
  function getAvatarColor(name = "") {
    let hash = 0
    for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) | 0
    return avatarColors[Math.abs(hash) % avatarColors.length]
  }

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">

        {/* ── Header Banner ── */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 lg:p-10"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e40af 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#60a5fa" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: "#818cf8" }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">
                Dashboard
              </p>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                Overview
              </h1>
              <p className="text-slate-300 text-base">
                Welcome back,{" "}
                <span className="text-white font-semibold">{user?.full_name}</span>
              </p>
            </div>

            {/* User card */}
            <div
              className="flex items-center gap-4 rounded-2xl px-5 py-4 border"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <FaUserTie />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">{user?.designation}</p>
                <p className="text-blue-300 text-sm">{user?.department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium">
            <span className="text-red-400">⚠</span>
            {error}
          </div>
        )}

        {/* ── Loading skeleton ── */}
        {loading ? (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-2xl h-40 animate-pulse"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <div className="bg-slate-100 rounded-2xl h-64 animate-pulse" />
          </div>
        ) : (
          <>
            {/* ── Stat Cards ── */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {stats.map((item, i) => (
                <StatCard key={i} item={item} index={i} visible={cardsVisible} />
              ))}
            </div>

            {/* ── Auth Status + Quick Info ── */}
            <div
              className="grid md:grid-cols-2 gap-5"
              style={{
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {/* Auth status */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Session
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="relative flex h-3 w-3"
                  >
                    {isAuthenticated && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: "#22c55e" }}
                      />
                    )}
                    <span
                      className="relative inline-flex rounded-full h-3 w-3"
                      style={{ background: isAuthenticated ? "#22c55e" : "#ef4444" }}
                    />
                  </span>
                  <p className="text-slate-800 font-semibold text-sm">
                    {isAuthenticated ? "Authenticated — session active" : "Authentication required"}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  {isAuthenticated ? "Your token is valid and active." : "Please log in to continue."}
                </p>
              </div>

              {/* Department breakdown mini-card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Department split
                </p>
                <div className="space-y-3">
                  {[
                    { label: "IT", count: itEmployees, color: "#3b82f6" },
                    { label: "HR", count: hrEmployees, color: "#a855f7" },
                    { label: "Other", count: Math.max(0, totalEmployees - itEmployees - hrEmployees), color: "#94a3b8" },
                  ].map((dept) => (
                    <div key={dept.label} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-500 w-8">{dept.label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            background: dept.color,
                            width: tableVisible && totalEmployees > 0
                              ? `${Math.round((dept.count / totalEmployees) * 100)}%`
                              : "0%",
                            transition: "width 1s ease 0.4s",
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-6 text-right tabular-nums">
                        {dept.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Recent Employees Table ── */}
            <div
              ref={tableRef}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              style={{
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              {/* Table header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Recent employees</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Last {recentEmployees.length} added to the system</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-500">
                  {recentEmployees.length} records
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-7 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Employee
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Department
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Designation
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEmployees.map((employee, i) => {
                      const avatarColor = getAvatarColor(employee.full_name)
                      const deptStyle = getDeptStyle(employee.department)
                      return (
                        <tr
                          key={employee.id}
                          className="border-t border-slate-50 hover:bg-slate-50/70 transition-colors duration-150 group"
                          style={{
                            opacity: tableVisible ? 1 : 0,
                            transition: `opacity 0.4s ease ${0.2 + i * 0.06}s`,
                          }}
                        >
                          {/* Employee */}
                          <td className="px-7 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style={{ background: avatarColor }}
                              >
                                {getInitials(employee.full_name)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                  {employee.full_name}
                                </p>
                                <p className="text-xs text-slate-400">{employee.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Department */}
                          <td className="px-4 py-4">
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                              style={{ background: deptStyle.bg, color: deptStyle.color }}
                            >
                              {employee.department}
                            </span>
                          </td>

                          {/* Designation */}
                          <td className="px-4 py-4 text-sm text-slate-600">
                            {employee.designation}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                              Active
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}
              <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/50">
                <p className="text-xs text-slate-400">
                  Showing {recentEmployees.length} of {totalEmployees} total employees
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default DashboardPage