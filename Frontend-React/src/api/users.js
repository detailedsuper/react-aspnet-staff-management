const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  })

  return response
}

async function readJson(response) {
  const text = await response.text()
  if (!text) return null
  return JSON.parse(text)
}

export async function getUsers() {
  const response = await request('/users')
  if (!response.ok) {
    throw new Error('Failed to load staff')
  }
  const data = await readJson(response)
  return Array.isArray(data) ? data : []
}

export async function getUserById(id) {
  const response = await request(`/users/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error('Failed to load staff member')
  }
  return readJson(response)
}

export async function createUser(payload) {
  const response = await request('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Create failed')
  }
  return readJson(response)
}

export async function updateUser(id, payload) {
  const response = await request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Update failed')
  }
  return readJson(response)
}

export async function deleteUser(id) {
  const response = await request(`/users/${id}`, {
    method: 'DELETE',
  })

  if (response.status === 204) {
    return true
  }

  if (!response.ok) {
    return false
  }

  const data = await readJson(response)
  if (typeof data === 'boolean') {
    return data
  }

  return true
}

export function toStaffPayload({ name, age, title }) {
  const payload = {
    name,
    age,
  }

  if (title !== undefined) {
    payload.title = title
  }

  return payload
}
