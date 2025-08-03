FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV HOME=/usr/src/app

FROM base AS dependencies
WORKDIR $HOME
COPY package.json pnpm-lock.yaml ./
RUN pnpm i

FROM base AS build
WORKDIR $HOME
COPY . .
COPY --from=dependencies $HOME/node_modules ./node_modules
RUN pnpm build
RUN pnpm prisma generate
RUN pnpm prune --prod

FROM base AS deploy
WORKDIR $HOME
COPY --from=build $HOME/dist ./dist
COPY --from=build $HOME/node_modules ./node_modules
COPY --from=build $HOME/generated ./generated
COPY --from=build $HOME/prisma ./prisma

CMD ["sh", "-c", "y | npx prisma migrate dev && node dist/main"]
