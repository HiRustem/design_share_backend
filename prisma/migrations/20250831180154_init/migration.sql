-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PdfFile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "uniqueLink" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "compressed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PdfFile_uniqueLink_key" ON "public"."PdfFile"("uniqueLink");

-- AddForeignKey
ALTER TABLE "public"."PdfFile" ADD CONSTRAINT "PdfFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
