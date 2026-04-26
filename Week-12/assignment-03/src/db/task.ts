import { client } from '../index';
import  {QueryResult} from 'pg';
interface Task{
	id:number;
	project_id:number;
	title:string;
	completed:boolean;
	due_date:string;
}

export async function createTask(projectId: number, title: string, dueDate: string) {
 const query  =  "insert into tasks(project_id,title,due_date) values($1,$2,$3) returning *";
 const values = [projectId,title,dueDate];
 const res:QueryResult<Task> = await client.query(query,values);
 const task = res.rows[0];
  return task;
}

export async function updateTask(taskId: number, completed: boolean) {
  const query = "update tasks set completed = $1 where id = $2 returning *";
  const values = [completed,taskId];
  const res:QueryResult<Task> = await client.query(query,values);
  const updatedTask = res.rows[0];
  return updatedTask;
}

export async function getTasks(projectId: number) {
 const query = "select * from tasks where project_id  = $1";
 const values = [projectId];
 const res:QueryResult<Task>  = await client.query(query,values);
 console.log(res);
 const tasks = res.rows;
 return tasks; 
}
