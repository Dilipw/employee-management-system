import api from "../api/axios"


export const loginEmployee = async (data) => {

  const response = await api.post(
    "/employees/login",
    data,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      }
    }
  )

  return response.data
}


export const getEmployees = async (
  page = 1,
  limit = 5,
  search = "",
  department = ""
) => {

  const response = await api.get(
    "/employees",
    {
      params: {
        page,
        limit,
        search,
        department
      }
    }
  )

  return response.data
}

export const getLoggedInEmployee =
  async () => {

    const response = await api.get(
      "/employees/me"
    )

    return response.data
}

export const updateEmployee = async (
    employeeId,
    data
) => {

    const response = await api.put(
        `/employees/${employeeId}`,
        data
    )

    return response.data
}


export const deleteEmployee = async (
    employeeId
) => {

    const response = await api.delete(
        `/employees/${employeeId}`
    )

    return response.data
}