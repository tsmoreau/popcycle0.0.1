import { MongoClient, ObjectId } from 'mongodb';
import { User } from './schemas';

// Get MongoDB connection
async function getDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  return { client, db: client.db('PopCycle') };
}

// Get user by email address
export async function getUserByEmail(email: string): Promise<User | null> {
  const { client, db } = await getDatabase();
  
  try {
    const user = await db.collection('users').findOne({ email }) as User | null;
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  } finally {
    await client.close();
  }
}

// Create or update user from OAuth signin
export async function createOrUpdateUser(authData: {
  name: string;
  email: string;
  image?: string;
}): Promise<User> {
  const { client, db } = await getDatabase();
  
  try {
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: authData.email }) as User | null;
    
    if (existingUser) {
      // Update existing user with latest auth data
      const updateData = {
        name: authData.name,
        updatedAt: new Date()
      };
      
      await db.collection('users').updateOne(
        { _id: existingUser._id },
        { $set: updateData }
      );
      
      return { ...existingUser, ...updateData };
    } else {
      // Create new user with default values
      const newUser: User = {
        _id: new ObjectId(),
        name: authData.name,
        email: authData.email,
        userType: 'user', // Default user type
        skillLevel: 'beginner',
        itemsAssembled: 0,
        totalHoursLogged: 0,
        favoriteProducts: [],
        assemblyStories: [],
        permissions: [],
        assignedRoutes: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Check if this is the super admin email
      if (authData.email === 'terrencestasse@gmail.com') {
        newUser.userType = 'super_admin';
        newUser.permissions = ['admin', 'operations', 'crm', 'financial', 'partner'];
      }
      
      await db.collection('users').insertOne(newUser);
      return newUser;
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Get user permissions based on userType and explicit permissions
export function getUserPermissions(user: User): string[] {
  const basePermissions = user.permissions || [];
  
  // Add role-based permissions
  switch (user.userType) {
    case 'super_admin':
      return Array.from(new Set([...basePermissions, 'admin', 'operations', 'crm', 'financial', 'partner']));
    case 'admin':
      return Array.from(new Set([...basePermissions, 'admin', 'operations', 'crm']));
    case 'staff':
      return Array.from(new Set([...basePermissions, 'operations']));
    case 'partner_owner':
      return Array.from(new Set([...basePermissions, 'partner']));
    default:
      return basePermissions;
  }
}

// Check if user has specific permission
export function hasPermission(user: User, permission: string): boolean {
  const permissions = getUserPermissions(user);
  return permissions.includes(permission);
}

// Update user permissions
export async function updateUserPermissions(userId: ObjectId, permissions: string[]): Promise<boolean> {
  const { client, db } = await getDatabase();
  
  try {
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          permissions,
          updatedAt: new Date()
        }
      }
    );
    
    return result.matchedCount > 0;
  } catch (error) {
    console.error('Error updating user permissions:', error);
    return false;
  } finally {
    await client.close();
  }
}