ALTER TABLE "cfc_website_general_meetings" DROP CONSTRAINT "cfc_website_general_meetings_title_key";--> statement-breakpoint
ALTER TABLE "cfc_website_general_meetings" ADD COLUMN "room" varchar(128);