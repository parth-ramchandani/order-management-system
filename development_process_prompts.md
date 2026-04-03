# Chat Conversation: Order Management System Development

Note: _This export contains the high-level technical directives and architectural prompts provided during the development of the minimal Order Management System (OMS)._

---

### User Input

Design a scalable backend for a minimal **Order Management System** using **Node.js** and **PostgreSQL**. The project must strictly adhere to **Clean Architecture** principles (Controller → Service → Repository). 

**Data Integrity Requirements:**
- Schema must support `Products` and `Orders` with proper Foreign Key relationships.
- Order fulfillment logic must be **Atomic**. Implement database transactions (`BEGIN/COMMIT/ROLLBACK`) to ensure that stock reduction and order creation succeed or fail together.
- **Concurrency:** Prevent race conditions and 'double-sell' scenarios by using row-level locking (`FOR UPDATE`) during the stock validation phase.

---

### User Input

Develop a **React-based frontend** using a modern, high-fidelity visual design system. 

**State Management & Pattern Requirements:**
- Centralize application state using **Redux Toolkit** (Loading, Error, Product Catalog, and Order Logs).
- Implement **React Context** for global configuration management and environment variables.
- Standardize API communication through a **Custom Hook (`useApi`)** to manage the fetch lifecycle and global error states.

**Performance Tuning:**
- Optimize component re-renders by strategically applying **memoization hooks** (`useMemo` for derived data and `useCallback` for stable function references). Provide justifications for each usage based on performance profiling.

---

### User Input

Ensure the entire codebase follows high **code quality standards**:
- Implement strict input validation using **Zod** in the controller layer.
- Maintain a standardized API response format for predictable frontend consumption.
- Code must be clean, human-readable, and free of hardcoded constants (environment-driven config).
- **Edge Case Handling:** Handle scenarios such as insufficient inventory, invalid product IDs, and simultaneous concurrent orders using robust error responses.

---

### User Input

Finalize the project with the following professional-grade deliverables:
- A clean **Git repository** with a curated commit history.
- A standalone **SQL Schema script** for manual environment setup.
- A **Postman Collection** for automated API testing.
- A comprehensive **README** covering architectural decisions and setup instructions.
