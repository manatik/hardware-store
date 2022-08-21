
# Hardware store

# Frontend
## .env
    1. Что-то
    2. Что-то


# Backend
## .env
    1. DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
    2. JWT_SECRET="for jwt secret"
    3. COOKIE_SECRET="for cookie secret"
    4. PORT=port server

# API
* PREFIX=/api

## Category
* PREFIX=/category


* getAll
  * method=GET
  * path=/
* getById
  * method=GET
  * path=/:id
* update
  * method=PATCH
  * path=/:id

## Products
* PREFIX=/products

### Furniture
* PREFIX=/furniture

* getAll
  * method=GET
  * path=/
* getById
  * method=GET
  * path=/:id
* update
  * method=PATCH
  * path=/:id
* remove
  * method=DELETE
  * path=/:id

### House
* PREFIX=/house

* getAll
    * method=GET
    * path=/
* getById
    * method=GET
    * path=/:id
* update
    * method=PATCH
    * path=/:id
* remove
    * method=DELETE
    * path=/:id

### Plywood
* PREFIX=/plywood

* getAll
    * method=GET
    * path=/
* getById
    * method=GET
    * path=/:id
* update
    * method=PATCH
    * path=/:id
* remove
    * method=DELETE
    * path=/:id