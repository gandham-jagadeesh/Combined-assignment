import { client } from '../index';
import {QueryResult} from 'pg';

interface Project{
	id : number;
	user_id:number;
	title:string;
	description:string;
	created_at:string
}

export async function createProject(userId: number, title: string, description: string) {
 const query = "insert into projects(user_id,title,description) values($1,$2,$3) returning *";
 const values = [userId,title,description];
 const res:QueryResult<Project> = await client.query(query,values);
 const project = res.rows[0];
 return project;
}

export async function getProjects(userId: number) {
 const query = "select * from projects where user_id = $1";
 const values = [userId];
 const res:QueryResult<Project> = await client.query(query,values);
 const projects = res.rows;
 return projects;
}
