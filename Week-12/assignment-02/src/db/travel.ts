
import { client } from "..";
import { QueryResult } from "pg";

interface TravelPlan {
  id: number;
  title: string;
  destination_city: string;
  destination_country: string;
  start_date: string;
  end_date: string;
  budget: number;
  user_id:number
}

/*
 * Function should insert a new travel plan for this user
 * Should return a travel plan object
 * {
 *  title: string,
 *  destination_city: string,
 *  destination_country: string,
 *  start_date: string,
 *  end_date: string,
 *  budget: number,
 *  id: number
 * }
 */
export async function createTravelPlan(
  userId: number,
  title: string,
  destinationCity: string,
  destinationCountry: string,
  startDate: string,
  endDate: string,
  budget: number
) {
 const query = "insert into travel_plans(user_id,title,destination_city,destination_country,start_date,end_date,budget) values($1,$2,$3,$4,$5,$6,$7) returning id,title,destination_city,destination_country,start_date,end_date,budget,user_id"
 const values = [userId,title,destinationCity,destinationCountry,startDate,endDate,budget];
 const response:QueryResult<TravelPlan> = await client.query(query,values);
 const travelPlan:TravelPlan  = response.rows[0];
 return travelPlan;
}

/*
 * Function should update the budget or title for a specific travel plan
 * Should return the updated travel plan object
 */
type Values = number | string;
type valArr = Values[];

export async function updateTravelPlan(
  planId: number,
  title?: string,
  budget?: number
) {
let count:number = 0;
let  columnsets:string  = "";
const values:valArr = [];
if(title){
   count++;
   columnsets += `title = $${count} `
   values.push(title);
}
if(budget){
 count++; 
 if(count  == 2){
   columnsets+= ','
 }
 columnsets += `budget = $${count} `;
 values.push(budget);
}
 count++;
values.push(planId); 
 const query = `update travel_plans set ${columnsets}  where id = $${count} returning id,title,destination_city,destination_country,start_date,end_date,budget,user_id`; 
 console.log(query);
 const response:QueryResult<TravelPlan> = await client.query(query,values);
 const travelPlan:TravelPlan  = response.rows[0];
  return travelPlan;

}

/*
 * Function should get all the travel plans of a given user
 * Should return an array of travel plan objects
 * [{
 *  title: string,
 *  destination_city: string,
 *  destination_country: string,
 *  start_date: string,
 *  end_date: string,
 *  budget: number,
 *  id: number
 * }]
 */
export async function getTravelPlans(userId: number) {
 const query = "select id,user_id,title,destination_city,destination_country,start_date,end_date,budget from travel_plans where user_id = $1";
 const values = [userId];
 const response:QueryResult<TravelPlan> = await client.query(query,values);
 const travelPlans = response.rows;
 return travelPlans; 
}
