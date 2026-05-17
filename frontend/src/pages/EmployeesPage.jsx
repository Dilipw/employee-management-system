import { useEffect, useState, useCallback } from "react"
import MainLayout from "../layouts/MainLayout"
import { getEmployees, updateEmployee, deleteEmployee } from "../services/employeeService"

// ─── Toast Component ────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3500)
        return () => clearTimeout(t)
    }, [onClose])

    const isSuccess = type === "success"
    return (
        <div className="fixed top-5 right-5 z-[100] animate-slide-in">
            <div
                className={[
                    "flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl min-w-72 max-w-sm",
                    isSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white",
                ].join(" ")}
            >
                <span className="text-xl mt-0.5">{isSuccess ? "✓" : "✕"}</span>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{isSuccess ? "Success" : "Error"}</p>
                    <p className="text-xs opacity-90 mt-0.5">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="opacity-70 hover:opacity-100 text-lg leading-none mt-0.5 cursor-pointer"
                >
                    ×
                </button>
            </div>
        </div>
    )
}

// ─── Validation ──────────────────────────────────────────────────────────────
function validateEmployee(emp) {
    const errors = {}
    if (!emp.full_name?.trim()) errors.full_name = "Full name is required"
    if (!emp.email?.trim()) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(emp.email)) {
        errors.email = "Invalid email address"
    }
    if (!emp.phone?.trim()) {
        errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(emp.phone.trim())) {
        errors.phone = "Phone number must be exactly 10 digits"
    }
    if (!emp.department?.trim()) errors.department = "Department is required"
    if (!emp.designation?.trim()) errors.designation = "Designation is required"
    return errors
}

// ─── Field Component ─────────────────────────────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
                {label} <span className="text-red-500">*</span>
            </label>
            {children}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}

const INPUT_CLS =
    "w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"

