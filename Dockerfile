FROM node:20-alpine AS base

# Add necessary build tools
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000

FROM base AS builder
WORKDIR /app
COPY . .

# Set next telemetry disabled
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Add necessary runtime packages
RUN apk add --no-cache libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port and set host
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]
