select 
    user_id
from
    post
group by user_id
having (COUNT(user_id) > 3)