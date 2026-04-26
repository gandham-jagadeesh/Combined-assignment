import { client } from '../index';
import {QueryResult } from "pg";

interface User{
 id : number;
 username:string;
 password:string;
 name:string
}

export async function createUser(username: string, password: string, name: string) {
   const query = "insert into users(username,password,name) values($1,$2,$3) returning *";
   const values = [username,password,name];
   const res:QueryResult<User> = await client.query(query,values);
   const user = res.rows[0];
   return user;   
}

export async function getUser(id: number) {
 const query = "select * from users where id = $1";
 const values = [id];
 const res:QueryResult<User> = await client.query(query,values);
 const users = res.rows;
 return users; 
}
