import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserPreferencesSchema, insertBookmarkSchema } from "@shared/schema";
import { getQuranMetadata, QuranData } from "@shared/quranData";

// Use the actual Quran data imported from shared/quranData.ts
// which was generated from the harakat file
import { quranData } from "@shared/quranData";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get all suras metadata (for the navigation drawer)
  app.get("/api/quran/suras", (req: Request, res: Response) => {
    const suras = quranData.suras.map(sura => ({
      number: sura.number,
      name: sura.name,
      englishName: sura.englishName,
      englishNameTranslation: sura.englishNameTranslation,
      totalAyahs: sura.ayahs.length
    }));
    
    res.json({ suras });
  });

  // Get a specific sura by number
  app.get("/api/quran/suras/:suraNumber", (req: Request, res: Response) => {
    const suraNumber = parseInt(req.params.suraNumber);
    
    if (isNaN(suraNumber) || suraNumber < 1 || suraNumber > 114) {
      return res.status(400).json({ message: "Invalid sura number" });
    }
    
    const sura = quranData.suras.find(s => s.number === suraNumber);
    
    if (!sura) {
      return res.status(404).json({ message: "Sura not found" });
    }
    
    res.json({ sura });
  });

  // Get user preferences
  app.get("/api/preferences", async (req: Request, res: Response) => {
    // For demo purposes, use the default guest user (id: 1)
    const userId = 1;
    
    try {
      const preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      
      res.json({ preferences });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving preferences" });
    }
  });

  // Update user preferences
  app.post("/api/preferences", async (req: Request, res: Response) => {
    // For demo purposes, use the default guest user (id: 1)
    const userId = 1;
    
    try {
      // Create a schema that makes all fields optional except userId
      const updateSchema = insertUserPreferencesSchema.omit({ userId: true }).partial();
      
      // Validate the data from the request
      const validatedData = updateSchema.parse(req.body);
      
      // Add the userId
      const dataWithUserId = { ...validatedData, userId };
      
      // Update preferences
      const updatedPreferences = await storage.updateUserPreferences(userId, dataWithUserId);
      
      if (!updatedPreferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      
      res.json({ preferences: updatedPreferences });
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  // Get bookmarks
  app.get("/api/bookmarks", async (req: Request, res: Response) => {
    // For demo purposes, use the default guest user (id: 1)
    const userId = 1;
    
    try {
      const bookmarks = await storage.getBookmarks(userId);
      res.json({ bookmarks });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving bookmarks" });
    }
  });

  // Create bookmark
  app.post("/api/bookmarks", async (req: Request, res: Response) => {
    // For demo purposes, use the default guest user (id: 1)
    const userId = 1;
    
    try {
      // Create a schema that omits userId and createdAt since we'll add those ourselves
      const bookmarkSchema = insertBookmarkSchema.omit({ 
        userId: true,
        createdAt: true
      });
      
      // Validate the data from the request
      const validatedData = bookmarkSchema.parse(req.body);
      
      // Add the userId and current date
      const fullBookmarkData = {
        ...validatedData,
        userId,
        createdAt: new Date().toISOString()
      };
      
      // Create the bookmark
      const newBookmark = await storage.createBookmark(fullBookmarkData);
      res.status(201).json({ bookmark: newBookmark });
    } catch (error) {
      console.error("Error creating bookmark:", error);
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  // Delete bookmark
  app.delete("/api/bookmarks/:id", async (req: Request, res: Response) => {
    const bookmarkId = parseInt(req.params.id);
    
    if (isNaN(bookmarkId)) {
      return res.status(400).json({ message: "Invalid bookmark ID" });
    }
    
    try {
      const success = await storage.deleteBookmark(bookmarkId);
      
      if (!success) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting bookmark" });
    }
  });

  // Search Quran
  app.get("/api/quran/search", (req: Request, res: Response) => {
    const query = req.query.q as string;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ message: "Search query too short" });
    }
    
    const results: any[] = [];
    
    // Search in all suras and ayahs
    quranData.suras.forEach(sura => {
      sura.ayahs.forEach(ayah => {
        if (
          ayah.text.includes(query) || 
          ayah.translation.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            sura: {
              number: sura.number,
              name: sura.name,
              englishName: sura.englishName
            },
            ayah: {
              number: ayah.number,
              numberInSurah: ayah.numberInSurah,
              text: ayah.text,
              translation: ayah.translation
            }
          });
        }
      });
    });
    
    res.json({ results });
  });

  const httpServer = createServer(app);

  return httpServer;
}
