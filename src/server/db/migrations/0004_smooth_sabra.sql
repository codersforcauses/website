CREATE TYPE "public"."icon" AS ENUM('devices', 'computer', 'mobile');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('Mobile application', 'Progressive Web App (PWA)', 'Website');--> statement-breakpoint
CREATE TABLE "cfc-website_project" (
	"id" uuid PRIMARY KEY NOT NULL,
	"icon" "type" NOT NULL,
	"logo" varchar(256) NOT NULL,
	"img" varchar(256),
	"name" varchar(256) NOT NULL,
	"client" varchar(256) NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"url" varchar(256),
	"source" varchar(256),
	"impact" varchar(1024)[] NOT NULL,
	"desc" varchar(2048) NOT NULL,
	"tech" varchar(256)[] NOT NULL,
	"is_receiving_application" boolean DEFAULT false NOT NULL,
	"application_url" varchar(256),
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cfc-website_project_member" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" uuid,
	"user_id" uuid,
	"joined_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cfc-website_project_member" ADD CONSTRAINT "cfc-website_project_member_project_id_cfc-website_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."cfc-website_project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cfc-website_project_member" ADD CONSTRAINT "cfc-website_project_member_user_id_cfc-website_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."cfc-website_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "name_idx" ON "cfc-website_project" USING btree ("name");--> statement-breakpoint
CREATE INDEX "project_user_idx" ON "cfc-website_project_member" USING btree ("project_id","user_id");