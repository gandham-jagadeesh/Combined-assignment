import { client } from '../index';
import {QueryResult} from 'pg';
interface User{
 username:string;
 id:number;
 name:string;
 password:string
}

export async function createUser(username: string, password: string, name: string) {
 const response:QueryResult<User> = await client.query("insert into users(username,password,name) values($1,$2,$3) returning *",[username,password,name]);
 const user =  response.rows[0];
 return user;
}

export async function getUser(id: number) {
  const res:QueryResult<User> = await client.query("select * from users where id = $1",[id]);
  const user = res.rows[0];
  return user;
}
