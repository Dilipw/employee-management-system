import {
    useEffect,
    useState
} from "react"

import MainLayout from "../layouts/MainLayout"

import {
    getEmployees,
    updateEmployee,
    deleteEmployee
} from "../services/employeeService"


function EmployeesPage() {

    // ==========================================
    // States
    // ==========================================
    const [employees, setEmployees] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")

    const [successMessage, setSuccessMessage] =
        useState("")

    const [validationErrors, setValidationErrors] =
        useState({})

    const [page, setPage] =
        useState(1)

    const [limit] =
        useState(5)

    const [total, setTotal] =
        useState(0)

    const [search, setSearch] =
        useState("")

    const [department, setDepartment] =
        useState("")

    const [editingEmployee, setEditingEmployee] =
        useState(null)

    const [deleteEmployeeId, setDeleteEmployeeId] =
        useState(null)

    const [deleteLoading, setDeleteLoading] =
        useState(false)

    const [updateLoading, setUpdateLoading] =
        useState(false)


    // ==========================================
    // Fetch Employees
    // ==========================================
    const fetchEmployees =
        async () => {

            try {

                setLoading(true)

                setError("")

                const response =
                    await getEmployees(
                        page,
                        limit,
                        search,
                        department
                    )

                setEmployees(response.data)

                setTotal(response.total)

            } catch (error) {

                const apiError =
                    error.response?.data?.detail

                if (
                    Array.isArray(apiError)
                ) {

                    setError(
                        apiError[0]?.msg
                    )

                } else {

                    setError(
                        apiError
                        || "Failed to load employees"
                    )
                }

            } finally {

                setLoading(false)
            }
        }


    useEffect(() => {

        fetchEmployees()

    }, [
        page,
        search,
        department
    ])


    // ==========================================
    // Delete Employee
    // ==========================================
    const handleDelete =
        async () => {

            try {

                setDeleteLoading(true)

                await deleteEmployee(
                    deleteEmployeeId
                )

                setDeleteEmployeeId(null)

                setSuccessMessage(
                    "Employee deleted successfully"
                )

                await fetchEmployees()

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)

            } catch (error) {

                const apiError =
                    error.response?.data?.detail

                if (
                    Array.isArray(apiError)
                ) {

                    setError(
                        apiError[0]?.msg
                    )

                } else {

                    setError(
                        apiError
                        || "Delete failed"
                    )
                }

                setTimeout(() => {

                    setError("")

                }, 3000)

            } finally {

                setDeleteLoading(false)
            }
        }


    // ==========================================
    // Update Employee
    // ==========================================
    const handleUpdate =
        async (e) => {

            e.preventDefault()

            const errors = {}

            // Full Name Validation
            if (
                !editingEmployee.full_name.trim()
            ) {

                errors.full_name =
                    "Full name is required"
            }
            // Email Validation
            if (
                !editingEmployee.email.trim()
            ) {

                errors.email =
                    "Email is required"

            } else if (
                !/\S+@\S+\.\S+/.test(
                    editingEmployee.email
                )
            ) {

                errors.email =
                    "Invalid email address"
            }
            // Phone Validation
            if (
                !editingEmployee.phone.trim()
            ) {

                errors.phone =
                    "Phone number is required"

            } else if (
                editingEmployee.phone.length !== 10
            ) {

                errors.phone =
                    "Phone number must be 10 digits"
            }

            // Department Validation
            if (
                !editingEmployee.department.trim()
            ) {

                errors.department =
                    "Department is required"
            }

            // Designation Validation
            if (
                !editingEmployee.designation.trim()
            ) {

                errors.designation =
                    "Designation is required"
            }

            // Stop Validation
            if (
                Object.keys(errors).length > 0
            ) {

                setValidationErrors(errors)

                return
            }

            setValidationErrors({})

            try {

                setUpdateLoading(true)

                setError("")

                await updateEmployee(
                    editingEmployee.id,
                    editingEmployee
                )

                setEditingEmployee(null)

                setSuccessMessage(
                    "Employee updated successfully"
                )

                await fetchEmployees()

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)

            } catch (error) {

                const apiError =
                    error.response?.data?.detail

                if (
                    Array.isArray(apiError)
                ) {

                    setError(
                        apiError[0]?.msg
                    )

                } else {

                    setError(
                        apiError
                        || "Update failed"
                    )
                }

                setTimeout(() => {

                    setError("")

                }, 3000)

            } finally {

                setUpdateLoading(false)
            }
        }


    return (

        <MainLayout>

            {/* Success Popup */}
            {
                successMessage && (

                    <div className="fixed top-6 right-6 z-50">

                        <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px]">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">

                                    ✓

                                </div>

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Success

                                    </h3>

                                    <p className="text-sm text-green-50">

                                        {successMessage}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                )
            }


            {/* Error Popup */}
            {
                error && (

                    <div className="fixed top-6 right-6 z-50">

                        <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px]">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">

                                    !

                                </div>

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Error

                                    </h3>

                                    <p className="text-sm text-red-50">

                                        {error}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                )
            }


            <div className="space-y-8">


                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-black text-slate-900">

                            Employees

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Manage employee records and operations

                        </p>

                    </div>

                </div>


                {/* Filters */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">

                    <div className="grid md:grid-cols-2 gap-5">


                        {/* Search */}
                        <div>

                            <label className="block text-sm font-semibold text-slate-600 mb-3">

                                Search Employee

                            </label>

                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => {

                                    setPage(1)

                                    setSearch(e.target.value)
                                }}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />

                        </div>


                        {/* Department */}
                        <div>

                            <label className="block text-sm font-semibold text-slate-600 mb-3">

                                Filter By Department

                            </label>

                            <select
                                value={department}
                                onChange={(e) => {

                                    setPage(1)

                                    setDepartment(e.target.value)
                                }}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >

                                <option value="">
                                    All Departments
                                </option>

                                <option value="IT">
                                    IT
                                </option>

                                <option value="HR">
                                    HR
                                </option>

                                <option value="Finance">
                                    Finance
                                </option>

                                <option value="Marketing">
                                    Marketing
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* Table */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">

                    {
                        loading ? (

                            <div className="p-10 text-center text-slate-500">

                                Loading employees...

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-slate-50">

                                        <tr>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Name
                                            </th>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Email
                                            </th>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Department
                                            </th>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Designation
                                            </th>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Status
                                            </th>

                                            <th className="text-left p-5 font-semibold text-slate-600">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            employees.length > 0 ? (

                                                employees.map((employee) => (

                                                    <tr
                                                        key={employee.id}
                                                        className="border-t border-slate-100 hover:bg-slate-50 transition"
                                                    >

                                                        <td className="p-5 font-semibold text-slate-800">

                                                            {employee.full_name}

                                                        </td>

                                                        <td className="p-5 text-slate-600">

                                                            {employee.email}

                                                        </td>

                                                        <td className="p-5 text-slate-600">

                                                            {employee.department}

                                                        </td>

                                                        <td className="p-5 text-slate-600">

                                                            {employee.designation}

                                                        </td>

                                                        <td className="p-5">

                                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${employee.is_active
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-red-100 text-red-600"
                                                                }`}>

                                                                {
                                                                    employee.is_active
                                                                        ? "Active"
                                                                        : "Inactive"
                                                                }

                                                            </span>

                                                        </td>

                                                        <td className="p-5">

                                                            <div className="flex gap-3">

                                                                <button
                                                                    onClick={() =>
                                                                        setEditingEmployee(employee)
                                                                    }
                                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                                                                >
                                                                    Update
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        setDeleteEmployeeId(employee.id)
                                                                    }
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                                                                >
                                                                    Delete
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                ))

                                            ) : (

                                                <tr>

                                                    <td
                                                        colSpan="6"
                                                        className="p-10 text-center text-slate-500"
                                                    >

                                                        No Employees Found

                                                    </td>

                                                </tr>
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>
                        )
                    }

                </div>


                {/* Pagination */}
                <div className="flex items-center justify-between">

                    <p className="text-slate-500">

                        Total Employees:
                        {" "}
                        {total}

                    </p>


                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                setPage(page - 1)
                            }
                            disabled={page === 1}
                            className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 transition disabled:opacity-50"
                        >
                            Previous
                        </button>


                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-2xl font-semibold">

                            {page}

                        </div>


                        <button
                            onClick={() =>
                                setPage(page + 1)
                            }
                            disabled={
                                page >= Math.ceil(total / limit)
                            }
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>


            {/* Delete Modal */}
            {
                deleteEmployeeId && (

                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-6">

                        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">

                            <h2 className="text-3xl font-bold mb-4 text-center">

                                Delete Employee

                            </h2>

                            <p className="text-slate-500 text-center mb-8">

                                Are you sure you want to delete this employee?

                            </p>

                            <div className="flex gap-4">

                                <button
                                    onClick={() =>
                                        setDeleteEmployeeId(null)
                                    }
                                    className="flex-1 bg-slate-200 py-4 rounded-2xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl"
                                >

                                    {
                                        deleteLoading
                                            ? "Deleting..."
                                            : "Delete"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>
                )
            }


            {/* Update Modal */}
            {
                editingEmployee && (

                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-6">

                        <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl">

                            <h2 className="text-3xl font-bold mb-8">

                                Update Employee

                            </h2>


                            <form
                                onSubmit={handleUpdate}
                                className="space-y-5"
                            >


                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                                        Full Name
                                        <span className="text-red-500 ml-1">*</span>

                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={editingEmployee.full_name}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                full_name: e.target.value
                                            })
                                        }
                                        className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                    />

                                    {
                                        validationErrors.full_name && (

                                            <p className="text-red-500 text-sm mt-2">

                                                {validationErrors.full_name}

                                            </p>
                                        )
                                    }

                                </div>
                                {/* Email */}
                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                                        Email Address
                                        <span className="text-red-500 ml-1">*</span>

                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={editingEmployee.email}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                email: e.target.value
                                            })
                                        }
                                        className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                    />

                                    {
                                        validationErrors.email && (

                                            <p className="text-red-500 text-sm mt-2">

                                                {validationErrors.email}

                                            </p>
                                        )
                                    }

                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                                        Phone Number
                                        <span className="text-red-500 ml-1">*</span>

                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={editingEmployee.phone}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                phone: e.target.value
                                            })
                                        }
                                        className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                    />

                                    {
                                        validationErrors.phone && (

                                            <p className="text-red-500 text-sm mt-2">

                                                {validationErrors.phone}

                                            </p>
                                        )
                                    }

                                </div>


                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                                        Department
                                        <span className="text-red-500 ml-1">*</span>

                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Department"
                                        value={editingEmployee.department}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                department: e.target.value
                                            })
                                        }
                                        className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                    />

                                    {
                                        validationErrors.department && (

                                            <p className="text-red-500 text-sm mt-2">

                                                {validationErrors.department}

                                            </p>
                                        )
                                    }

                                </div>


                                {/* Designation */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">

                                        Designation
                                        <span className="text-red-500 ml-1">*</span>

                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Designation"
                                        value={editingEmployee.designation}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                designation: e.target.value
                                            })
                                        }
                                        className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                    />

                                    {
                                        validationErrors.designation && (

                                            <p className="text-red-500 text-sm mt-2">

                                                {validationErrors.designation}

                                            </p>
                                        )
                                    }

                                </div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">

                                    Status
                                    <span className="text-red-500 ml-1">*</span>

                                </label>
                                {/* Status */}
                                <select
                                    value={editingEmployee.is_active}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            is_active:
                                                e.target.value === "true"
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                >

                                    <option value={true}>
                                        Active
                                    </option>

                                    <option value={false}>
                                        Inactive
                                    </option>

                                </select>


                                {/* Buttons */}
                                <div className="flex justify-end gap-4 pt-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingEmployee(null)
                                        }
                                        className="px-6 py-3 rounded-2xl bg-slate-200"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={updateLoading}
                                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                    >

                                        {
                                            updateLoading
                                                ? "Updating..."
                                                : "Update Employee"
                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )
            }

        </MainLayout>
    )
}

export default EmployeesPage