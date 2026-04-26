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
 username:string;
 password:string;
 name:string,
 id:number,
}
export async function createUser(
    username: string,
    password: string,
    name: string
  ) {
   const query = "insert into users(username,password,name) values($1,$2,$3) returning id,username,password,name";
   const values = [username,password,name];
   const response:QueryResult<User> = await client.query(query,values);
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
 const query  = "select  id,username,password,name from users where id = $1";
 const values = [userId];
 const response:QueryResult<User> = await client.query(query,values);
 const user = response.rows[0];
 return user; 
}

