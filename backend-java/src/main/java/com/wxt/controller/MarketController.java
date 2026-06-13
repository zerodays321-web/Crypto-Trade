package com.wxt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/market")
@CrossOrigin(origins = "*")
public class MarketController {

    @GetMapping("/prices")
    public ResponseEntity<?> getPrices() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Preços de mercado em tempo real");
        response.put("timestamp", LocalDateTime.now());
        response.put("prices", Map.of(
            "BTC", 42567.89,
            "ETH", 2345.67,
            "USDT", 1.00
        ));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/analysis/{symbol}")
    public ResponseEntity<?> getAnalysis(@PathVariable String symbol) {
        Map<String, Object> response = new HashMap<>();
        response.put("symbol", symbol.toUpperCase());
        response.put("status", "success");
        response.put("analysis", Map.of(
            "trend", "bullish",
            "rsi", 65,
            "macd", "positive"
        ));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history/{symbol}")
    public ResponseEntity<?> getHistory(@PathVariable String symbol) {
        Map<String, Object> response = new HashMap<>();
        response.put("symbol", symbol.toUpperCase());
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}
