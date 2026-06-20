package com.fitcircle.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development
public class ApiController {

    private final Map<String, Object> db = new HashMap<>();
    private final List<Map<String, Object>> feed = new ArrayList<>();

    public ApiController() {
        // Initialize dummy data
        Map<String, Object> user = new HashMap<>();
        user.put("id", "u1");
        user.put("name", "Alex");
        user.put("email", "dummy@example.com");
        user.put("streak", 12);
        user.put("xp", 2450);
        user.put("currentWeight", 76.5);
        user.put("targetWeight", 72.0);

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("user", user);
        db.put("dashboard", dashboard);

        // Feed data
        Map<String, Object> feedItem = new HashMap<>();
        feedItem.put("id", "f1");
        feedItem.put("userId", "u1");
        feedItem.put("content", "Completed a 45 min workout and kept my 12 day streak! 🔥");
        feedItem.put("likes", 4);
        feedItem.put("hasLiked", false);
        feedItem.put("comments", new ArrayList<>());
        feedItem.put("createdAt", "2024-03-20T10:00:00Z");
        feed.add(feedItem);
    }

    @GetMapping("/dashboard")
    public Object getDashboard() {
        return db.get("dashboard");
    }

    @GetMapping("/feed")
    public List<Map<String, Object>> getFeed() {
        return feed;
    }

    @PostMapping("/feed/{id}/like")
    public Map<String, Boolean> likeFeedPost(@PathVariable String id) {
        for (Map<String, Object> item : feed) {
            if (id.equals(item.get("id"))) {
                int likes = (int) item.get("likes");
                item.put("likes", likes + 1);
                break;
            }
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}
