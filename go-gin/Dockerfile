FROM golang:1.23-alpine3.20 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /app

FROM alpine:3.20

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

ENTRYPOINT ["./server"]
