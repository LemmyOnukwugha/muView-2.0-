export const reqMethod = async (url, method, body) => {
  const token = localStorage.getItem("token")
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token ? token : ""}`,
    },
    method: method,
    body: JSON.stringify(body),
  })
  if (!res.ok) throw Error()
  const data = await res.json()
  return data
}
