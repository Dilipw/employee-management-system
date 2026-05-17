import {
    useEffect,
    useState
} from "react"

import MainLayout from "../layouts/MainLayout"

import {
    getEmployees
} from "../services/employeeService"


function EmployeesPage() {

    const [employees, setEmployees] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const [page, setPage] = useState(1)

    const [limit] = useState(5)

    const [total, setTotal] = useState(0)


    const fetchEmployees =
        async () => {

            try {

                setLoading(true)

                setError("")

                const response =
                    await getEmployees(
                        page,
                        limit
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

    }, [page])


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

                                                    </tr>
                                                ))

                                            ) : (

                                                <tr>

                                                    <td
                                                        colSpan="4"
                                                        className="p-10 text-center text-slate-500"
                                                    >

                                                        No employees found

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

                        Total Employees: {total}

                    </p>


                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                setPage(page - 1)
                            }
                            disabled={page === 1}
                            className="px-5 py-2 rounded-xl bg-slate-200 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() =>
                                setPage(page + 1)
                            }
                            disabled={
                                page * limit >= total
                            }
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>
    )
}

export default EmployeesPage