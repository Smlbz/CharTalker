package com.chartalker.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/connection")
public class ConnectionStatusController {

    @Autowired(required = false)
    private DataSource dataSource;

    private final LocalDateTime startTime = LocalDateTime.now();

    /**
     * 获取连接状态信息
     * @return 包含连接状态的响应
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getConnectionStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "online");
        status.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        status.put("serverTime", startTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        status.put("uptimeSeconds", calculateUptimeSeconds());
        status.put("services", checkServices());
        
        return ResponseEntity.ok(status);
    }

    /**
     * 计算服务器运行时间（秒）
     */
    private long calculateUptimeSeconds() {
        return java.time.Duration.between(startTime, LocalDateTime.now()).getSeconds();
    }

    /**
     * 检查各个服务的连接状态
     */
    private Map<String, Object> checkServices() {
        Map<String, Object> services = new HashMap<>();
        
        // 检查数据库连接
        services.put("database", checkDatabaseConnection());
        
        // 这里可以添加其他服务的检查，如Redis等
        
        return services;
    }

    /**
     * 检查数据库连接状态
     */
    private Map<String, Object> checkDatabaseConnection() {
        Map<String, Object> dbStatus = new HashMap<>();
        boolean connected = false;
        String message = "Not configured";
        
        if (dataSource != null) {
            try (Connection connection = dataSource.getConnection()) {
                connected = connection.isValid(2);
                message = connected ? "Connected successfully" : "Connection invalid";
            } catch (SQLException e) {
                message = "Connection failed: " + e.getMessage();
            }
        }
        
        dbStatus.put("connected", connected);
        dbStatus.put("message", message);
        
        return dbStatus;
    }
}