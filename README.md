
# Sheffield Student Grade Calculator

This project consists of a backend (FastAPI) and a frontend (React + Vite) for calculating and displaying student grades.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [Python 3.8+](https://www.python.org/) (for backend)

---

## Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` directory:
	```powershell
	cd backend
	```
2. (Optional but recommended) Create and activate a virtual environment:
	```powershell
	python -m venv venv
	.\venv\Scripts\activate
	```
3. Install dependencies:
	```powershell
	pip install -r requirements.txt
	```
4. Run the FastAPI server:
	```powershell
	uvicorn main:app --reload
	```
	The backend will be available at `http://127.0.0.1:8000`.

---

## Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the `frontend` directory:
	```powershell
	cd frontend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Start the development server:
	```powershell
	npm run dev
	```
	The frontend will be available at the URL shown in the terminal (typically `http://localhost:5173`).

---

## Usage

1. Start the backend server (see above).
2. Start the frontend dev server (see above).
3. Open the frontend URL in your browser and use the application.

---

## Project Structure

- `backend/` — FastAPI backend (Python)
- `frontend/` — React frontend (Vite, TypeScript)

---

## License

See [LICENSE](LICENSE).
