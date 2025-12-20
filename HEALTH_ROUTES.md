# RightSteps Backend - Health Routes Documentation

All health check endpoints across all modules.

**Base URL:** `http://localhost:4000/v1` (Development) | `https://api.rightsteps.com/v1` (Production)

---

## Overview

Every module has a health check endpoint to verify module availability.

**Total Health Endpoints:** 13

---

## 1. Main Health Module

**Base Path:** `/v1/health`

### Basic Health Check
```
GET /v1/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "request": {
    "method": "GET",
    "url": "/v1/health"
  },
  "message": "Health check passed successfully",
  "data": {
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z",
    "uptime": 4.856528252,
    "environment": "production",
    "version": "8.0.0",
    "memory": {
      "used": 70,
      "total": 98,
      "external": 38
    },
    "cpu": {
      "usage": {
        "user": 1010268,
        "system": 209793
      }
    }
  }
}
```

### Detailed Health Check
```
GET /v1/health/detailed
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Health check passed successfully",
  "data": {
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z",
    "uptime": 4.856528252,
    "environment": "production",
    "version": "8.0.0",
    "responseTime": 45,
    "memory": {
      "used": 70,
      "total": 98,
      "external": 38,
      "rss": 120
    },
    "cpu": {
      "usage": {
        "user": 1010268,
        "system": 209793
      }
    },
    "databases": {
      "postgresql": {
        "write": true,
        "read": true
      },
      "mongodb": {
        "connected": true
      },
      "redis": {
        "connected": true
      },
      "errors": []
    }
  }
}
```

### Readiness Check (Kubernetes)
```
GET /v1/health/ready
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service is ready",
  "data": {
    "status": "ready",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

### Liveness Check (Kubernetes)
```
GET /v1/health/live
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service is alive",
  "data": {
    "status": "alive",
    "timestamp": "2025-12-20T09:29:46.526Z",
    "uptime": 4.856528252
  }
}
```

### Database Health Check
```
GET /v1/health/database
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Database health check completed",
  "data": {
    "postgresql": {
      "write": true,
      "read": true
    },
    "mongodb": {
      "connected": true
    },
    "redis": {
      "connected": true
    },
    "errors": []
  }
}
```

### Full System Status
```
GET /v1/health/system
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "System status: healthy",
  "data": {
    "timestamp": "2025-12-20T09:29:46.526Z",
    "status": "healthy",
    "uptime": 4.856528252,
    "environment": "production",
    "version": "8.0.0",
    "responseTime": 45,
    "memory": {
      "used": 70,
      "total": 98,
      "external": 38,
      "rss": 120
    },
    "cpu": {
      "user": 1010268,
      "system": 209793
    },
    "databases": {
      "postgresql": {
        "write": true,
        "read": true
      },
      "mongodb": {
        "connected": true
      },
      "redis": {
        "connected": true
      },
      "errors": []
    },
    "nodeInfo": {
      "nodeVersion": "v20.11.0",
      "platform": "linux",
      "arch": "x64",
      "pid": 1234
    },
    "requestId": "req-123456789"
  }
}
```

### System Status History
```
GET /v1/health/status?page=1&limit=10&status=healthy
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "System status records retrieved successfully",
  "data": {
    "records": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "timestamp": "2025-12-20T09:29:46.526Z",
        "status": "healthy",
        "uptime": 4.856528252,
        "environment": "production",
        "version": "8.0.0"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalRecords": 47,
      "limit": 10
    }
  }
}
```

---

## 2. Auth Module Health

```
GET /v1/auth/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Auth module is healthy",
  "data": {
    "module": "auth",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 3. Profile Module Health

```
GET /v1/profile/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile module is healthy",
  "data": {
    "module": "profile",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 4. Notification Module Health

```
GET /v1/notifications/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Notification module is healthy",
  "data": {
    "module": "notification",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 5. Community Module Health

```
GET /v1/community/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Community module is healthy",
  "data": {
    "module": "community",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 6. Upload Module Health

```
GET /v1/upload/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Upload module is healthy",
  "data": {
    "module": "upload",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 7. Subscription Module Health

```
GET /v1/subscription/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Subscription module is healthy",
  "data": {
    "module": "subscription",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 8. Plans Module Health

```
GET /v1/subscription/plans/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Plans module is healthy",
  "data": {
    "module": "plans",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 9. Admin Module Health

```
GET /v1/admin/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Admin module is healthy",
  "data": {
    "module": "admin",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 10. AI-Tutor Module Health

```
GET /v1/ai-tutor/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "AI-Tutor module is healthy",
  "data": {
    "module": "ai-tutor",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## 11. Template Module Health

```
GET /v1/template/health
```
**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Template module is healthy",
  "data": {
    "module": "template",
    "status": "healthy",
    "timestamp": "2025-12-20T09:29:46.526Z"
  }
}
```

---

## Summary Table

| Module | Endpoint | Auth Required |
|--------|----------|---------------|
| Health | `/v1/health` | No |
| Health | `/v1/health/detailed` | No |
| Health | `/v1/health/ready` | No |
| Health | `/v1/health/live` | No |
| Health | `/v1/health/database` | No |
| Health | `/v1/health/system` | No |
| Health | `/v1/health/status` | No |
| Auth | `/v1/auth/health` | No |
| Profile | `/v1/profile/health` | No |
| Notification | `/v1/notifications/health` | No |
| Community | `/v1/community/health` | No |
| Upload | `/v1/upload/health` | No |
| Subscription | `/v1/subscription/health` | No |
| Plans | `/v1/subscription/plans/health` | No |
| Admin | `/v1/admin/health` | No |
| AI-Tutor | `/v1/ai-tutor/health` | No |
| Template | `/v1/template/health` | No |

---

**Last Updated:** December 20, 2025
**API Version:** 8.0.0
