# Use the official Python 3.12 image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI application files into the container
COPY . .

# Expose the FastAPI port (5003)
EXPOSE 5003

# Command to start FastAPI using Uvicorn
CMD ["uvicorn", "orders:app", "--host", "0.0.0.0", "--port", "5003"]
