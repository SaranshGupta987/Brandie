export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "User & Social API",
    version: "1.0.0",
    description: "API for User Authentication, Posting, and Social Graph (Following)",
  },
  servers: [{ url: "https://brandie.onrender.com/api" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Unauthorized" } },
                },
              },
            },
          },
        },
      },
    },

    "/users/{id}/follow": {
      post: {
        summary: "Follow a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of user to follow",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Follow successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Unfollow a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of user to unfollow",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Unfollow successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}/followers": {
      get: {
        summary: "Get list of users following the specified user",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}/following": {
      get: {
        summary: "Get list of users the specified user is following",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
        },
      },
    },

    "/posts": {
      post: {
        summary: "Create a new post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["text"],
                properties: {
                  text: { type: "string", example: "My first social post!" },
                  mediaUrl: { type: "string", nullable: true, example: "http://media.com/img.jpg" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Unauthorized" } },
                },
              },
            },
          },
        },
      },
    },
    "/posts/feed": {
      get: {
        summary: "Retrieve the authenticated user's timeline/feed",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Unauthorized" } },
                },
              },
            },
          },
        },
      },
    },
    "/posts/user/{id}": {
      get: {
        summary: "Retrieve all posts made by a specific user",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Success" } },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Bad Request" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string", example: "Unauthorized" } },
                },
              },
            },
          },
        },
      },
    },
  },

};
