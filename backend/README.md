# CharTalker Backend

一个简单的Spring Boot后端框架，提供基本的API服务。

## 技术栈
- Java 17+
- Spring Boot 3.5.0
- Maven

## 项目结构
```
backend/
├── pom.xml               # Maven项目配置文件
├── src/main/java/com/chartalker/backend/  # Java源代码目录
│   ├── BackendApplication.java            # 应用程序入口类
│   └── controller/                        # 控制器目录
│       └── HealthCheckController.java     # 健康检查控制器
└── src/main/resources/                    # 资源文件目录
    └── application.properties             # 应用程序配置文件
```

## 功能
- 提供健康检查API端点 `/api/health`

## 如何构建和运行

### 前提条件
- Java 17或更高版本
- Maven 3.6或更高版本

### 构建项目
```bash
cd backend
mvn clean install
```

### 运行应用
```bash
mvn spring-boot:run
```

或者使用构建的JAR文件运行：
```bash
java -jar target/char-talker-0.0.1-SNAPSHOT.jar
```

### 访问API
应用启动后，可以通过以下URL访问健康检查端点：
```
http://localhost:8080/api/health
```

## 配置说明
主要配置在 `application.properties` 文件中：
- `spring.application.name`: 应用名称
- `server.port`: 服务器端口（默认8080）
- `logging.level.*`: 日志级别配置