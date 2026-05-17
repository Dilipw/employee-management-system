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

    const [employees, setEmployees] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const [page, setPage] = useState(1)

    const [limit] = useState(5)

    const [total, setTotal] = useState(0)

    const [editingEmployee, setEditingEmployee] =
        useState(null)

    const [deleteLoading, setDeleteLoading] =
        useState(false)

    const [updateLoading, setUpdateLoading] =
        useState(false)

    const [search, setSearch] = useState("")

    const [department, setDepartment] =
        useState("")

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

                setError(
                    error.response?.data?.detail
                    || "Failed to load employees"
                )

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

    const handleDelete =
        async (employeeId) => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this employee?"
                )

            if (!confirmDelete) return

            try {

                setDeleteLoading(true)

                await deleteEmployee(employeeId)

                await fetchEmployees()

            } catch (error) {

                alert(
                    error.response?.data?.detail
                    || "Delete failed"
                )

            } finally {

                setDeleteLoading(false)
            }
        }

    const handleUpdate =
        async (e) => {

            e.preventDefault()

            try {

                setUpdateLoading(true)

                await updateEmployee(
                    editingEmployee.id,
                    editingEmployee
                )

                setEditingEmployee(null)

                await fetchEmployees()

            } catch (error) {

                alert(
                    error.response?.data?.detail
                    || "Update failed"
                )

            } finally {

                setUpdateLoading(false)
            }
        }
    return (

        <MainLayout>

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


                        {/* Department Filter */}
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

                {/* Error */}
                {
                    error && (

                        <div className="bg-red-100 text-red-600 p-4 rounded-2xl">

                            {error}

                        </div>
                    )
                }


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
                                                                        handleDelete(employee.id)
                                                                    }
                                                                    disabled={deleteLoading}
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
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
                                                        colSpan="4"
                                                        className="p-10 text-center text-slate-500"
                                                    >

                                                        <div className="flex flex-col items-center justify-center py-10">

                                                            <h3 className="text-2xl font-bold text-slate-700 mb-3">

                                                                No Employees Found

                                                            </h3>

                                                            <p className="text-slate-500">

                                                                Try adjusting search or filter criteria.

                                                            </p>

                                                        </div>

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
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                    <div>

                        <p className="text-slate-500 font-medium">

                            Showing page {page}

                            {" "}of{" "}

                            {Math.ceil(total / limit)}

                        </p>

                        <p className="text-slate-400 text-sm mt-1">

                            Total Employees: {total}

                        </p>

                    </div>


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


                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg">

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
            {
                editingEmployee && (

                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">

                        <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl">

                            <h2 className="text-3xl font-bold mb-8">

                                Update Employee

                            </h2>


                            <form
                                onSubmit={handleUpdate}
                                className="space-y-5"
                            >

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
                                    className="w-full border border-slate-300 p-4 rounded-2xl"
                                />


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
                                    className="w-full border border-slate-300 p-4 rounded-2xl"
                                />


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
                                    className="w-full border border-slate-300 p-4 rounded-2xl"
                                />


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