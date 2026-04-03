# Order Management System (OMS)

A minimal Order Management System built with a Node.js (Express) backend, PostgreSQL, and a React frontend. The application follows a Clean Architecture (Controller-Service-Repository) and demonstrates database transaction integrity for concurrent order processing.

---

### Backend Components
- **Repositories**: Standard data access logic using `pg`.
- **Services**: Business logic with manual transaction handling (`BEGIN`, `COMMIT`, `ROLLBACK`) and row-level locking (`FOR UPDATE`) for stock management.
- **Controllers**: Input validation (via Zod) and request handling.
- **Database**: PostgreSQL schema with proper FKs and constraints. Seeded with sample products on initial run (or via `./oms_database_schema.sql`).

### Frontend Components
- **State Management**: Managed with Redux Toolkit for products, orders, loading, and error states.
- **Context API**: Global configuration (Environment details, App name) using `useContext`.
- **Custom Hook**: `useApi` for reusable loading/error/call logic.
- **Performance**: Strategic use of `useMemo` and `useCallback` for optimized renders in list/transaction components.

---

### Setup Instructions

1.  **Database**:
    - Build a database named `oms` in PostgreSQL.
    - (Optional) Run `oms_database_schema.sql` if you wish to manually initialize tables. The application is also capable of auto-initializing on first run.

2.  **Backend**:
    - `cd backend`
    - `npm install`
    - Configure `.env` (DB credentials, Port).
    - `npm run dev`

3.  **Frontend**:
    - `cd frontend`
    - `npm install`
    - `npm run dev`

### API & Testing
- **API Collection**: Import `oms_postman_collection.json` into Postman to test all endpoints. It comes with a pre-configured `base_url` variable.
- **GET /api/products**: Retrieve all products.
- **POST /api/products**: Add a product.
- **GET /api/orders**: Sales history with joined product names.
- **POST /api/orders**: Place order (Stock check & reduction are atomic).
