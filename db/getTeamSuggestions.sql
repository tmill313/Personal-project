select * from suggestions
join users on suggestions.user_id = users.user_id 
where assigned_id = $1
order by completed;
