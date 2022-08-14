-- AlterTable
ALTER TABLE "role" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "updated_at" DROP NOT NULL;
