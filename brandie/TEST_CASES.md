Since automated tests are not required, this list outlines the functional scenarios you would test to verify the system works as intended. These cover the "Happy Path" (expected behavior) and "Edge Cases" (error handling).

#### **A. User Authentication & Management**

- **TC-001: User Signup (Happy Path)**
  - **Input:** Valid name, unique email, strong password.
  - **Expected:** 201 Created response; User is saved in DB; Password is stored as a hash (not plain text).
- **TC-002: Signup with Duplicate Email**
  - **Input:** Signup with an email that already exists in the DB.
  - **Expected:** 409 Conflict error; Descriptive message "User already exists".
- **TC-003: User Login (Happy Path)**
  - **Input:** Valid registered email and correct password.
  - **Expected:** 200 OK response; Returns valid JWT token.
- **TC-004: Login with Invalid Credentials**
  - **Input:** Registered email but wrong password.
  - **Expected:** 401 Unauthorized error.

#### **B. Content Creation (Posts)**

- **TC-005: Create Post (Authenticated)**
  - **Input:** Valid JWT header, JSON body with `text` (and optional `mediaUrl`).
  - **Expected:** 201 Created; Response includes Post ID, timestamp, and simplified Author object.
- **TC-006: Create Post (Unauthenticated)**
  - **Input:** Missing or invalid JWT header.
  - **Expected:** 401 Unauthorized.
- **TC-007: Create Post with Invalid Data**
  - **Input:** Empty text string or text exceeding 5000 characters.
  - **Expected:** 400 Bad Request (Validation Error).

#### **C. Social Graph (Following)**

- **TC-008: Follow a User**
  - **Input:** Authenticated User A requests to follow User B.
  - **Expected:** 200 OK; User A is added to User B's followers list.
- **TC-009: Follow Self**
  - **Input:** User requests to follow their own ID.
  - **Expected:** 400 Bad Request ("You cannot follow yourself").
- **TC-010: Follow Non-Existent User**
  - **Input:** User requests to follow a UUID that doesn't exist.
  - **Expected:** 404 Not Found.

#### **D. News Feed (The Core Feature)**

- **TC-011: Retrieve Feed (Basic)**
  - **Input:** Authenticated User A (follows User B and C). Request GET `/feed`.
  - **Expected:** List of posts authored ONLY by User A, B, and C. Sorted by `createdAt` (newest first).
- **TC-012: Retrieve Feed (Pagination)**
  - **Input:** GET `/feed?limit=5&offset=5`.
  - **Expected:** Returns posts 6-10; Ensures older posts are fetched correctly.
- **TC-013: Feed for New User (Zero Following)**
  - **Input:** Newly created User D (follows no one) requests feed.
  - **Expected:** Returns empty list `[]` (or only their own posts if they made any).

---
