UPDATE "public"."suggestions" SET "assigned_id"=$1, "completed"=FALSE WHERE "suggestion_id"=$2;
select * from suggestions
join teams on suggestions.assigned_id = teams.id
where completed = false;