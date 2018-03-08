UPDATE "public"."suggestions" SET "completed"=$4 WHERE 
"suggestion_id"= $1;
UPDATE "public"."teams" SET "completed_votes"=$3 WHERE "id"=$2;
select * from suggestions 
where assigned_id = $2
order by completed;