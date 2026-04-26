import { client } from "..";
import {QueryResult} from "pg";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

interface User{
 id:number;
 username:string;
 password:string;
 name:string
}

export async function createUser(
  username: string,
  password: string,
  name: string
) {
 const response:QueryResult<User> =  await client.query<User>("insert into users(username,password,name) values($1,$2,$3) returning *",[username,password,name]);
 const user = response.rows[0];
 return user;
}
/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */


export async function getUser(userId: number) {
 const response:QueryResult<User> = await client.query<User>("select * from users where id = $1",[userId]);
 const user = response.rows[0];
 return user;
}