const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing"]

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({ onCancel, onConfirm, loading }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl">
                        🗑️
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Delete Employee</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            This action cannot be undone. Are you sure?
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-sm transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? "Deleting…" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Update Modal ─────────────────────────────────────────────────────────────
function UpdateModal({ employee, onCancel, onSave, loading }) {
    const [form, setForm] = useState({ ...employee })
    const [errors, setErrors] = useState({})

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validateEmployee(form)
        if (Object.keys(errs).length) { setErrors(errs); return }
        setErrors({})
        onSave({ ...form, is_active: form.is_active === true || form.is_active === "true" })
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-900">Update Employee</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Edit the employee details below</p>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-6 py-4">
                    <form id="update-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Full Name" error={errors.full_name}>
                                <input
                                    type="text"
                                    value={form.full_name}
                                    onChange={set("full_name")}
                                    placeholder="John Doe"
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <Field label="Email Address" error={errors.email}>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={set("email")}
                                    placeholder="john@company.com"
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <Field label="Phone Number" error={errors.phone}>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={set("phone")}
                                    placeholder="10-digit number"
                                    maxLength={10}
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <Field label="Department" error={errors.department}>
                                <select
                                    value={form.department}
                                    onChange={set("department")}
                                    className={INPUT_CLS}
                                >
                                    <option value="">Select department</option>
                                    {DEPARTMENTS.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Designation" error={errors.designation}>
                                <input
                                    type="text"
                                    value={form.designation}
                                    onChange={set("designation")}
                                    placeholder="e.g. Senior Developer"
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={String(form.is_active)}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, is_active: e.target.value === "true" }))
                                    }
                                    className={INPUT_CLS}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 pt-4 pb-6 border-t border-slate-100 flex-shrink-0 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="update-form"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function EmployeesPage() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null) // { message, type }
    const [validationErrors, setValidationErrors] = useState({})
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("")
    const [editingEmployee, setEditingEmployee] = useState(null)
    const [deleteEmployeeId, setDeleteEmployeeId] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const showToast = (message, type = "success") => setToast({ message, type })

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getEmployees(page, limit, search, department)
            setEmployees(response.data)
            setTotal(response.total)
        } catch (err) {
            const detail = err.response?.data?.detail
            showToast(
                Array.isArray(detail) ? detail[0]?.msg : detail || "Failed to load employees",
                "error"
            )
        } finally {
            setLoading(false)
        }
    }, [page, limit, search, department])

    useEffect(() => { fetchEmployees() }, [fetchEmployees])

    const handleDelete = async () => {
        try {
            setDeleteLoading(true)
            await deleteEmployee(deleteEmployeeId)
            setDeleteEmployeeId(null)
            showToast("Employee deleted successfully")
            await fetchEmployees()
        } catch (err) {
            const detail = err.response?.data?.detail
            showToast(
                Array.isArray(detail) ? detail[0]?.msg : detail || "Delete failed",
                "error"
            )
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleUpdate = async (data) => {
        try {
            setUpdateLoading(true)
            await updateEmployee(data.id, data)
            setEditingEmployee(null)
            showToast("Employee updated successfully")
            await fetchEmployees()
        } catch (err) {
            const detail = err.response?.data?.detail
            showToast(
                Array.isArray(detail) ? detail[0]?.msg : detail || "Update failed",
                "error"
            )
        } finally {
            setUpdateLoading(false)
        }
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <MainLayout>
            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">

                {/* ── Header ── */}
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Employees
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Manage employee records and operations
                    </p>
                </div>

                {/* ── Filters ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Search Employee
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => { setPage(1); setSearch(e.target.value) }}
                                className={INPUT_CLS}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Filter by Department
                            </label>
                            <select
                                value={department}
                                onChange={(e) => { setPage(1); setDepartment(e.target.value) }}
                                className={INPUT_CLS}
                            >
                                <option value="">All Departments</option>
                                {DEPARTMENTS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Table (desktop) / Cards (mobile) ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="py-16 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-slate-500 mt-3 text-sm">Loading employees…</p>
                        </div>
                    ) : employees.length === 0 ? (
                        <div className="py-16 text-center text-slate-400">
                            <div className="text-5xl mb-3">👥</div>
                            <p className="font-medium">No employees found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            {["Name", "Email", "Phone", "Department", "Designation", "Status", "Actions"].map((h) => (
                                                <th key={h} className="text-left px-5 py-4 font-semibold text-slate-600 whitespace-nowrap">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((emp) => (
                                            <tr key={emp.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{emp.full_name}</td>
                                                <td className="px-5 py-4 text-slate-600">{emp.email}</td>
                                                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{emp.phone}</td>
                                                <td className="px-5 py-4 text-slate-600">{emp.department}</td>
                                                <td className="px-5 py-4 text-slate-600">{emp.designation}</td>
                                                <td className="px-5 py-4">
                                                    <span className={[
                                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                                                        emp.is_active
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-red-100 text-red-600"
                                                    ].join(" ")}>
                                                        <span className={[
                                                            "w-1.5 h-1.5 rounded-full",
                                                            emp.is_active ? "bg-emerald-500" : "bg-red-500"
                                                        ].join(" ")} />
                                                        {emp.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingEmployee(emp)}
                                                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteEmployeeId(emp.id)}
                                                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-slate-100">
                                {employees.map((emp) => (
                                    <div key={emp.id} className="p-4 space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-bold text-slate-900">{emp.full_name}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{emp.email}</p>
                                            </div>
                                            <span className={[
                                                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0",
                                                emp.is_active
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-red-100 text-red-600"
                                            ].join(" ")}>
                                                <span className={[
                                                    "w-1.5 h-1.5 rounded-full",
                                                    emp.is_active ? "bg-emerald-500" : "bg-red-500"
                                                ].join(" ")} />
                                                {emp.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                                            <div>
                                                <span className="block font-semibold text-slate-400 uppercase tracking-wide text-[10px]">Phone</span>
                                                {emp.phone}
                                            </div>
                                            <div>
                                                <span className="block font-semibold text-slate-400 uppercase tracking-wide text-[10px]">Dept</span>
                                                {emp.department}
                                            </div>
                                            <div>
                                                <span className="block font-semibold text-slate-400 uppercase tracking-wide text-[10px]">Role</span>
                                                {emp.designation}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            <button
                                                onClick={() => setEditingEmployee(emp)}
                                                className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteEmployeeId(emp.id)}
                                                className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* ── Pagination ── */}
                {!loading && employees.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-semibold text-slate-700">
                                {(page - 1) * limit + 1}–{Math.min(page * limit, total)}
                            </span>{" "}
                            of <span className="font-semibold text-slate-700">{total}</span> employees
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                ← Prev
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                .reduce((acc, p, idx, arr) => {
                                    if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…")
                                    acc.push(p)
                                    return acc
                                }, [])
                                .map((p, i) =>
                                    p === "…" ? (
                                        <span key={`dot-${i}`} className="px-1 text-slate-400 text-sm">…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={[
                                                "w-9 h-9 rounded-xl text-sm font-semibold transition cursor-pointer",
                                                p === page
                                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700",
                                            ].join(" ")}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Delete Modal ── */}
            {deleteEmployeeId && (
                <DeleteModal
                    onCancel={() => setDeleteEmployeeId(null)}
                    onConfirm={handleDelete}
                    loading={deleteLoading}
                />
            )}

            {/* ── Update Modal ── */}
            {editingEmployee && (
                <UpdateModal
                    employee={editingEmployee}
                    onCancel={() => setEditingEmployee(null)}
                    onSave={handleUpdate}
                    loading={updateLoading}
                />
            )}
        </MainLayout>
    )
}

export default EmployeesPage