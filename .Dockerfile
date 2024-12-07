# Gunakan Node.js sebagai base image
FROM node:14

# Buat direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install --only=production

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Set environment variable untuk port (Cloud Run secara otomatis menggunakan $PORT)
ENV PORT 8080

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]
