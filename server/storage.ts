import { 
  users, type User, type InsertUser,
  userPreferences, type UserPreferences, type InsertUserPreferences,
  bookmarks, type Bookmark, type InsertBookmark 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userPreferences: Map<number, UserPreferences>;
  private bookmarks: Map<number, Bookmark>;
  private currentUserId: number;
  private currentPrefId: number;
  private currentBookmarkId: number;

  constructor() {
    this.users = new Map();
    this.userPreferences = new Map();
    this.bookmarks = new Map();
    this.currentUserId = 1;
    this.currentPrefId = 1;
    this.currentBookmarkId = 1;
    
    // Create a default user
    this.createUser({ username: "guest", password: "guest" })
      .then(user => {
        // Create default preferences for the user
        this.createUserPreferences({
          userId: user.id,
          currentSura: 1,
          currentAyah: 1,
          fontSize: 3,
          scrollSpeed: 5,
          darkMode: false,
          doNotDisturb: false
        });
      })
      .catch(err => console.error("Failed to create default user:", err));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // We'll create default preferences in the constructor for the first user
    return user;
  }

  // User preferences methods
  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    const allPrefs = Array.from(this.userPreferences.values());
    return allPrefs.find(pref => pref.userId === userId);
  }

  async createUserPreferences(prefs: InsertUserPreferences): Promise<UserPreferences> {
    const id = this.currentPrefId++;
    
    // Ensure all required fields are present
    const newPrefs: UserPreferences = { 
      id,
      userId: prefs.userId,
      currentSura: prefs.currentSura ?? 1,
      currentAyah: prefs.currentAyah ?? 1,
      fontSize: prefs.fontSize ?? 3,
      scrollSpeed: prefs.scrollSpeed ?? 5,
      darkMode: prefs.darkMode ?? false,
      doNotDisturb: prefs.doNotDisturb ?? false
    };
    
    this.userPreferences.set(id, newPrefs);
    return newPrefs;
  }

  async updateUserPreferences(userId: number, updates: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined> {
    const allPrefs = Array.from(this.userPreferences.values());
    const prefToUpdate = allPrefs.find(pref => pref.userId === userId);
    
    if (!prefToUpdate) return undefined;
    
    // Ensure all required fields are present
    const updatedPrefs: UserPreferences = { 
      ...prefToUpdate, 
      ...updates,
      // Make sure required fields are not undefined
      userId: userId,
      currentSura: updates.currentSura ?? prefToUpdate.currentSura,
      currentAyah: updates.currentAyah ?? prefToUpdate.currentAyah,
      fontSize: updates.fontSize ?? prefToUpdate.fontSize,
      scrollSpeed: updates.scrollSpeed ?? prefToUpdate.scrollSpeed,
      darkMode: updates.darkMode ?? prefToUpdate.darkMode,
      doNotDisturb: updates.doNotDisturb ?? prefToUpdate.doNotDisturb
    };
    
    this.userPreferences.set(prefToUpdate.id, updatedPrefs);
    return updatedPrefs;
  }

  // Bookmark methods
  async getBookmarks(userId: number): Promise<Bookmark[]> {
    const allBookmarks = Array.from(this.bookmarks.values());
    return allBookmarks.filter(bookmark => bookmark.userId === userId);
  }

  async getBookmark(id: number): Promise<Bookmark | undefined> {
    return this.bookmarks.get(id);
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    
    // Construct the bookmark with all required fields
    const newBookmark = {
      id,
      userId: bookmark.userId,
      suraId: bookmark.suraId,
      ayahId: bookmark.ayahId,
      // For note field: if undefined or null, set to undefined (optional field)
      note: bookmark.note === undefined ? undefined : bookmark.note,
      createdAt: bookmark.createdAt ?? new Date().toISOString()
    } as Bookmark; // Use type assertion to cast to Bookmark type
    
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }

  async deleteBookmark(id: number): Promise<boolean> {
    return this.bookmarks.delete(id);
  }
}

export const storage = new MemStorage();
