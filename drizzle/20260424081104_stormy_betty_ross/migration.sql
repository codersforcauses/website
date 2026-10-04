ALTER TYPE "meeting-status" ADD VALUE 'draft' BEFORE 'upcoming';--> statement-breakpoint
ALTER TABLE "cfc_website_answers" ADD COLUMN "created_at" timestamp(6) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_answers" ADD COLUMN "updated_at" timestamp(6) with time zone;--> statement-breakpoint
ALTER TABLE "cfc_website_positions" ADD COLUMN "created_at" timestamp(6) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_positions" ADD COLUMN "updated_at" timestamp(6) with time zone;--> statement-breakpoint
ALTER TABLE "cfc_website_questions" ADD COLUMN "created_at" timestamp(6) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "cfc_website_questions" ADD COLUMN "updated_at" timestamp(6) with time zone;--> statement-breakpoint
ALTER TABLE "cfc_website_votes" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "cfc_website_votes" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "cfc_website_winners" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "cfc_website_winners" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "cfc_website_general_meetings" ALTER COLUMN "status" SET DEFAULT 'draft'::"meeting-status";--> statement-breakpoint
DROP INDEX "user_email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "cfc_website_user" (lower("email"));--> statement-breakpoint
DROP INDEX "user_name_idx";--> statement-breakpoint
CREATE INDEX "user_name_idx" ON "cfc_website_user" (lower("name"));