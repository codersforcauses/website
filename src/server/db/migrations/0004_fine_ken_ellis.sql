CREATE TYPE "public"."project_icon" AS ENUM('devices', 'computer', 'mobile');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('Mobile application', 'Progressive Web App (PWA)', 'Website');--> statement-breakpoint
CREATE TABLE "cfc-website_project" (
	"id" uuid PRIMARY KEY NOT NULL,
	"icon" "project_icon",
	"logo_path" varchar(256) NOT NULL,
	"img_path" varchar(256),
	"name" varchar(256) NOT NULL,
	"client" varchar(256) NOT NULL,
	"type" "project_type" NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"website_url" varchar(256),
	"github_url" varchar(256),
	"impact" jsonb,
	"description" varchar(1024) NOT NULL,
	"tech" jsonb,
	"members" varchar(256)[],
	"is_application_open" boolean DEFAULT false NOT NULL,
	"application_url" varchar(256),
	"is_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "cfc-website_project_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "cfc-website_project" USING btree ("name");