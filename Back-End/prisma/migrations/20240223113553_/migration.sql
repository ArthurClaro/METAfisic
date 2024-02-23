-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Outro',
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsMuscle" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "GroupsMuscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serie" INTEGER NOT NULL,
    "kg" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "dayId" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "cover_image" TEXT,
    "music_url" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GroupsMuscle_nome_key" ON "GroupsMuscle"("nome");

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_category_fkey" FOREIGN KEY ("category") REFERENCES "GroupsMuscle"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
