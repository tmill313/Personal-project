delete from suggestions where suggestion_id = $1;
select * from suggestions
join teams on suggestions.assigned_id = teams.id
join users on suggestions.user_id = users.user_id
where completed = false;