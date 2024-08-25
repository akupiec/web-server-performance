FROM python:alpine
RUN pip install "fastapi[standard]"
COPY . .
EXPOSE 3000
ENTRYPOINT ["fastapi", "run", "main.py", "--port", "3000"]
