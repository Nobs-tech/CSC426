// Mock user database with sample credentials
export interface User {
  id: string
  username: string
  email: string
  passwordHash: string
  createdAt: Date
}

// In a real application, these would be stored in a database
// For this demo, we're using a mock database with pre-hashed passwords
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    // Hashed password: admin123
    passwordHash: '$2b$10$lEiSsWMIUcBGDaTLVYTFUeKkOSTYtCpqSe47q3ZYBN4bkILhFVdsq',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    // Hashed password: password123
    passwordHash: '$2b$10$EYE3Ys1JIQOBs8me64xfR.xT4RQR47nNXwCmJzBW4Kx7DthrEPEGa',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    username: 'test',
    email: 'test@example.com',
    // Hashed password: testpass123
    passwordHash: '$2b$10$L..R3xKpdpKEEq8D9vLZ3uSRROrBhQDN0r.XUidbjCtj5RYLJ5ECa',
    createdAt: new Date('2024-01-03'),
  },
]

export function findUserByUsername(username: string): User | undefined {
  return mockUsers.find((user) => user.username.toLowerCase() === username.toLowerCase())
}

export function findUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function addUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    ...user,
    id: String(mockUsers.length + 1),
    createdAt: new Date(),
  }
  mockUsers.push(newUser)
  return newUser
}
