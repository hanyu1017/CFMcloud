"use strict";(()=>{var e={};e.id=939,e.ids=[939],e.modules={9424:e=>{e.exports=require("mssql")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},2123:(e,t,a)=>{a.r(t),a.d(t,{config:()=>f,default:()=>u,routeModule:()=>l});var r={};a.r(r),a.d(r,{default:()=>c});var n=a(1802),o=a(7153),s=a(6249),i=a(7809);async function c(e,t){let{id:a}=e.query;try{switch(e.method){case"GET":let r=await (0,i.getFactoryById)(a);if(!r)return t.status(404).json({error:"廠區不存在"});t.status(200).json(r);break;case"PUT":await (0,i.updateFactory)(a,e.body),t.status(200).json({message:"廠區更新成功"});break;case"DELETE":await (0,i.deleteFactory)(a),t.status(200).json({message:"廠區刪除成功"});break;default:t.setHeader("Allow",["GET","PUT","DELETE"]),t.status(405).end(`Method ${e.method} Not Allowed`)}}catch(e){console.error("API Error:",e),t.status(500).json({error:"伺服器錯誤"})}}let u=(0,s.l)(r,"default"),f=(0,s.l)(r,"config"),l=new n.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/factories/[id]",pathname:"/api/factories/[id]",bundlePath:"",filename:""},userland:r})},7809:(e,t,a)=>{let r;let n=a(9424),o={user:process.env.DB_USER,password:process.env.DB_PASSWORD,server:process.env.DB_SERVER,database:process.env.DB_NAME,options:{encrypt:!0,trustServerCertificate:!1},pool:{max:10,min:0,idleTimeoutMillis:3e4},requestTimeout:3e4,connectionTimeout:3e4,retries:3};async function s(){try{return r||(r=await n.connect(o),console.log("資料庫連接成功")),r}catch(e){throw console.error("資料庫連接失敗:",e),e}}async function i(){try{r&&(await r.close(),r=null,console.log("資料庫連接已關閉"))}catch(e){console.error("關閉資料庫連接時發生錯誤:",e)}}async function c(e,t={}){try{let a=(await s()).request();return Object.keys(t).forEach(e=>{a.input(e,t[e])}),(await a.query(e)).recordset}catch(e){throw console.error("查詢執行失敗:",e),e}}async function u(){let e=`
    SELECT 
      factory_id,
      factory_name,
      location,
      status,
      carbon_emissions,
      energy_consumption,
      efficiency_rate,
      created_at,
      updated_at
    FROM factories
    ORDER BY factory_name
  `;return await c(e)}async function f(e){let t=`
    SELECT 
      factory_id,
      factory_name,
      location,
      status,
      carbon_emissions,
      process_emissions,
      energy_emissions,
      energy_consumption,
      efficiency_rate,
      carbon_reduction,
      created_at,
      updated_at
    FROM factories
    WHERE factory_id = @id
  `;return(await c(t,{id:e}))[0]}async function l(e){let t=`
    INSERT INTO factories (
      factory_name, 
      location, 
      status, 
      carbon_emissions, 
      energy_consumption, 
      efficiency_rate
    )
    VALUES (
      @factory_name, 
      @location, 
      @status, 
      @carbon_emissions, 
      @energy_consumption, 
      @efficiency_rate
    );
    SELECT SCOPE_IDENTITY() as factory_id;
  `;return(await c(t,e))[0].factory_id}async function _(e,t){let a=`
    UPDATE factories
    SET 
      factory_name = @factory_name,
      location = @location,
      status = @status,
      carbon_emissions = @carbon_emissions,
      energy_consumption = @energy_consumption,
      efficiency_rate = @efficiency_rate,
      updated_at = GETDATE()
    WHERE factory_id = @id
  `;return await c(a,{...t,id:e}),!0}async function E(e){return await c("DELETE FROM factories WHERE factory_id = @id",{id:e}),!0}async function d(e=10){let t=`
    SELECT TOP (@limit)
      alert_id,
      factory_id,
      factory_name,
      alert_type,
      alert_level,
      message,
      created_at
    FROM alerts a
    JOIN factories f ON a.factory_id = f.factory_id
    ORDER BY created_at DESC
  `;return await c(t,{limit:e})}async function y(e){let t=`
    INSERT INTO alerts (
      factory_id,
      alert_type,
      alert_level,
      message
    )
    VALUES (
      @factory_id,
      @alert_type,
      @alert_level,
      @message
    );
    SELECT SCOPE_IDENTITY() as alert_id;
  `;return(await c(t,e))[0].alert_id}async function m(){let e=`
    SELECT 
      COUNT(*) as total_factories,
      SUM(carbon_emissions) as total_carbon_emissions,
      AVG(efficiency_rate) as avg_efficiency_rate,
      SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online_factories,
      SUM(CASE WHEN status = 'offline' THEN 1 ELSE 0 END) as offline_factories
    FROM factories
  `;return(await c(e))[0]}e.exports={connectDB:s,closeDB:i,executeQuery:c,getFactories:u,getFactoryById:f,createFactory:l,updateFactory:_,deleteFactory:E,getAlerts:d,createAlert:y,getFactoryStats:m}},7153:(e,t)=>{var a;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return a}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(a||(a={}))},1802:(e,t,a)=>{e.exports=a(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var a=t(t.s=2123);module.exports=a})();