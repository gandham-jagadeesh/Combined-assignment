

import { client } from "..";
import { QueryResult } from "pg";

interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
    user_id:number 
    // Additional properties if present in your database schema
}
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const response:QueryResult<Todo> = await client.query<Todo>("insert into todos(user_id,title,description) values($1,$2,$3) returning *",[userId,title,description]);
  const todo:Todo = response.rows[0];
  return todo;
}

/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */


export async function updateTodo(todoId: number) {
  const response:QueryResult<Todo> = await client.query<Todo>(" update todos set done = 'true' where id = $1 returning *",[todoId]);
  const todo:Todo = response.rows[0];
  return todo; 
}
/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */

export async function getTodos(userId: number) {
 const response:QueryResult<Todo> = await client.query<Todo>("select * from todos where user_id = $1",[userId]);
 const todo:Todo[] = response.rows;
 return todo; 
}
