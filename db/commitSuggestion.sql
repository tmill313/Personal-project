UPDATE "public"."suggestions" SET "assigned_id"=$1, "completed"=FALSE WHERE "suggestion_id"=$2;
select * from suggestions
join teams on suggestions.assigned_id = teams.id
join users on suggestions.user_id = users.user_id
where completed = false;