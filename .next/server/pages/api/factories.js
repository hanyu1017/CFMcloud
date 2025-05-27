"use strict";(()=>{var e={};e.id=443,e.ids=[443],e.modules={5142:e=>{e.exports=require("dotenv")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},8678:e=>{e.exports=import("pg")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},2810:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>l,default:()=>u,routeModule:()=>d});var a=r(1802),o=r(7153),s=r(6249),i=r(2001),c=e([i]);i=(c.then?(await c)():c)[0];let u=(0,s.l)(i,"default"),l=(0,s.l)(i,"config"),d=new a.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/factories",pathname:"/api/factories",bundlePath:"",filename:""},userland:i});n()}catch(e){n(e)}})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)},6125:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.d(t,{Z:()=>c});var a=r(8678),o=r(5142),s=e([a]);a=(s.then?(await s)():s)[0],o.config();let i=new a.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:!1}});i.on("error",e=>{console.error("Unexpected error on idle client",e),process.exit(-1)});let c=i;n()}catch(e){n(e)}})},2001:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>s});var a=r(6125),o=e([a]);async function s(e,t){switch(e.method){case"GET":return await i(e,t);case"POST":return await c(e,t);default:t.setHeader("Allow",["GET","POST"]),t.status(405).json({error:`Method ${e.method} Not Allowed`})}}async function i(e,t){try{let{status:r,search:n,sortBy:o="name",order:s="ASC"}=e.query,i=`
      SELECT 
        factory_id,
        name,
        location,
        status,
        employees,
        efficiency,
        power_consumption,
        production_rate,
        last_maintenance,
        alerts,
        created_at,
        updated_at
      FROM factories
    `,c=[],u=[];r&&"all"!==r&&(c.push(`status = $${u.length+1}`),u.push(r)),n&&(c.push(`(name ILIKE $${u.length+1} OR location ILIKE $${u.length+2})`),u.push(`%${n}%`,`%${n}%`)),c.length>0&&(i+=` WHERE ${c.join(" AND ")}`);let l=["name","efficiency","alerts","created_at"].includes(o)?o:"name",d="DESC"===s.toUpperCase()?"DESC":"ASC";i+=` ORDER BY ${l} ${d}`;let p=await a.Z.query(i,u);t.status(200).json(p.rows)}catch(e){console.error("獲取工廠數據錯誤：",e),t.status(500).json({error:"伺服器錯誤",detail:e.message})}}async function c(e,t){try{let{name:r,location:n,status:o="offline",employees:s=0,efficiency:i=0,power_consumption:c=0,production_rate:u=0}=e.body;if(!r||!n)return t.status(400).json({error:"缺少必要欄位",detail:"工廠名稱和地址為必填項目"});let l=`
      INSERT INTO factories (
        name, location, status, employees, efficiency, 
        power_consumption, production_rate, alerts
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,d=await a.Z.query(l,[r,n,o,s,i,c,u,0]);t.status(201).json(d.rows[0])}catch(e){console.error("創建工廠錯誤：",e),t.status(500).json({error:"伺服器錯誤",detail:e.message})}}a=(o.then?(await o)():o)[0],n()}catch(e){n(e)}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=2810);module.exports=r})();