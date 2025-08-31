/*
  Warnings:

  - You are about to drop the `PdfFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PdfFile" DROP CONSTRAINT "PdfFile_userId_fkey";

-- DropTable
DROP TABLE "public"."PdfFile";

-- CreateTable
CREATE TABLE "public"."Design" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "uniqueLink" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "compressed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Design_uniqueLink_key" ON "public"."Design"("uniqueLink");

-- AddForeignKey
ALTER TABLE "public"."Design" ADD CONSTRAINT "Design_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
