## Getting Started

First, you need to install dependency:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate

```

If you going to use your own database, you need to

Add .env. You can take mine

```bash
NEXTAUTH_SECRET=secret1
NEXTAUTH_URL=http://localhost:3000
APP_URL=http://localhost:3000
DATABASE_URL=mysql://bg565058_inventory:%3BCp%2565Yu5g@bg565058.mysql.ukraine.com.ua:3306/bg565058_inventory
```

Run the development server:

```bash
npm run dev

# or

npm run build
#and
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
