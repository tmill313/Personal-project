insert into suggestions(suggestion, date, user_id, votes, assigned_id, completed)
values($1, $2, $3, $4, $5, $6);
select * from suggestions
join teams on suggestions.assigned_id = teams.id
join users on suggestions.user_id = users.user_id
where completed = false;