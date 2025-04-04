import { 
  users, type User, type InsertUser,
  userPreferences, type UserPreferences, type InsertUserPreferences,
  bookmarks, type Bookmark, type InsertBookmark 
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

// The IStorage interface remains the same
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User preferences methods
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  createUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(userId: number, prefs: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined>;
  
  // Bookmark methods
  getBookmarks(userId: number): Promise<Bookmark[]>;
  getBookmark(id: number): Promise<Bookmark | undefined>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<boolean>;
}

// Implementation using the PostgreSQL database
export class DatabaseStorage implements IStorage {
  constructor() {
    // Create a default user and preferences if they don't exist
    this.initializeDefaultUser().catch(err => 
      console.error("Failed to create default user:", err)
    );
  }

  private async initializeDefaultUser() {
    // Check if the default user exists
    const existingUser = await this.getUserByUsername("guest");
    
    if (!existingUser) {
      // Create the default user
      const user = await this.createUser({ username: "guest", password: "guest" });
      
      // Create default preferences
      await this.createUserPreferences({
        userId: user.id,
        currentSura: 1,
        currentAyah: 1,
        fontSize: 3,
        scrollSpeed: 5,
        darkMode: false
      });
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // User preferences methods
  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    const result = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences> {
    // Ensure all required fields are present with defaults if not provided
    const prefsWithDefaults = {
      userId: prefs.userId,
      currentSura: prefs.currentSura ?? 1,
      currentAyah: prefs.currentAyah ?? 1,
      fontSize: prefs.fontSize ?? 3,
      scrollSpeed: prefs.scrollSpeed ?? 5,
      darkMode: prefs.darkMode ?? false
    };
    
    const result = await db.insert(userPreferences).values(prefsWithDefaults).returning();
    return result[0];
  }

  async updateUserPreferences(userId: number, updates: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined> {
    // First, get the existing preferences
    const existingPrefs = await this.getUserPreferences(userId);
    
    if (!existingPrefs) return undefined;
    
    // Update the preferences with new values
    const result = await db
      .update(userPreferences)
      .set(updates)
      .where(eq(userPreferences.userId, userId))
      .returning();
    
    return result.length > 0 ? result[0] : undefined;
  }

  // Bookmark methods
  async getBookmarks(userId: number): Promise<Bookmark[]> {
    const result = await db.select().from(bookmarks).where(eq(bookmarks.userId, userId));
    return result;
  }

  async getBookmark(id: number): Promise<Bookmark | undefined> {
    const result = await db.select().from(bookmarks).where(eq(bookmarks.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    // Ensure required fields have defaults
    const bookmarkWithDefaults = {
      ...bookmark,
      createdAt: bookmark.createdAt ?? new Date().toISOString()
    };
    
    const result = await db.insert(bookmarks).values(bookmarkWithDefaults).returning();
    return result[0];
  }

  async deleteBookmark(id: number): Promise<boolean> {
    const result = await db.delete(bookmarks).where(eq(bookmarks.id, id)).returning();
    return result.length > 0;
  }
}

// Export a singleton instance of the database storage
export const storage = new DatabaseStorage();
