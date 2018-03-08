UPDATE suggestions
SET votes=$1
WHERE suggestion_id=$2;
select * from suggestions
join teams on suggestions.assigned_id = teams.id
where completed = false;