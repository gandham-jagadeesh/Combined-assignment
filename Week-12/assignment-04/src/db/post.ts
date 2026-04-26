import { client } from '../index';
import {QueryResult} from "pg";

interface Post{
id:number;
user_id:number;
content:string;
created_at:number
}

interface Feed{
	id:number;
	content:string;
	created_at:string;
	user_name:string;
	like_count:number
}
export async function createPost(userId: number, content: string) {
 const query = "insert into posts(user_id,content) values($1,$2) returning *"
 const values = [userId,content];
 const res:QueryResult<Post> = await client.query(query,values);
 const post = res.rows[0];
 return post;
}

export async function likePost(userId: number, postId: number) {
  const query = "insert into likes(user_id,post_id) values($1,$2) on conflict(user_id,post_id) do nothing returning *";
  const values = [userId,postId];
  const res:QueryResult<Post> = await client.query(query,values);
  const like = res.rows[0];
  return like;
}

export async function getFeed() {
	const query = " select p.id as id ,p.content as content ,p.created_at as created_at ,u.username as username ,count(l.post_id) as like_count from users u join posts p on p.user_id = u.id left join likes l on l.post_id = p.id group by u.username,p.id order by p.created_at";      	const res:QueryResult<Feed> = await client.query(query);
 const feed = res.rows;
 return feed;
}
