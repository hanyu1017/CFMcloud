"use strict";(()=>{var e={};e.id=443,e.ids=[443],e.modules={9424:e=>{e.exports=require("mssql")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},796:(e,t,r)=>{r.r(t),r.d(t,{config:()=>f,default:()=>u,routeModule:()=>d});var o={};r.r(o),r.d(o,{default:()=>l});var n=r(1802),a=r(7153),i=r(6249),s=r(9424),c=r(9077);async function l(e,t){let r;try{if(r=await new s.ConnectionPool(c.ZP).connect(),"GET"===e.method){let e=await r.request().query(`
          SELECT * FROM factories ORDER BY created_at DESC
        `);t.setHeader("X-Total-Count",e.recordset.length),t.setHeader("X-Query-Time",new Date().toISOString()),t.status(200).json(e.recordset)}else t.setHeader("Allow",["GET"]),t.status(405).json({error:`Method ${e.method} Not Allowed`})}catch(e){console.error("API Error:",e),t.status(500).json({error:"獲取廠區數據失敗",message:"請稍後再試"})}finally{if(r)try{await r.close()}catch(e){console.error("Error closing connection:",e)}}}let u=(0,i.l)(o,"default"),f=(0,i.l)(o,"config"),d=new n.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/factories",pathname:"/api/factories",bundlePath:"",filename:""},userland:o})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)},9077:(e,t,r)=>{r.d(t,{ZP:()=>l,lT:()=>s,fw:()=>a,EE:()=>c,C$:()=>i});var o=r(9424);require("dotenv").config({path:".env.local"});let n={server:process.env.DB_SERVER||"cfmclouddb.c3sw88geq0el.ap-southeast-2.rds.amazonaws.com",database:process.env.DB_DATABASE||"CFMdatabase",user:process.env.DB_USER||"Edison",password:process.env.DB_PASSWORD||"Edison0528",port:parseInt(process.env.DB_PORT||"1433"),options:{encrypt:!0,trustServerCertificate:!0,enableArithAbort:!0}};async function a(e){let t;try{return t=await new o.ConnectionPool(n).connect(),(await t.request().input("id",o.Int,e).query(`
        SELECT * FROM factories 
        WHERE factory_id = @id
      `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("獲取廠區資料失敗")}finally{t&&await t.close()}}async function i(e,t){let r;try{return r=await new o.ConnectionPool(n).connect(),(await r.request().input("id",o.Int,e).input("factory_name",o.NVarChar(100),t.factory_name).input("location",o.NVarChar(200),t.location).input("status",o.VarChar(20),t.status).input("carbon_emissions",o.Decimal(10,2),t.carbon_emissions).input("energy_consumption",o.Decimal(10,2),t.energy_consumption).input("efficiency_rate",o.Decimal(5,2),t.efficiency_rate).query(`
        UPDATE factories 
        SET 
          factory_name = @factory_name,
          location = @location,
          status = @status,
          carbon_emissions = @carbon_emissions,
          energy_consumption = @energy_consumption,
          efficiency_rate = @efficiency_rate,
          updated_at = GETDATE()
        WHERE factory_id = @id;
        
        SELECT * FROM factories WHERE factory_id = @id;
      `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("更新廠區資料失敗")}finally{r&&await r.close()}}async function s(e){let t;try{return t=await new o.ConnectionPool(n).connect(),(await t.request().input("id",o.Int,e).query(`
        DELETE FROM factories 
        WHERE factory_id = @id;
        
        SELECT @@ROWCOUNT as deleted;
      `)).recordset[0].deleted>0}catch(e){throw console.error("Database Error:",e),Error("刪除廠區失敗")}finally{t&&await t.close()}}async function c(){let e;try{return e=await new o.ConnectionPool(n).connect(),(await e.request().query(`
      SELECT 
        COUNT(*) as total_factories,
        SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as active_factories,
        SUM(carbon_emissions) as total_emissions,
        AVG(carbon_emissions) as avg_emissions,
        SUM(energy_consumption) as total_energy,
        AVG(energy_consumption) as avg_energy,
        AVG(efficiency_rate) as avg_efficiency
      FROM factories;
    `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("獲取統計資料失敗")}finally{e&&await e.close()}}let l=n}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=796);module.exports=r})();