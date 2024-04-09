# Task 1: Arithmetic Operation API

This API allows clients to perform basic arithmetic operations (addition, subtraction, multiplication, division) on two numbers after authenticating themselves using JWT (JSON Web Tokens).

## Base URL

```
http://localhost:3000
```

## Authentication

To authenticate, send a POST request to `/login` endpoint with valid credentials (username and password) in the request body. Upon successful authentication, you'll receive a JWT token in the response.

### Request

```http
POST /login
Content-Type: application/json

{
    "username": "admin",
    "password": "root"
}
```

### Response

```json
{
  "token": "your_jwt_token"
}
```

## Arithmetic Operations

### Addition

Adds two numbers together.

### Request

```http
POST /add
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
    "num1": 5,
    "num2": 3
}
```

### Response

```json
{
  "result": 8
}
```

### Subtraction

Subtracts the second number from the first number.

### Request

```http
POST /subtract
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
    "num1": 10,
    "num2": 4
}
```

### Response

```json
{
  "result": 6
}
```

### Multiplication

Multiplies two numbers together.

### Request

```http
POST /multiply
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
    "num1": 6,
    "num2": 7
}
```

### Response

```json
{
  "result": 42
}
```

### Division

Divides the first number by the second number.

### Request

```http
POST /divide
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
    "num1": 10,
    "num2": 2
}
```

### Response

```json
{
  "result": 5
}
```

## Error Handling

- 401 status code: Authentication fails (invalid username or password)
- 403 status code: Token is missing or invalid
- 400 status code: attempting to divide by zero
