# OMMS (Office Meal Management System)
This project is a take home assignment provided by Manush Tech. As per the requirements this project is created using React, NodeJS, ExpressJS, PostgreSQL(Or any other relational DB), Redux, Tanstack Query etc.

## Key Features:
### Authentication:
      - Sign-In Page (users will use email and password as credentials)
      - JWT-based Authentication
      - Banned Users cannot log in and will see a prompt indicating they are banned.

### **User Management Page (Admins Only):**
      - Add Users
      - Data Table with Filters (Search, Pagination)
      - Roles: Admin and General Users
      - Admins can update and ban users.
      - Banned users cannot log in to the system.

### - **Item Management Page (Admins Only):**
    - Add and Delete Items
    - Items include food categories like:
        - Chicken Curry (Protein)
        - Rice (Starch)
        - Fish Curry (Protein)
        - Egg Curry (Protein)
        - Egg Bhorta
        - Potato Bhorta (Veg)
        - Daal
        - Begun Bhaji (Veg)
### - **Meal Management Page (Admins Only):**
    - Set Meals for 5 days a week.
    - Each Meal will have a set number of items.
    - Meal Constraints:
        1. A meal must have a rice item to be complete.
        2. A meal must have at least 3 items to be complete.
        3. A meal cannot have two protein sources at a time.
    - Schedule meals for specific days (e.g., a meal with rice, chicken curry, and daal available only on Sundays).
    - The same meal can only be repeated a maximum of two days in a week.

### - **Meal Order Page (General Users):**
    - View weekly meal schedules.
    - Select and update meal choices for each day.
    - Cannot modify meals for previous days (e.g., on Tuesday, cannot change meals for Sunday and Monday).
    - Schedule meals for an entire month.
    - Option to select "No Meal" for any day.

### - **Meal Schedule Page (Admins Only):**
    - View meal choices for every user.
    - General users cannot access this page.

## Installation and setup - Frontend
How to install-

```npm
npm install
```

or,

```npm
yarn
```

setup .env file-

```env
VITE_APP_BASE_URL=http://localhost:5000/api
```

run project-

```npm
npm run dev
```
or,

```yarn
yarn dev
```

## Frontend View
### Banner
![Alt text](./readmeImages/banner.png)

### A Simple Login Page
![Alt text](./readmeImages/login.png)

### Ban User Alert Above of the Login Button
![Alt text](./readmeImages/ban-user-alert.png)

### After Login User(Admin) Will See the Dashboard
![Alt text](./readmeImages/dashboard-after-successful-login.png)

### Daily Meal Displayed based on Day
![Alt text](./readmeImages/daily-meal-calaender.png)

### Display Meal Category in the data table
![Alt text](./readmeImages/view-meal-categories.png)

### Create a Meal Item based on Meal Category
![Alt text](./readmeImages/create-meal-item.png)

### Meal Item List & Pagination is properly visible here with active next button
![Alt text](./readmeImages/meal-item-list-with-pagination.png)

### Create complete meal based on day
![Alt text](./readmeImages/create-complete-meal.png)

### Complete meal list displayed in the table
![Alt text](./readmeImages/complete-meal-list.png)

### Create user form
![Alt text](./readmeImages/create-user-form.png)

### Some users displayed in the data table
![Alt text](./readmeImages/some-users.png)

### Order List
![Alt text](./readmeImages/order-list.png)

### A Modal will be open before delete something.
![Alt text](./readmeImages/modal-for-delete-confirmation.png)

### Logout Button
![Alt text](./readmeImages/logout-button.png)


## Installation and setup - Backend
How to install-

```npm
npm install
```

or,

```npm
yarn
```

setup .env file-

```env
DATABASE_URL=<your database url>
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
PORT=5000

JWT_SECRET=<your jwt secret>
JWT_REFRESH_SECRET=<your jwt refresh secret>
JWT_EXPIRES_IN=30d
JWT_REFRESH_EXPIRES_IN=365d
```

run project-

```npm
npm run dev
```
or,

```yarn
yarn dev
```


## Backend Functional Requirements

### General User
- General User can login.
- General User can view daily meal
- General User can order
- General User can view orders(own)

### Admin User
- Admin can login.
- Admin can create user
- Admin can update user
- Admin can delete user
- Admin can ban user
- Admin can view user details

- Admin can create meal category
- Admin can update meal category
- Admin can delete meal category
- Admin can view meal category details

- Admin can create meal item
- Admin can update meal item
- Admin can delete meal item
- Admin can view meal item details

- Admin can create meal
- Admin can update meal
- Admin can delete meal
- Admin can view meal details

- Admin can create meal for a day
- Admin can update meal for a day
- Admin can delete meal for a day
- Admin can view meal for a day details

- Admin can create order
- Admin can update order
- Admin can delete order
- Admin can view order(own)
- Admin can view all orders

## API Endpoints

### Auth

- `POST /auth/login`

### User

- `POST /users`
- `GET /users/`
- `GET /users/searchTerm=shakil@gmail.com`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Meal Category

- `POST /meal-category`
- `GET /meal-category/`
- `GET /meal-category/searchTerm=starch`
- `GET /meal-category/:id`
- `PATCH /meal-category/:id`
- `DELETE /meal-category/:id`

### Meal Item

- `POST /meal-item`
- `GET /meal-item/`
- `GET /meal-item/searchTerm=rice`
- `GET /meal-item/:id`
- `PATCH /meal-item/:id`
- `DELETE /meal-item/:id`

### Meal (available meal per day)

- `POST /available-meal-per-day`
- `GET /available-meal-per-day/`
- `GET /available-meal-per-day/searchTerm=sunday`
- `GET /available-meal-per-day/:id`
- `PATCH /available-meal-per-day/:id`
- `DELETE /available-meal-per-day/:id`

### Order

- `POST /orders`
- `GET /orders/`
- `GET /orders/searchTerm=sunday`
- `GET /orders/my-order`
- `GET /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`

## ER Diagram
[ER Diagram Link](https://drive.google.com/file/d/14mOEiv4U1SYmNrwrLLufgWtrhTOTd8D3/view?usp=sharing)
![Alt text](./readmeImages/er-diagram-omms.drawio.png)