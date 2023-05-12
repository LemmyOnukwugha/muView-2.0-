export const reqMethod = async (
  url,
  method,

  body,
  isFormData = false
) => {
  const token = localStorage.getItem("token")
  const res = await fetch(url, {
    headers: {
      "Content-Type": isFormData ? "mmultipart/form" : "application/json",
      authorization: `Bearer ${token ? token : ""}`,
    },
    method: method,
    body: isFormData ? body : JSON.stringify(body),
  })
  if (!res.ok) throw Error()
  const data = await res.json()
  return data
}
