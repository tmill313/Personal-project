select * from suggestions
join teams on suggestions.assigned_id = teams.id
where completed = false;
